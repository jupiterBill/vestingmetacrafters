// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;
import "./metacrafter.sol";
contract Vests {
   error TimeInPastError();
   // struct representing the organization details
   struct Organization{
     string name;
     MyToken myToken;
     address Admin;
     bool registered;
   }
   //Struct representing stakeholder
  struct Stakeholder{
      address stakeholderAddress;
      address admin;
      string role;
      string condition;
      uint256 lockTime;
      uint256 gratuity;
      bool conditionMet;

  }


//mapping organization to stake holders so we can get the numbe of stakeholders an organization has
mapping(address => Stakeholder[]) OrgToStakeholders;
//below mapping represent's an admin's organization which is used later to get thier token and other properties
mapping(address=>Organization) adminToOrganization;
//represents a stakeholder's imformation
mapping(address=>Stakeholder) addressToStakeHolder;
// mapping a stakeholder to a whitlelisted address to allocate tokens to whitelisted addresses
mapping(address => mapping(address=>uint)) whitelistedAddress;
// represents whether a stakeholder is assigned to a specific organization
mapping(address => mapping (address=>bool)) organizationToStakeHolderAddress;
// to look up a certain stakeholder's organization
mapping(address=>mapping (address=>Stakeholder))organizationStakeHolderLookup;
mapping(address => address)whitelistedAddressToStakeholder;

modifier onlyOrg (address admin){
 require(adminToOrganization[admin].registered,"sorry you have to be a registered organization");
 _;
}
  function registerOrganization (string memory _name,string memory _tokenName, string memory _symbol,uint _totalSupply) external returns(bool){
      bytes memory nameInBytes = bytes(_name);
      require(nameInBytes.length !=0,"please enter org name");
      require(adminToOrganization[msg.sender].Admin != msg.sender,"you are already registered");
      MyToken  mt = new MyToken(_tokenName,_symbol,_totalSupply);
      mt.mint(msg.sender, 2000000);
      Organization memory tempOrg =  Organization({name : _name,Admin:msg.sender,registered:true,myToken:mt});
      adminToOrganization[msg.sender] = tempOrg;
      return true;
  }
  
  function registerStakeholder(address _stakeholderAddress, string memory _role,string memory _condition, uint256 _lockTime, uint256 _gratuity) external onlyOrg(msg.sender) returns(bool){
    require(_stakeholderAddress != address(0),"please input a valid address");
    require(!organizationToStakeHolderAddress[msg.sender][_stakeholderAddress],"you can't register the same stakeholder twice");
    bytes memory roleInBytes = bytes(_role);
    require(roleInBytes.length !=0,"please enter a role");
    require(bytes(_condition).length !=0,"please provide a condition for release of funds");
    if(_lockTime < block.timestamp){
      revert TimeInPastError();
    }
    Stakeholder memory tempStakeHolder = Stakeholder({stakeholderAddress:_stakeholderAddress,
    admin:msg.sender,
    role:_role,
    condition:_condition,
    lockTime:_lockTime,
    conditionMet:false,
    gratuity:_gratuity});
    OrgToStakeholders[msg.sender].push(tempStakeHolder);
    organizationToStakeHolderAddress[msg.sender][_stakeholderAddress]= true;
    addressToStakeHolder[_stakeholderAddress] = tempStakeHolder;
    organizationStakeHolderLookup[msg.sender][_stakeholderAddress] = tempStakeHolder;
    return true;
  }
   function addToStakeHolderWhiteList(address whitelistAddr, address stakeHolderAddr, uint amountAllocated) external onlyOrg(msg.sender){
      require(organizationToStakeHolderAddress[msg.sender][stakeHolderAddr],"not a stakeholder in your organization");
      require(addressToStakeHolder[stakeHolderAddr].admin!=address(0),"sorry not a stakeholder");
      require(organizationStakeHolderLookup[msg.sender][stakeHolderAddr].gratuity >= amountAllocated,"stakeholder doesn't have enough funds");
      whitelistedAddress[stakeHolderAddr][whitelistAddr] += amountAllocated;
      whitelistedAddressToStakeholder[whitelistAddr]= stakeHolderAddr;
      organizationStakeHolderLookup[msg.sender][stakeHolderAddr].gratuity -=amountAllocated;
      addressToStakeHolder[stakeHolderAddr].gratuity-=amountAllocated; 
   }
   function addressIdentity(address connectedUser) public view returns (string memory){
    bool isWhitelisted = whitelistedAddressToStakeholder[connectedUser]!=address(0);
    bool isStakeHolder = addressToStakeHolder[connectedUser].stakeholderAddress!= address(0);
    bool isAdmin = adminToOrganization[connectedUser].Admin!=address(0);
    if(isWhitelisted){
      return "Whitelisted Address";
    }else if(isStakeHolder){
      return "Stakeholder";
    }else if (isAdmin){
      return "Administrator"; 
    }
    return "passerby";

   }
   function releaseToken(address stakeHolder) external onlyOrg(msg.sender)returns(bool){
     require(organizationStakeHolderLookup[msg.sender][stakeHolder].admin == msg.sender,"not your stakeholder");
     addressToStakeHolder[stakeHolder].conditionMet = true;
     return true;
   }
   function claimToken() external returns(bool){
    require(adminToOrganization[msg.sender].Admin == address(0),"Sorry Only stakeholders and whitelisted addresses can stake tokens");
    string memory Identity = addressIdentity(msg.sender);  
    if(keccak256(bytes(Identity)) == keccak256(bytes("Whitelisted Address"))){
      address stakeHolder = whitelistedAddressToStakeholder[msg.sender];
      uint amountAllocated = whitelistedAddress[stakeHolder][msg.sender];
      address stakeHolderOrganizationAdmin = addressToStakeHolder[stakeHolder].admin;
      require(addressToStakeHolder[stakeHolder].lockTime <= block.timestamp,"Sorry vesting period is not over");
      require(addressToStakeHolder[stakeHolder].conditionMet,"sorry stakeholder didn't meet condition");
      require(whitelistedAddress[stakeHolder][msg.sender]!=0,"sorry you already claimed token");
      MyToken organizationToken =  adminToOrganization[stakeHolderOrganizationAdmin].myToken;
      organizationToken.transferFrom(stakeHolderOrganizationAdmin, msg.sender, amountAllocated);
      whitelistedAddress[stakeHolder][msg.sender] = 0;
    }else if(keccak256(bytes(Identity)) == keccak256(bytes("Stakeholder"))){
       require(addressToStakeHolder[msg.sender].lockTime <= block.timestamp,"Sorry vesting period is not over");
       require(addressToStakeHolder[msg.sender].conditionMet,"sorry stakeholder didn't meet condition");
       address stakeHolderOrganizationAdmin = addressToStakeHolder[msg.sender].admin;
       require(addressToStakeHolder[msg.sender].gratuity !=0 && organizationStakeHolderLookup[stakeHolderOrganizationAdmin][msg.sender].gratuity!=0,"Sorry you already claimed token");
       uint gratuity = addressToStakeHolder[msg.sender].gratuity;
       MyToken organizationToken =  adminToOrganization[stakeHolderOrganizationAdmin].myToken;
       organizationToken.transferFrom(stakeHolderOrganizationAdmin, msg.sender, gratuity);
       organizationStakeHolderLookup[stakeHolderOrganizationAdmin][msg.sender].gratuity = 0;
       addressToStakeHolder[msg.sender].gratuity =0;
   }
   return true;
   }
  function getStakeholdingDetails(address sender) external view returns(Stakeholder memory){
     string memory identity = addressIdentity(sender);
     require(
        keccak256(bytes(identity)) == keccak256(bytes("Whitelisted Address")) ||
        keccak256(bytes(identity)) == keccak256(bytes("Stakeholder")),"Sorry you have to be a stakeholder or a whitelisted address"
     );
     if(keccak256(bytes(identity)) == keccak256(bytes("Stakeholder"))){
          return addressToStakeHolder[sender];
     }else if (keccak256(bytes(identity)) == keccak256(bytes("Whitelisted Address"))){
        address stakeHolder = whitelistedAddressToStakeholder[sender];
        return addressToStakeHolder[stakeHolder];
     }
     return addressToStakeHolder[msg.sender];  
   }
   function getStakeHolders(address sender) external view returns(Stakeholder[] memory){
       require(OrgToStakeholders[sender].length != 0,"you don't have stakeholders");
       return OrgToStakeholders[sender];
   }
   function getBalance() external view returns(uint){
    string memory Identity = addressIdentity(msg.sender);  
    if(keccak256(bytes(Identity)) == keccak256(bytes("Whitelisted Address"))){
      address stakeHolder = whitelistedAddressToStakeholder[msg.sender];
      address stakeHolderOrganizationAdmin = addressToStakeHolder[stakeHolder].admin;
      MyToken organizationToken =  adminToOrganization[stakeHolderOrganizationAdmin].myToken;
      return organizationToken.balance(msg.sender);
    }else if(keccak256(bytes(Identity)) == keccak256(bytes("Stakeholder"))){
       address stakeHolderOrganizationAdmin = addressToStakeHolder[msg.sender].admin;
       MyToken organizationToken =  adminToOrganization[stakeHolderOrganizationAdmin].myToken;
       return organizationToken.balance(msg.sender);
   }else if(keccak256(bytes(Identity)) == keccak256(bytes("Administrator"))){
     MyToken organizationToken =  adminToOrganization[msg.sender].myToken;
     return organizationToken.balance(msg.sender);
   }
   return 0;
   }
}
