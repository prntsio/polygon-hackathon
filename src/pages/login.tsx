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
  useToast,
} from "@chakra-ui/react";
import { AppContainer } from "src/components/appContainer";
import { useContractWrite, useContractRead, useConnect, useDisconnect, useSignMessage, useAccount } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { login, generateChallenge } from "../repositories/login";
import { getProfileByAddressRequest } from "../repositories/get-profiles";
import { contractAddress } from "../repositories/constants";
import abi from "../repositories/abi.json";

const LoginPage: NextPage = () => {
  const toast = useToast();
  const {isConnected } = useAccount();
  const [address, setAddress] = useState<string>();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
    onSuccess(data) {
      setAddress(data!.account)
      handleConnect(data!.account);
    },
  });
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();

  const { data, isError, isLoading } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: abi,
    functionName: "getParticipantStatus",
    args: [address],
    onError(error) {
      console.log("Error", error);
    },
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  const {
    write: setParticipation,
  } = useContractWrite({
    addressOrName: contractAddress,
    contractInterface: abi,
    functionName: "setParticipation",
    args: [address, true],
    onError(error) {
      toast({
        title: error.name,
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
    onSuccess(data) {
      toast({
        title: "Success",
        description: "Your participation has been completed",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      console.log("Success", data);
    },
  });


  async function handleConnect(hoge: string) {
    const isParticipation = data
    const challenge = await generateChallenge(address!);
    const signature = await signMessageAsync({
      message: challenge?.data?.challenge?.text,
    });
    login(address!, signature);

    if (!isParticipation) {
      setParticipation()
    }
  }

  useEffect(() => {
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
