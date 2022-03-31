import { ethers } from "ethers";
import React, { useState } from "react";
export default function WalletBalance() {
  const [balance, balanceSet] = useState<string>("");

  const getBalance = async () => {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(account);
    balanceSet(ethers.utils.formatEther(balance));
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">Wallet Balance</h5>
      </div>
      <h5>Your balance: {balance}</h5>

      <button onClick={() => getBalance()}>Show my balance</button>
    </div>
  );
}
