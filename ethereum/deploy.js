const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/DappToken.json");

const provider = new HDWalletProvider(
  "buzz face ecology puppy merry ritual swarm canvas speed dial excess second",
  // remember to change this to your own phrase!
  "https://rinkeby.infura.io/v3/5c9528726b3a4071b31b8a042a00beef"
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
};
deploy();

/*
Attempting to deploy from account 0x54554DA1775fe76C47Dd64b80EB9380eD1EaE96F
Contract deployed to 0x55Ff028756e0151f8E5A36B62EF45fC45faf052A
*/
