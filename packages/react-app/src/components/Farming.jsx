import React from "react";
import { Box, Flex, Grid, Button, Heading, Text, Stack } from "@chakra-ui/react";
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";
import apexSeries from "../utils/ChartData";

function Farming({ block }) {
  const series = [
    {
      name: "series1",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "series2",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  const apexOption = {
    chart: {
      type: "candlestick",
      height: 350,
    },
    title: {
      text: "CandleStick Chart",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };
  return (
    <>
      <Box p="2rem" align="center">
        <Flex mb="1rem" justifyContent="space-around">
          <Box w="45vw" h="300px" className="box">
            <ReactApexChart options={options} series={series} type="area" height={300} />
          </Box>
          <Box w="45vw" h="300px" className="box">
            <ReactApexChart options={apexOption} type="candlestick" series={apexSeries} height={280} />
          </Box>
        </Flex>
        <Flex alignItems="center" justifyContent="space-around" m={1} w="93vw" h="auto" className="box">
          <Grid p="2rem" align="left" templateColumns="repeat(3, 1fr)" gap={4}>
            <Text color="#000" className="farming-text" fontFamily="PressStart2P" fontWeight="700" fontSize="12px">
              Current Value : <span>$4540</span>
            </Text>
            <Text color="#000" className="farming-text" fontFamily="PressStart2P" fontWeight="700" fontSize="12px">
              Token Value : <span>$4.5</span>
            </Text>
            <Text color="#000" className="farming-text" fontFamily="PressStart2P" fontWeight="700" fontSize="12px">
              Initial Investment: <span>$1000</span>
            </Text>
            <Text color="#000" className="farming-text" fontFamily="PressStart2P" fontWeight="700" fontSize="12px">
              HODL Value : <span>$976</span>
            </Text>
            <Text color="#000" className="farming-text" fontFamily="PressStart2P" fontWeight="700" fontSize="12px">
              Impermanent Loss : <span>$26</span>
            </Text>
          </Grid>
          <Flex bg="#f8f8f8" p="0.3rem" rounded="5px" alignItems="center" h="90px" maxW="200px" my="1rem">
            <Box border="2px dashed black">
              <Text
                letterSpacing="3px"
                color="red"
                filter={"drop-shadow(0px 5px 3px rgba(255, 0, 0, 0.5))"}
                fontSize="2rem"
                fontFamily="Digital"
              >
                {block}
              </Text>
              <Text mt="0.8rem" color="#000" fontFamily="PressStart2P" fontWeight="400" fontSize="10px">
                BLOCK CLOCK
              </Text>
            </Box>
          </Flex>
          {/* <Button
            fontFamily="Raleway"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            Auto Compounding
          </Button> */}
        </Flex>
        <Flex justifyContent="space-around" mt="1rem" w="93vw" className="box">
          <Button
            color="#fff"
            m="1rem"
            fontSize="11px"
            fontWeight="400"
            fontFamily="PressStart2P"
            colorScheme="red"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            Stop Farming
          </Button>

          <Button
            color="#000"
            m="1rem"
            fontSize="11px"
            fontWeight="400"
            fontFamily="PressStart2P"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            Auto Compounding
          </Button>
          <Button
            color="#fff"
            m="1rem"
            fontSize="11px"
            fontWeight="400"
            fontFamily="PressStart2P"
            colorScheme="blue"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            Change Strategy
          </Button>
          <Button
            color="#fff"
            m="1rem"
            fontSize="11px"
            fontWeight="400"
            fontFamily="PressStart2P"
            colorScheme="green"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            Claim Rewards
          </Button>
        </Flex>
      </Box>
    </>
  );
}

export default Farming;
