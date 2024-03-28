'use client'

import { SwapWidget, Theme, TokenInfo } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'
import { JSON_RPC_URL, TOKEN_LIST } from '@/utils/constants'
import { InfuraProvider } from "@ethersproject/providers"
import { useEffect, useState } from 'react'

const provider = new InfuraProvider(1, "958524c46386411f8104c19bcd8f2903")

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

//   const [tokenList, setTokenList] = useState<TokenInfo[]>()

//   useEffect(() => {
//     (window as any).Browser = {
//       T: () => {}
//     }

//     // fetch(TOKEN_LIST).then(res => res.json()).then(res => res.tokens.filter((token) => token.chainId === 1)).then(setTokenList)
//   }, [])
  
// // console.log(tokenList)
  return (
    <>
      <div className="p-5 flex flex-col">
        <div className={`flex justify-around items-center w-full gap-4 py-8`}>

        </div>
      </div>
    </>
  )
}

export default SwapPage