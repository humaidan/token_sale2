const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledDappToken = require("../ethereum/build/DappToken.json");

let accounts;
//let factory;
//let tokenaddress;
let DappToken;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  DappToken = await new web3.eth.Contract(
    JSON.parse(compiledDappToken.interface)
  )
    .deploy({ data: compiledDappToken.bytecode })
    .send({ from: accounts[0], gas: "1000000" });

  //await token.methods.createCampaign("100").send({
  //  from: accounts[1],
  //  gas: "1000000",
});

describe("DappToken Tests", () => {
  it("deploys a contract", () => {
    assert.ok(DappToken.options.address);
  });

  it("Tokens total supply", async () => {
    const totalSupply = await DappToken.methods.totalSupply().call();
    assert.equal(1000000, parseInt(totalSupply));
  });
});
