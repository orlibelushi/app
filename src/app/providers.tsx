'use client'

import { useState } from 'react'
import { ThemeProvider } from 'next-themes'
import { WagmiProvider, type State } from 'wagmi'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'

import wagmiConfig from '#/lib/wagmi'
import { DAY, MINUTE } from '#/lib/constants'
import Navigation from '#/components/navigation'
import { CartProvider } from '#/contexts/cart-context'
import { ActionsProvider } from '#/contexts/actions-context'
import { EFPProfileProvider } from '#/contexts/efp-profile-context'
import { TransactionsProvider } from '#/contexts/transactions-context'

type ProviderProps = {
  children: React.ReactNode
  initialState?: State
}

const Providers: React.FC<ProviderProps> = ({ children, initialState }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { gcTime: 1 * DAY, staleTime: 1 * MINUTE }
        }
      })
  )

  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem={true}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryStreamedHydration>
          <WagmiProvider config={wagmiConfig} initialState={initialState}>
            {/* <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}> */}
            <RainbowKitProvider
              coolMode={true}
              theme={localStorage.getItem('theme') === 'dark' ? darkTheme() : undefined}
            >
              <CartProvider>
                <EFPProfileProvider>
                  <TransactionsProvider>
                    <ActionsProvider>
                      <Navigation />
                      {children}
                    </ActionsProvider>
                  </TransactionsProvider>
                </EFPProfileProvider>
              </CartProvider>
            </RainbowKitProvider>
            {/* </PersistQueryClientProvider> */}
          </WagmiProvider>
        </ReactQueryStreamedHydration>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default Providers
