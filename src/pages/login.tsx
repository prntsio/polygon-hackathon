import type { NextPage } from "next";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AppContainer } from "src/components/appContainer";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const LoginPage: NextPage = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  return (
    <AppContainer>
      <Flex w="full" direction="column" align="left">
        <Box color="text.white" textAlign="left">
          <Box fontSize="5xl" fontWeight="bold" lineHeight="shorter">
            Login
          </Box>
        </Box>
        <Box
          color="text.white"
          textAlign="center"
          h="140px"
          alignItems="center"
          display="flex"
          justifyContent="center"
        >
          Connect with one of our availble wallet providers.
        </Box>
        <VStack spacing="8px" align="stretch">
          <Box
            h="84px"
            bg="#31353D"
            color="text.white"
            fontSize="2xl"
            fontWeight="bold"
          >
            <Flex h="full" p="44px" alignItems="center">
              <Image h="40px" src="/metamask.svg" alt="logo" />
              <Text pl="44px">MetaMask</Text>
              <Spacer />
              {isConnected == true ? (
                <Button
                  rounded="full"
                  backgroundColor="green.main"
                  onClick={() => disconnect()}
                >
                  Disconnect
                </Button>
              ) : (
                <Button
                  rounded="full"
                  backgroundColor="green.main"
                  onClick={() => connect()}
                >
                  Connect
                </Button>
              )}
            </Flex>
          </Box>
        </VStack>
      </Flex>
    </AppContainer>
  );
};

export default LoginPage;
