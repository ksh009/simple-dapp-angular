// ethereum.service.ts
import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

declare let window: any;

@Injectable({
  providedIn: 'root',
})
export class EthereumService {
  private provider: ethers.BrowserProvider;
  private signer!: ethers.Signer;
  private MoodContract!: ethers.Contract;
  private abi: Array<any>;

  constructor() {
    this.provider = new ethers.BrowserProvider(window.ethereum, 'sepolia');
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
    this.signer = await this.provider.getSigner();
    this.MoodContract = new ethers.Contract('0x5DB806eB4AD37747D37bcF5262f055FD65Ac938A', this.abi, this.signer);
  }

  async getMood(): Promise<string> {
    const mood = await this.MoodContract["getMood"]();
    return mood;
  }

  async setMood(newMood: string): Promise<void> {
    await this.MoodContract['setMood'](newMood);
  }
}

/*
Resource - https://stackoverflow.com/questions/75351780/nextjs-13-0-2-and-ethers-why-is-my-provider-undefined#:~:text=If%20you%20are,on%20ethers%20documentation
*/
