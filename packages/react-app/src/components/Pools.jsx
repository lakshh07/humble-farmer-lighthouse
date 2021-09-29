import React from "react";
import { Box, Flex, Heading, Text, Image, Grid } from "@chakra-ui/react";
import farms from "../utils/PoolsMockData";
import "../utils/Utils.js";

function Pools({}) {
  function handleChange(value) {}
  return (
    <>
      <Box mt="2.2rem" mx="3.5rem" overflow="hidden">
        <Heading className="BoxHeading" fontSize="20px" color="#f8f8f8" fontFamily="PressStart2P" fontWeight="400">
          Investment Farms
        </Heading>
        <Flex flexDirection="column" alignItems="center" mt="4rem">
          <Box cursor="pointer" mb="1rem" px="2rem" w="100%">
            <Grid
              color="#fff"
              fontSize="14px"
              fontWeight="400"
              fontFamily="PressStart2P"
              templateColumns="repeat(5, 1fr)"
              mx="5vw"
              gap="4rem"
              w="100%"
            >
              <Text>Provider</Text>
              <Text>Assets</Text>
              <Text>Pool Value</Text>
              <Text>Volume(24hrs)</Text>
              <Text>NET APR</Text>
            </Grid>
          </Box>
          <Box maxH="70vh" w="100%" overflowX="hidden" overflowY="auto">
            {farms.map((list, index) => {
              return (
                <Box className="boxx" w="100%" key={index}>
                  <Box cursor="pointer" className="box" p="1.5rem" justifyContent="baseline">
                    <Grid
                      color="#fff"
                      fontFamily="Raleway"
                      fontWeight="400"
                      fontSize="17px"
                      templateColumns="repeat(5, 1fr)"
                      mx="5vw"
                      gap="4rem"
                      alignItems="center"
                      w="100%"
                    >
                      <Flex align="center">
                        <Image src={list.logo} boxSize="22px" />
                        <Text ml="0.5rem">{list.provider}</Text>
                      </Flex>
                      <Text>{list.assets}</Text>
                      <Text>{list.poolValue}</Text>
                      <Text>{list.volume}</Text>
                      <Text>{list.apr}</Text>
                    </Grid>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default Pools;
