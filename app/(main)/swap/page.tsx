"use client"

import { SwapWidget, Theme } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Loader from '@/components/ui/loader'
// import { JSON_RPC_URL } from '@/utils/constants'
// import { InfuraProvider } from "@ethersproject/providers"

// const provider = new InfuraProvider(1, "958524c46386411f8104c19bcd8f2903")

const UniswapWidgetDynamic = dynamic(() => import("@/components/portfolio/portfolioInfo"), {
  loading: () => <Loader size={100} />,
  ssr: false,
});

const SwapPage = () => {
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
  useEffect(()=>{},[])
  return (
    <>
      <div className="p-5 flex flex-col">
        <div className={`flex justify-around items-center w-full gap-4 py-8`}>
          {/* <SwapWidget
            theme={theme}
            // provider={provider}
            // jsonRpcUrlMap={JSON_RPC_URL}
          /> */}
          <UniswapWidgetDynamic />
        </div>
      </div>
    </>
  )
}

export default SwapPage