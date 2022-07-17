import { Box, Button, Flex, Icon, Stack, Text, Image } from "@chakra-ui/react";
import { useState } from "react";
import { Post } from "../../generated/types";

type Props = {
  post: Post;
};

export const ProjectCard: React.FC<Props> = ({ post }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <Flex
      w="300px"
      h="390px"
      whiteSpace="normal"
      textAlign="left"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="space-between"
      backgroundColor="#181A20"
      rounded="4"
      overflow="hidden"
      cursor="pointer"
      onClick={() => setShowAnswer((answer) => !answer)}
    >
      <Box w="full" h="full">
        <Box w="full">
          <Image h="300px" w="full" src={post.metadata.attributes[6].value!} alt="logo" />
        </Box>
        <Stack ml="18px" mt="12px" spacing={1}>
          <Text
            fontWeight="bold"
            fontSize="14px"
            color="#64748b"
            lineHeight="shorter"
          >
            {post.metadata.attributes[0].value!}
          </Text>
          <Text
            fontWeight="bold"
            fontSize="16px"
            color="white"
            lineHeight="shorter"
          >
            {post.metadata.attributes[2].value!}
          </Text>
        </Stack>
      </Box>
    </Flex>
  );
};
