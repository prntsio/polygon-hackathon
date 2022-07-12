import React, { useEffect } from "react";
import { AppInitialProps, AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "src/theme";
import {
  WagmiConfig,
  createClient,
  configureChains,
  defaultChains,
  chain,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider, webSocketProvider } = configureChains(
  [chain.polygon],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

type Props = AppProps<AppInitialProps>;

const App: React.FC<Props> = ({ Component, pageProps }) => {
  return (
    <WagmiConfig client={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </WagmiConfig>
  );
};

export default App;
