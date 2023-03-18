import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import { NFTCards } from "./components/NFTCards"
import { Alchemy, Network } from 'alchemy-sdk'
const inter = Inter({ subsets: ['latin'] })
export default function Home() {

  const [wallet, setWalletAddress] = useState(" ");
  const [nfts, setNfts] = useState([]);


  const fetchNfts = async () => {

    var requiredoptions =
    {
      method: "GET"
    };

    const api_key = "_mf_4ngEeemMuX-f-d2WSf8es7PrXlvZ";
    const base_url = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;
    const fetchURL = `${base_url}?owner=${wallet}`;
    if (wallet.length == 0) {
      alert("Invalid Wallet Address");
    }
    else {
      let nft = await fetch(fetchURL, requiredoptions).then(data => data.json())
      console.log(nft.ownedNfts)
      setNfts(nft.ownedNfts);
    }

  }

  return (
    <div className='flex flex-col items-center justify-center py- gap-y-5 my-10'>
      <div className='flex flex-col w-full justify-center items-center gap-y-2'>
        <input type={"text"} className='w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50' onChange={(e) => { setWalletAddress(e.target.value) }} placeholder="Place Your Wallet Address"></input>
        <button className='disabled:bg-slate-500 text-white text-center bg-blue-400 px-10 align-center py-2 mt-3 rounded-sm w-1/5' onClick={fetchNfts}>Submit</button>

      </div>
      <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
        {
          nfts.length && nfts.map(nft => {
            return (

              <div className='w-1/4 mx-20 flex flex-col'>
                <div className="rounded-md">
                  <img className="w- h-128 rounded-t-md" src={nft.media[0].gateway} ></img>
                </div>
                <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110 ">
                <h2 className="text-xl text-gray-800">{nft.title}</h2>
                </div>
                
                <div className="flex justify-center mb-1">
                  <a  href={`https://etherscan.io/token/${nft.contract.address}`} className=" py-2 px-10 bg-blue-500 text-center rounded-m text-white cursor-pointer">View on etherscan</a>
                </div>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}