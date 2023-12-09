// ethereum.service.ts
import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root',
})
export class EthereumService {
  provider: ethers.providers.Web3Provider;
  signer: ethers.Signer;
  MoodContract: any; // Replace with the actual type from ethers.js
  abi: Array;

  constructor() {
    this.provider = new ethers.providers.Web3Provider(window.ethereum, 'sepolia');
    this.abi = [
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_mood",
            "type": "string"
          }
        ],
        "name": "setMood",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getMood",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ]
    this.init();
  }

  async init(): Promise<void> {
    await this.provider.send('eth_requestAccounts', []);
    const accounts = await this.provider.listAccounts();
    this.signer = this.provider.getSigner(accounts[0]);
    this.MoodContract = new ethers.Contract('0x5DB806eB4AD37747D37bcF5262f055FD65Ac938A', YOUR_CONTRACT_ABI, this.signer);
  }

  async getMood(): Promise<string> {
    const mood = await this.MoodContract.getMood();
    return mood;
  }

  async setMood(newMood: string): Promise<void> {
    await this.MoodContract.setMood(newMood);
  }
}
