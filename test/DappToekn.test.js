const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledDappToken = require("../ethereum/build/DappToken.json");

let accounts;
//let factory;
//let tokenaddress;
let DappToken;
const TOTALSUPPLY = 1000000;
const TRANSFERAMNT = 1000;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  DappToken = await new web3.eth.Contract(
    JSON.parse(compiledDappToken.interface)
  )
    .deploy({ data: compiledDappToken.bytecode, arguments: [1000000] })
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
    assert.equal(
      TOTALSUPPLY,
      parseInt(totalSupply),
      "sets the total supply to " + TOTALSUPPLY
    );
  });

  it("Correct initial values", async () => {
    const name = await DappToken.methods.name().call();
    assert.equal("DApp Token", name, "name check");
    const symbol = await DappToken.methods.symbol().call();
    assert.equal("DAPP", symbol, "Symbol check");
    const standard = await DappToken.methods.standard().call();
    assert.equal("DApp Token v1.0", standard, "Standard check");
    const adminBalance = await DappToken.methods.balanceOf(accounts[0]).call();
    assert(adminBalance, "Admin Balance check");
  });

  it("Transfer function tests", async () => {
    let error = "";
    try {
      await DappToken.methods.transfer(accounts[1], TOTALSUPPLY * 2).send({
        from: accounts[0],
      });
    } catch (err) {
      error = err;
    }
    assert(error.message.indexOf("revert") >= 0, "revert message upon error");

    let receipt;

    receipt = await DappToken.methods.transfer(accounts[1], TRANSFERAMNT).send({
      from: accounts[0],
    });

    assert.equal(
      await DappToken.methods.balanceOf(accounts[0]).call(),
      TOTALSUPPLY - TRANSFERAMNT,
      "transfer from account debited"
    );
    assert.equal(
      await DappToken.methods.balanceOf(accounts[1]).call(),
      TRANSFERAMNT,
      "transfer from account credited"
    );

    assert.equal(true, receipt.status, "returns success result");

    assert(receipt.events.Transfer, "emits a Transfer event");
  });
});
