const Blockchain2022 = artifacts.require("Blockchain2022");

contract("Blockchain2022", (accounts) => {
  let wallet;

  beforeEach(async () => {
    wallet = await Blockchain2022.new();
  });

  it("should allow the owner to withdraw all funds", async () => {
    await web3.eth.sendTransaction({
      from: accounts[0],
      to: wallet.address,
      value: web3.utils.toWei("1", "ether"),
    });

    const initialBalance = await web3.eth.getBalance(accounts[0]);
    await wallet.withdraw({ from: accounts[0] });
    const finalBalance = await web3.eth.getBalance(accounts[0]);

    assert.isTrue(finalBalance > initialBalance);
  });

  it("should allow the owner to withdraw a specific amount of funds", async () => {
    await web3.eth.sendTransaction({
      from: accounts[0],
      to: wallet.address,
      value: web3.utils.toWei("1", "ether"),
    });

    const initialBalance = await web3.eth.getBalance(accounts[1]);
    await wallet.withdrawTo(accounts[1], web3.utils.toWei("0.5", "ether"), {
      from: accounts[0],
    });
    const finalBalance = await web3.eth.getBalance(accounts[1]);

    assert.isTrue(finalBalance > initialBalance);
  });

  it("should not allow non-owners to withdraw funds", async () => {
    await web3.eth.sendTransaction({
      from: accounts[0],
      to: wallet.address,
      value: web3.utils.toWei("1", "ether"),
    });

    try {
      await wallet.withdraw({ from: accounts[1] });
    } catch (error) {
      assert.include(error.message, "revert");
    }
  });

  it("should return the correct balance", async () => {
    await web3.eth.sendTransaction({
      from: accounts[0],
      to: wallet.address,
      value: web3.utils.toWei("1", "ether"),
    });

    const balance = await wallet.getBalance();
    assert.equal(balance, web3.utils.toWei("1", "ether"));
  });

  it("should return the correct owner", async () => {
    const owner = await wallet.getOwner();
    assert.equal(owner, accounts[0]);
  });
});
