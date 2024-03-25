'use client'

import { useEffect, useState } from 'react'
import { useAccount } from "wagmi"
import axios from 'axios'
import dynamic from 'next/dynamic'
import Loader from "@/components/ui/loader";

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
  const { address, isConnected } = useAccount()
  const [data, setData] = useState<any>({
    total_wallet_balance: 0,
    assets: []
  })

  useEffect(() => {
    const getPortfolio = async () => {
      const url = `/api/portfolio`
      const response = await axios.post(url, {
        wallet: address,
        chain: 'etherum'
      })
      console.log('test')
      console.log(response.data)
      if (response.data.success) setData(response.data)
    }
    getPortfolio()
  }, [address])
  return (
    <>
      <div className="p-5 flex flex-col">
        <div className={`flex justify-around items-center w-full gap-4 ${isConnected?'':'blur'}`}>
          <PortfolioInfo 
            total_wallet_balance={data.total_wallet_balance}
            address={address||''}
          />
          <PortfolioGraph 
          />
        </div>
      </div>
      <div className={`px-5 ${isConnected?'':'blur'}`}>
        <PortfolioTable data={[]} isConnected={isConnected} />
      </div>
    </>
  )
}

export default PortfolioPage