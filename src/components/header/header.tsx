import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  Image,
  Link,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import NextLink from "next/link";
import { useAccount } from "wagmi";

type Props = {};

export const Header: React.FC<Props> = ({}) => {
  const { address, isConnected } = useAccount(); 

  return (
    <Flex
      w="full"
      px={4}
      py={2}
      align="center"
      justify="space-between"
      position="absolute"
      top={0}
      background="#181A20"
    >
      <Box>
        <NextLink href="/" passHref={true}>
          <Link>
            <Image h={8} src="/logo.svg" alt="logo" />
          </Link>
        </NextLink>
      </Box>
      <Box px={16} flex={1}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <FaSearch color="E0E0E0" />
          </InputLeftElement>
          <Input
            color="text.white"
            placeholder="Search music, projects, and accounts"
          />
        </InputGroup>
      </Box>
      <Flex gap={4} align="center">
        <NextLink href="/" passHref={true}>
          <Button
            px={4}
            py={3}
            h="auto"
            fontWeight="bold"
            alignItems="center"
            variant="box"
            color="text.white"
          >
            Explore
          </Button>
        </NextLink>
        <NextLink href="/" passHref={true}>
          <Button
            px={4}
            py={3}
            h="auto"
            fontWeight="bold"
            alignItems="center"
            variant="box"
            color="text.white"
          >
            Bounties
          </Button>
        </NextLink>
        <NextLink href="/" passHref={true}>
          <Button
            px={4}
            py={3}
            h="auto"
            fontWeight="bold"
            alignItems="center"
            variant="box"
            color="text.white"
          >
            Feed
          </Button>
        </NextLink>
        <NextLink href="/" passHref={true}>
          <Button
            px={4}
            py={3}
            h="auto"
            fontWeight="bold"
            alignItems="center"
            variant="box"
            color="text.white"
          >
            Create
          </Button>
        </NextLink>
        <NextLink href="/login" passHref={true}>
          <Button
            px={4}
            py={3}
            h="auto"
            backgroundColor="#31353D"
            fontWeight="bold"
            alignItems="center"
            variant="box"
            color="text.white"
            rounded="full"
          >
            <Avatar size="sm" mr={3} />
            {isConnected == true ? <>{address?.slice(0,5)}</> : <>Connect Wallet</>}
          </Button>
        </NextLink>
      </Flex>
    </Flex>
  );
};
