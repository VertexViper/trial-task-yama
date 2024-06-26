'use client'

import { useEffect, useState } from 'react'
import { useAccount } from "wagmi"
import axios from 'axios'
import dynamic from 'next/dynamic'
import Loader from "@/components/ui/loader";
import { signOut, useSession } from 'next-auth/react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

const PortfolioInfo = dynamic(() => import("@/components/portfolio/portfolioInfo"), {
  loading: () => <Loader size={50} />,
});
const PortfolioGraph = dynamic(() => import("@/components/portfolio/portfolioGraph"), {
  loading: () => <Loader />,
});
const PortfolioTable = dynamic(() => import("@/components/portfolio/portfolioTable"), {
  loading: () => <div className='flex items-center justify-center w-full'><Loader size={80} /></div>,
});
const PortfolioPage = () => {
  const session = useSession()
  const { toast } = useToast()
  const { address, isConnected } = useAccount()
  const [balance, setBalance] = useState<number>(0)
  const [assets, setAssets] = useState<Array<any>>([])
  const [history, setHistory] = useState<Array<any>>([])
  const [isEnableAnotherWallet, setIsEnableAnotherWallet] = useState<boolean>(false)
  const [anotherAddress, setAnotherAddress] = useState<string>('')
  const [portFolioLoading, setPortFolioLoading] = useState<boolean>(false)
  const [historyLoading, setHistoryLoading] = useState<boolean>(false)
  const getPortfolio = async (wallet: string, chain: string) => {
    try {
      setPortFolioLoading(true)
      const url = `/api/portfolio`
      const response = await axios.post(url, {
        wallet: wallet,
        chain: chain
      },
      {
        timeout: 20000 // Timeout in milliseconds (5000ms = 5 seconds)
      })
      if (response.data.success) {
        const portfolio = response.data.data.portfolio.data
        if (response.data.data?.portfolio.error) {
          setPortFolioLoading(false)
          toast({
            title: "Error",
            description: "Invalid wallet address",
          })
          return
        }
        setBalance(portfolio.total_wallet_balance ? portfolio.total_wallet_balance : 0)
        if (portfolio.assets) {
          let tempAssets = portfolio.assets.map((asset: any) => {
            return {
              id: asset.asset.id,
              amount: asset.token_balance,
              crypto: asset.asset.symbol,
              chain: asset.asset.name,
              usd: asset.estimated_balance
            }
          })
          setAssets(tempAssets)
        }
        setPortFolioLoading(false)
      }
    } catch (e) {
      setPortFolioLoading(false)
      setAssets([])
      setBalance(0)
      // getPortfolio(wallet, chain)
      toast({
        title: "Error",
        description: "Mobula API call takes long ... Getting portfolio failed. Please refresh the page",
      })
    }
  }
  const getHistory = async (wallet: string, chain: string) => {
    try {
      setHistoryLoading(true)
      const url = `/api/history`
      const response = await axios.post(url, {
        wallet: wallet,
        chain: chain
      },
      {
        timeout: 20000 // Timeout in milliseconds (5000ms = 5 seconds)
      })
      if (response.data.success) {
        const histories = response.data.data.history.data
        if (response.data.data?.history.error) {
          setHistoryLoading(false)
          toast({
            title: "Error",
            description: "Invalid wallet address",
          })
          return
        }
        let reducedData = histories?.balance_history?.reduce((accaccumulator: any, currentValue: any) => {
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
        setHistoryLoading(false)
      }
    } catch (e) {
      setHistoryLoading(false)
      setHistory([])
      // getHistory(wallet, chain)
      toast({
        title: "Error",
        description: "Mobula API call takes long... Getting history for graph failed. Please refresh the page",
      })
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
    if (isEnableAnotherWallet) {
      getPortfolio(session.data?.user.wallet || '', 'ethereum')
      getHistory(session.data?.user.wallet || '', 'ethereum')
    }
    setIsEnableAnotherWallet(!isEnableAnotherWallet)
  }
  const getAnotherPortfolio = () => {
    getPortfolio(anotherAddress || '', 'ethereum')
    getHistory(anotherAddress || '', 'ethereum')
  }
  useEffect(() => {
    if (session.data?.user.wallet) {
      getPortfolio(session.data?.user.wallet || '', 'ethereum')
      getHistory(session.data?.user.wallet || '', 'ethereum')
    }
  }, [session.data?.user.wallet])
  const [walletState, setWalletState] = useState<Array<any>>([])
  useEffect(() => {
    let temp = [
      {
        address: address,
        isConnected: isConnected
      },
      ...walletState
    ]
    setWalletState(temp)
    const refreshSession = async () => {
      await updateUserWallet()
      session.update({
        user: {
          ...session.data?.user,
          wallet: address
        }
      })
    }
    if (temp.length > 1 && temp[0].isConnected && !temp[1].isConnected) refreshSession()
  }, [address, isConnected])
  return (
    <>
      {/* {loading && <div className='absolute w-full h-screen top-0 left-0 bg-[#00000090] z-50 flex items-center justify-center'><Loader /></div>} */}
      <div>
        {!(session.data?.user as any)?.wallet && <div className='absolute flex items-center justify-center bg-black top-0 left-0 w-full h-screen gap-4'>
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
                loading={portFolioLoading}
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
                  <Button className='bg-blue-700 hover:bg-blue-800' disabled={!isEnableAnotherWallet} onClick={() => getAnotherPortfolio()}>Get Portfolio</Button>
                </div>
              </div>
            </div>
            {!historyLoading && <PortfolioGraph
              data={history}
            />}
            {historyLoading && <Loader />}
          </div>
          <div className={`px-5`}>
            <PortfolioTable data={assets} loading={portFolioLoading} />
          </div>
        </div>}
      </div>
    </>
  )
}

export default PortfolioPage