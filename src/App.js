import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import VestingForm from './components/VestingForm';
import ReleaseTokens from './components/ReleaseTokens';
import './App.css';


const TokenVestingContractAddress ='0xf8e81D47203A594245E36C48e151709F0C19fBe8';
const TokenVestingContractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "beneficiary",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "totalAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "cliffDuration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "vestingDuration",
				"type": "uint256"
			}
		],
		"name": "createVestingSchedule",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "releaseTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "contract IERC20",
				"name": "_token",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "vestingSchedules",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "totalAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "releasedAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "startTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "cliffDuration",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "vestingDuration",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        setWeb3(web3);
      }
    };
    initializeWeb3();
  }, []);

  useEffect(() => {
    const loadAccounts = async () => {
      if (web3) {
        const accs = await web3.eth.getAccounts();
        setAccounts(accs);
      }
    };
    loadAccounts();
  }, [web3]);

  useEffect(() => {
    const loadContract = async () => {
      if (web3) {
        const contract = new web3.eth.Contract(TokenVestingContractABI, TokenVestingContractAddress);
        setContract(contract);
      }
    };
    loadContract();
  }, [web3]);

  const createVestingSchedule = async (beneficiary, totalAmount, startTime, cliffDuration, vestingDuration) => {
    try {
      await contract.methods
        .createVestingSchedule(beneficiary, totalAmount, startTime, cliffDuration, vestingDuration)
        .send({ from: accounts[0] });
      alert('Vesting schedule created successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to create vesting schedule.');
    }
  };

  const releaseTokens = async () => {
    try {
      await contract.methods.releaseTokens().send({ from: accounts[0] });
      alert('Tokens released successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to release tokens.');
    }
  };

  return (
    <div>
      <h1>Token Vesting DApp</h1>
      <p>Connected Account: {accounts[0]}</p>
      <VestingForm createVestingSchedule={createVestingSchedule} />
      <ReleaseTokens releaseTokens={releaseTokens} />
    </div>
  );
};

export default App;
