import {
  Box,
  Button,
  Flex,
  GridItem,
  Icon,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useCallback, useEffect, useState } from "react";
import { AppContainer } from "src/components/appContainer";
import { ProjectCard } from "src/components/projectCard";
import { getPublications } from "../repositories/explore-publication";
import { Publication, Post, ExplorePublicationResult, PublicationSortCriteria, PublicationTypes } from "../generated/types";
import dayjs from 'dayjs';


const Dashboard: NextPage = () => {
  const [publications, setPublications] = useState<Post[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const publication = await getPublications({
        sources: ["0xC5623EeFA1f097b47be8A5Da6f229A51B1c72D44"],
        sortCriteria: PublicationSortCriteria.TopCollected,
        publicationTypes: [PublicationTypes.Post],
        timestamp: dayjs().set('date', 1).set('month', 4).set('year', 2022).unix()
      });
      console.log(publication!.items)
      setPublications(publication.items);
    };
    fetch();
  }, []);

  return (
    <AppContainer>
      <Flex w="full" direction="column" align="left">
        <Box color="text.white" textAlign="left">
        <SimpleGrid mt={8} gap={6} w="full" templateColumns="repeat(4, 1fr)">
            {(publications ?? []).map((publication, index) => (
              <GridItem key={index}>
                <ProjectCard post={publication} />
              </GridItem>
            ))}
          </SimpleGrid>
        </Box>
      </Flex>
    </AppContainer>
  );
};

export default Dashboard;
