const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

describe("MaichaToken", function () {
  it("Should mint and transfer an NFT to someonw", async function () {
    const MaichaToken = await ethers.getContractFactory("MaichaToken");
    const maichatoken = await MaichaToken.deploy();
    await maichatoken.deployed();

    const recipient = "0xdd2fd4581271e230360230f9337d5c0430bf44c0";
    const metadataURI = "cid/test.png";

    let balance = await maichatoken.balanceOf(recipient);
    expect(balance.toString()).to.equal("0");

    const mintTx = await maichatoken.payToMint(recipient, metadataURI, {
      value: ethers.utils.parseEther("0.05"),
    });
    await mintTx.wait();
    balance = await maichatoken.balanceOf(recipient);
    expect(balance.toString()).to.equal("1");

    // expect(await maichatoken.isContentOwned(metadataURI)).to.equal(true);
  });
});
