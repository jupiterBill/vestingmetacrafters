// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;
/*
       REQUIREMENT
    1. Your contract will have public variables that store the details about your coin (Token Name, Token Abbrv., Total Supply)
    2. Your contract will have a mapping of addresses to balances (address => uint)
    3. You will have a mint function that takes two parameters: an address and a value. 
       The function then increases the total supply by that number and increases the balance 
       of the “sender” address by that amount
    4. Your contract will have a burn function, which works the opposite of the mint function, as it will destroy tokens. 
       It will take an address and value just like the mint functions. It will then deduct the value from the total supply 
       and from the balance of the “sender”.
    5. Lastly, your burn function should have conditionals to make sure the balance of "sender" is greater than or equal 
       to the amount that is supposed to be burned.
*/

contract MyToken  {
// public variables here
    string public name;
    string public symbol;
    uint public totalSupply;
    address public owner; 

    constructor (string memory _name,string memory _symbol,uint256 _totalSupply){
    name = _name;
    symbol = _symbol;
    totalSupply =_totalSupply;
    owner = msg.sender;
    }

    // mapping variable here
    mapping(address=>uint) public balance;
   
    function getTime() external view returns(uint){
       return block.timestamp;
    }
    // mint function

    function mint(address receiver, uint amount) external  returns(bool){
       require(receiver!= address(0), "sorry cant mint to 0 address");
      // require(msg.sender == owner, "sorry you're not allowed to mint");
       balance[receiver] += amount;
       totalSupply+=amount;
       return true;
    }

    // burn function
     function burn(uint amount) external{
       require(balance[msg.sender] >= amount, "sorry you're not allowed to mint");
       balance[msg.sender] -= amount;
       totalSupply-=amount;
    }
    function getNameAndSymbol() external view returns(string memory,string memory ){
       return (name, symbol);
    }

    

    function transfer(address to, uint amount) external returns(bool){
       require(balance[msg.sender] >= amount, "sorry you don't have enough money to send to this recipient");
       balance[to] += amount;
       return true;
    }
    function transferFrom(address from, address to, uint amount) external returns(bool){
       require(balance[from] >= amount, "sorry you don't have enough money to send to this recipient");
       balance[to]+=amount;
       balance[from]-=amount;
       return true;
    }

}