const {
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const hre = require("hardhat");

describe("Main", function () {
  async function deploy() {

    const [owner, otherAccount] = await hre.ethers.getSigners();
    const Contract = await hre.ethers.getContractFactory("ICTopEmployeesNFT");
    const instance = await Contract.deploy();
    return {instance, owner, otherAccount};
  }
  describe("Deployment", function () {
    it("Owner", async function () {
      const { instance, owner } = await loadFixture(deploy);

      expect(await instance.owner()).to.equal(owner.address);
    });
    it("Name", async function () {
      const { instance } = await loadFixture(deploy);

      expect(await instance.name()).to.equal("ICTopEmployeesNFT");
      expect(await instance.symbol()).to.equal("TOP");
    });
  });

  describe("Mint", function () {
    it("Mint", async function () {
      const { instance, owner, otherAccount } = await loadFixture(deploy);
      const uri = "test";
      await instance.mintToken(otherAccount.address, uri)

      expect(await instance.balanceOf(otherAccount.address)).to.equal(BigInt(1));
      expect(await instance.balanceOf(owner.address)).to.equal(BigInt(0));
      expect(await instance.tokenURI(BigInt(1))).to.equal(uri);
    });
    it("Mint access", async function () {
      const { instance, owner, otherAccount } = await loadFixture(deploy);
      const uri = "test";
      await expect(instance.mintToken(owner.address, uri)).to.be.revertedWith("Recipient cannot be the owner of the contract");
      await expect(instance.connect(otherAccount).mintToken(owner.address, uri)).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

});
