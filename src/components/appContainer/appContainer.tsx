import { Box, Flex, FlexProps } from "@chakra-ui/react"
import { Header } from "../header"

export const AppContainer: React.FC = ({
  children,
  ...flexProps
}) => {
  return (
    <>
      <Header/>
        <Flex
          w="full" minH="100vh" px={24} pt={32} pb={16}
          direction="column"
          align="center"
          background="background.main"
          {...flexProps}
        >
          {children}
        </Flex>
    </>
  )
}
