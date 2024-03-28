"use client"

import '@uniswap/widgets/fonts.css'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Loader from '@/components/ui/loader'

const UniswapWidgetDynamic = dynamic(() => import("@/components/swap/swap"), {
  loading: () => <Loader size={100} />,
});

const SwapPage = () => {
  
  useEffect(()=>{},[])
  return (
    <>
      <div className="p-5 flex flex-col">
        <div className={`flex justify-around items-center w-full gap-4 py-8`}>
          <UniswapWidgetDynamic />
        </div>
      </div>
    </>
  )
}

export default SwapPage