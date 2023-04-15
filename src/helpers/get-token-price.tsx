import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import lpTokenAbi from './lpTokenAbi.json'
import routerAbi from './routerAbi.json'

interface TokenPriceParams {
  symbol: string;
}
interface TokenPrice {
  market_data: any;
}

export function getTokenPrice() {
  const [price, setPrice] = useState(0)
  const { library: provider } = useWeb3React()
  const fallbackProvider = new ethers.providers.JsonRpcProvider('https://mainnet.telos.net/evm')
  const web3Provider = provider ?? fallbackProvider


  const fetchCharmPriceInTlos = async (web3Provider:any) => {
    try {
      const lpcontractAddress = '0x933F83735f26e51c61955b4fCA88F13fbd423A0C' // this is the charm-telos lp contract address
      const contract = new ethers.Contract(lpcontractAddress, lpTokenAbi, web3Provider)
      const tokenReserves = await contract.getReserves()

      const charmPriceInTlos = (tokenReserves[0] / tokenReserves[1])
      return charmPriceInTlos
    } catch (error) {
      return null
    }
  }
  const fetchTlosPrice = async (web3Provider:any) => {
    try {
      const oneEth = 1
      const oneEthAsWei = ethers.utils.parseEther(oneEth.toString())
      const routerContractAddress = '0xF9678db1CE83f6f51E5df348E2Cc842Ca51EfEc1' // OmniDex router contract address
      const WTLOS = '0xD102cE6A4dB07D247fcc28F366A623Df0938CA9E'
      const USDC = '0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b'
      const routerContract = new ethers.Contract(routerContractAddress, routerAbi, web3Provider)
      const contractResponse = await routerContract.getAmountsOut(oneEthAsWei, [WTLOS, USDC])
      const tlosPrice = contractResponse ? (contractResponse[1]/contractResponse[0]) : 0
      return tlosPrice
    } catch (error) {
        return null
    }
  }

  useEffect(() => {
    async function fetchData() {
      const [charmPrice, tlosPrice] = await Promise.all([
        fetchCharmPriceInTlos(web3Provider),
        fetchTlosPrice(web3Provider),
      ])
      if (charmPrice !== null && tlosPrice !== null) {
        const tokenPrice = tlosPrice * charmPrice * 1e12
        setPrice(tokenPrice)
      }
    }
    fetchData();
  }, [web3Provider]);

  return price;
}

export function oldgetTokenPrice({ symbol }: TokenPriceParams): TokenPrice {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    async function fetchPrice() {
      let response = await fetch(
        'https://api.coingecko.com/api/v3/coins/omnidex?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false'
      );
      let body = await response.json();
      setData(body);
    }
    fetchPrice();
  }, []);
  return data;
}
