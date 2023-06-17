# Sample solidity Vesting Decentralized Application

# Overview
This Project is  a Vesting Application built to facilitate efficient disbursement of treasuries to deserving recipients(Stakeholders, Founders, Community members e.t.c). This is accomplished by having Organizations register their Tokens on the platform to be distributed accordingly later to these recipients that qualify to recieve them.  

# Description 

On the Backend we have Two contracts One vesting contract that handles the Logic behind efficient Token disbursement and another Contract which represent each organization's Token, The Tokens are incipient in nature as we create them during the registration of an organization as opposed to having an organization bring a Token along with them during registration this was greatly considered during development but in the end former was opted for in favor of simplicity, Hardhat(a development environment and testing framework for Ethereum smart contracts) for deployment and testing. There are Nine functions in total in the Vesing contract  which collectively ensure the application functions effectively on the front end :

* registerOrganization - handles the registration of an organization as the name implies

* registerStakeholder  -  this handles the registration of recipient by an organization

* addToStakeHolderWhiteList - for certain recipients organizations are able to register whitelisted addresses under them with this function

* addressIdentity - this function is used to determine the identity of a user (Administrator, Stakeholder, whitelisted address, neutral)  

* releaseToken - this function enables an organization to release a gratuity to a stakeholder once they're qualified to receive it.
 
* claimToken - another intuitive function name as function names are almost always intuitive this function allows a user to claim their gratuity if they have been deemed qualified by their respective organizations.

* getStakeholdingDetails - enables stakeholders to get information about themselves, organization they belong to how much they can expect to get in terms of their gratuity e.t.c

* getStakeHolders - gets a list of stakeholders under an organization and their respective details

* getBalance - facilitates balance retrieval.

On the front end we have five pages :  organization registration, stakeholder registration, whitelist subregistration, a dashboard display stakeholder's details and a list of stakeholders to organizations and lastly the homepage which renders basic information such as an account's identity and account's address itself. We use the React Hook useContext to facilitate data sharing between components, we also create a javascript file context.js in it we write the codes for contract interaction using ethers.js and web3modal for  provider integration.



# Getting Started

* to use the Application you can clone the github repository onto your local machine and install the required dependencies using the command npm install


* Once Dependencies have been installed successfully,you need to start a hardhat's local blockchain to deploy the contract by typing the command - npx hardhat node. once this is done  you need to deploy the contract by running the commmand - npx hardhat run scripts/deploy.js --network localhost 


* Once the contract is deployed run the command -  npm run dev in the terminal and this will start the application on a local host on your machine and you go into your browser to begin  using the application.

* Once in your browser you may now click the connect wallet button, keep in mind that you can use  a testnet of your choosing to  play around with the application  but i recommended using hardhat's local blockchain for simplicity, however  you need to manually add a localhost network into your metamask wallet.

* Once all the above steps have been taken then you're good to go get ready to interact with the application enjoy !!.

[Author](https://github.com/jupiterBill/vestingmetacrafters)

# Wale

[@metacraftersio](https://metacrafters.io)

This project is licensed under the MIT License - see the LICENSE.md file for details



