import { Avatar, Box, Button, Flex, Icon, Image, Link } from "@chakra-ui/react"
import { FaChevronRight } from "react-icons/fa"
import useSWR from "swr"
import NextLink from "next/link"
import { getAccount } from "src/repositories/web3"


type Props = {
}

export const Header: React.FC<Props> = ({
}) => {  
    const {data: balance} = useSWR("/token/fetchBalance", (url) => getAccount())

  return (
    <Flex w="full" px={8} py={6} align="center" justify="space-between" position="absolute" top={0} background="#181A20">
      <Box>
        <NextLink href="/" passHref={true}>
          <Link>
            <Image h={10} src="/logo.svg" alt="logo"/>
          </Link>
        </NextLink>
      </Box>
      <Flex gap={4} align="center">
        <NextLink href="/" passHref={true}>
          <Button px={4} py={3} h="auto" fontWeight="bold" alignItems="center" variant="box" color="text.white">
            <Avatar size="sm" mr={3}/>
            {balance}
            <Icon ml={2} as={FaChevronRight}/>
          </Button>
        </NextLink>
      </Flex>
    </Flex>
  )
}
