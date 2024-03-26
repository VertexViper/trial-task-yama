'use client'

import { useEffect, useState } from 'react'
import { useAccount, useDisconnect } from "wagmi"
import axios from 'axios'
import dynamic from 'next/dynamic'
import Loader from "@/components/ui/loader";
import { signOut, useSession } from 'next-auth/react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from '@/components/ui/button'

const PortfolioInfo = dynamic(() => import("@/components/portfolio/portfolioInfo"), {
  loading: () => <Loader />,
});
const PortfolioGraph = dynamic(() => import("@/components/portfolio/portfolioGraph"), {
  loading: () => <Loader />,
});
const PortfolioTable = dynamic(() => import("@/components/portfolio/portfolioTable"), {
  loading: () => <Loader />,
});
const PortfolioPage = () => {
  const session = useSession()
  const disconnect = useDisconnect()
  const { address, isConnected } = useAccount()
  const [balance, setBalance] = useState<number>(0)
  const [assets, setAssets] = useState<Array<any>>([])
  const [history, setHistory] = useState<Array<any>>([])
  const [isEnableAnotherWallet, setIsEnableAnotherWallet] = useState<boolean>(false)
  const [anotherAddress, setAnotherAddress] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const getPortfolio = async (wallet: string, chain: string) => {
    setLoading(true)
    const url = `/api/portfolio`
    const response = await axios.post(url, {
      wallet: wallet,
      chain: chain
    })
    if (response.data.success) {
      const portfolio = response.data.data.portfolio.data
      setBalance(portfolio.total_wallet_balance ? portfolio.total_wallet_balance : 0)
      if (portfolio.assets) {
        let tempAssets = portfolio.assets.map((asset: any) => {
          return {
            id: asset.asset.id,
            amount: asset.token_balance,
            crypto: asset.asset.symbol,
            chain: asset.asset.name
          }
        })
        setAssets(tempAssets)
      }
      const histories = response.data.data.history.data
      let reducedData = histories.balance_history?.reduce((accaccumulator: any, currentValue: any) => {
        const historyDate = new Date(currentValue[0]);
        const date = `${historyDate.getFullYear()}-${historyDate.getMonth() + 1}-${historyDate.getDate()}`;
        if (!accaccumulator[date]) {
          accaccumulator[date] = {
            name: date,
            count: 1,
            totalAmount: currentValue[1],
          };
        } else {
          accaccumulator[date].totalAmount += currentValue[1];
          accaccumulator[date].count += 1;
        }
        return accaccumulator;
      }, {});
      let graphData = reducedData ? Object?.values(reducedData).map((item: any) => ({
        name: item.name,
        uv: item.totalAmount / item.count,
      })) : [];
      setHistory(graphData)
      setLoading(false)
    }
  }
  const updateUserWallet = async () => {
    const url = `/api/updateUserWallet`
    const response = await axios.post(url, {
      email: session.data?.user.email,
      wallet: address
    })
    if (response.data.success) {
      setBalance(response.data.data.data?.total_wallet_balance ? response.data.data.data?.total_wallet_balance : 0)
      if (response.data.data.data?.assets) {
        let tempAssets = response.data.data.data?.assets.map((asset: any) => {
          return {
            id: asset.asset.id,
            amount: asset.token_balance,
            crypto: asset.asset.symbol,
            chain: asset.asset.name
          }
        })
        setAssets(tempAssets)
      }
    }
  }
  const enableAnotherWallet = () => {
    console.log(isEnableAnotherWallet)
    if (isEnableAnotherWallet) {
      getPortfolio(session.data?.user.wallet || '', 'ethereum')
    }
    setIsEnableAnotherWallet(!isEnableAnotherWallet)
  }
  const getAnotherPortfolio = () => {
    getPortfolio(anotherAddress, 'ethereum')
  }
  useEffect(() => {
    if (session.data?.user.wallet) {
      getPortfolio(session.data?.user.wallet, 'ethereum')
    }
  }, [session.data?.user.wallet])
  useEffect(() => {
    const refreshSession = async () => {
      await updateUserWallet()
      session.update({
        user: {
          ...session.data?.user,
          wallet: address
        }
      })
    }
    if (isConnected && address) refreshSession()
  }, [address, isConnected])
  return (
    <>
      {loading && <div className='absolute w-full h-screen top-0 left-0 bg-[#00000090] z-50 flex items-center justify-center'><Loader /></div>}
      <div className={`${loading ? 'blur-sm' : ''}`}>
        {!(session.data?.user as any)?.wallet && <div className='absolute flex items-center justify-center bg-black top-0 left-0 w-full h-screen'>
          <ConnectButton />
          <Button className="w-[120px] text-red-500 bg-gray-700" onClick={() => signOut({ callbackUrl: '/auth/signin' })}>Logout</Button>
        </div>
        }
        {(session.data?.user as any)?.wallet && <div className='py-8 px-5'>
          <div className='flex flex-col lg:flex-row  justify-around items-center w-full gap-4'>
            <div className='flex flex-col'>
              <PortfolioInfo
                total_wallet_balance={balance}
                address={session.data?.user.wallet || ''}
              />
              <div className="flex flex-col space-y-2 mt-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" className='border-blue-300' checked={isEnableAnotherWallet} onCheckedChange={() => enableAnotherWallet()} />
                  <Label
                    htmlFor="terms"
                    className="text-sm text-blue-300 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Another Wallet Address
                  </Label>
                </div>
                <div className='flex items-center gap-3'>
                  <Input id="walletAddress" className="text-white bg-gray-800" placeholder="Another Wallet" autoComplete="off" disabled={!isEnableAnotherWallet} value={anotherAddress} onChange={(e) => setAnotherAddress(e.target.value)} />
                  <Button className='bg-blue-700 hover:bg-blue-800' onClick={() => getAnotherPortfolio()}>Get Portfolio</Button>
                </div>
              </div>
            </div>
            <PortfolioGraph
              data={history}
            />
          </div>
          <div className={`px-5`}>
            <PortfolioTable data={assets} />
          </div>
        </div>}
      </div>
    </>
  )
}

export default PortfolioPage