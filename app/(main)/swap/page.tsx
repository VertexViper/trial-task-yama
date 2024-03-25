'use client'

import { useEffect, useState } from 'react'
import { useAccount } from "wagmi"
import axios from 'axios'
import { SwapWidget, Theme } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'

const SwapPage = () => {
  const { address, isConnected } = useAccount()
  const [data, setData] = useState<any>({})
  const theme: Theme = {
    primary: '#FFF',
    secondary: '#A9A9A9',
    interactive: '#444',
    container: '#1A1B1F',
    module: '#222633',
    accent: '#71FF98',
    outline: '#AAA',
    dialog: '#000',
    fontFamily: 'Josefin Sans',
  }

  useEffect(() => {
    const getHistory = async () => {
      const url = `/api/history`
      const response = await axios.post(url, {
        wallet: address,
        chain: 'etherum'
      })
      console.log('test')
      console.log(response.data)
      if (response.data.success) setData(response.data)
    }
    getHistory()
  }, [address])
  return (
    <>
      <div className="p-5 flex flex-col">
        <div className={`flex justify-around items-center w-full gap-4 py-8 ${isConnected?'':'hidden'}`}>
          <SwapWidget theme={theme} />
        </div>
      </div>
    </>
  )
}

export default SwapPage