"use client"
import '@rainbow-me/rainbowkit/styles.css';

import React from "react"
import { SessionProvider } from "next-auth/react"

import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import { WagmiProvider, createConfig, http } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: 'Trial Task Yama',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

// const config = createConfig({
//   chains: [mainnet, polygon, optimism, arbitrum, base],
//   transports: {
//     [mainnet.id]: http(),
//     [polygon.id]: http(),
//     [optimism.id]: http(),
//     [arbitrum.id]: http(),
//     [base.id]: http(),
//   },
// })


interface ProvidersProps {
  children: React.ReactNode
}

const queryClient = new QueryClient();

export const Provider: React.FC<ProvidersProps> = ({ children }) => (
  <SessionProvider>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#7b3fe4',
            accentColorForeground: 'white',
            borderRadius: 'small',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </SessionProvider>
)
