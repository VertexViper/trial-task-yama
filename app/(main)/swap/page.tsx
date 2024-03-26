'use client'

import { SwapWidget, Theme } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'

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
  return (
    <>
      <div className="p-5 flex flex-col">
        <div className={`flex justify-around items-center w-full gap-4 py-8`}>
          <SwapWidget theme={theme} />
        </div>
      </div>
    </>
  )
}

export default SwapPage