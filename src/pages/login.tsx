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
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { login, generateChallenge } from "../repositories/login";
import { getProfileByAddressRequest } from "../repositories/get-profiles";
import { getPublications } from "../repositories/explore-publication";
import { ExplorePublicationRequest, PublicationSortCriteria } from "../generated/types";

const LoginPage: NextPage = () => {
  const { isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
    onSuccess(data) {
      handleConnect(data!.account);
    },
  });
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();

  async function handleConnect(address: string) {
    const challenge = await generateChallenge(address!);
    const signature = await signMessageAsync({
      message: challenge?.data?.challenge?.text,
    });
    login(address!, signature);
  }

  useEffect(() => {
    const hoge: ExplorePublicationRequest = {
      sources: ["0xC5623EeFA1f097b47be8A5Da6f229A51B1c72D44"],
      sortCriteria: PublicationSortCriteria.TopCollected,
    }
    getPublications(hoge)
    getProfileByAddressRequest("0x886Aa330E54Fba39e342111455B1923CEd05B01D");
  }, []);

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
