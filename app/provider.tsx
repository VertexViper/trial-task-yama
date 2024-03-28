"use client"
import '@rainbow-me/rainbowkit/styles.css';

import React from "react"
import { SessionProvider } from "next-auth/react"

import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
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

export const config = getDefaultConfig({
  appName: 'trial-task-yama',
  projectId: '1ee65914-030b-4b6a-9ca7-9b5e9fad5d74=a757d560c083e67abba1c79e3f2d61b3c4e39907ac583aac3523ad7bf2058175',
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true,
});

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
