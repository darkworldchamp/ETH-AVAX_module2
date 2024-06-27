import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [newOwner, setNewOwner] = useState('');

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }

    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait();
      getBalance();
    }
  };

  const transferOwnership = async () => {
    if (atm) {
      try {
        console.log("Attempting to transfer ownership to:", newOwner);
        let tx = await atm.transferOwnership(newOwner);
        await tx.wait();
        console.log("Ownership transferred successfully.");
      } catch (error) {
        console.error("Error transferring ownership: ", error);
      }
    } else {
      console.log("ATM contract is not initialized.");
    }
  };

  const destroyContract = async () => {
    if (atm) {
      const tx = await atm.destroyContract();
      await tx.wait();
      console.log("Contract destroyed successfully.");
      // After destruction, you may want to unset the ATM contract instance
      setATM(undefined);
    }
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>;
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div className="account-container">
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <div className="button-container">
          <button className="action-button" onClick={deposit}>
            Deposit 1 ETH
          </button>
          <button className="action-button" onClick={withdraw}>
            Withdraw 1 ETH
          </button>
          <button className="action-button" onClick={destroyContract}>
            Destroy Contract
          </button>
          <input
            type="text"
            placeholder="New Owner Address"
            value={newOwner}
            onChange={(e) => setNewOwner(e.target.value)}
          />
          <button className="action-button" onClick={transferOwnership}>
            Transfer Ownership
          </button>
        </div>
        <style jsx>{`
          .account-container {
            text-align: center;
            margin: 20px;
          }
          .button-container {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 10px;
          }
          .action-button {
            background-color: #007bff;
            color: #ffffff;
            border: none;
            border-radius: 5px;
            padding: 8px 16px;
            cursor: pointer;
            font-size: 14px;
          }
          .action-button:hover {
            background-color: #0056b3;
          }
        `}</style>
      </div>
    );
  };

  useEffect(() => { getWallet(); }, []);

  return (
    <main className="container">
      <header>
        <h1>Welcome to Nikhil's ATM!</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
          margin: 20px;
          background-color: #ADD8E6; /* Light blue background color */
          border: 2px solid #0074D9; /* Blue border */
          border-radius: 10px; /* Rounded corners */
          padding: 20px; /* Add some padding for spacing */
        }
      `}</style>
    </main>
  );
}
