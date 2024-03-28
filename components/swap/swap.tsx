import React from 'react';
import { SwapWidget, Theme} from '@uniswap/widgets'
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

const UniswapWidget = () => {
  return<SwapWidget />;
};

export default UniswapWidget;