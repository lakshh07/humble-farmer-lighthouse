import React, { useState, useEffect } from "react";
import { Box, Flex, Grid, Button, Heading, Text, Stack } from "@chakra-ui/react";
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";
import axios from "axios";

function Farming({ block }) {
  const [EthCandleData, setEthCandleData] = useState([]);
  const [ethData, setEthData] = useState([]);
  const [maticData, setMaticData] = useState([]);

  const ethMaticData = () => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=max")
      .then(function (response) {
        // handle success
        console.log(response.data);
        setEthData(response.data.prices);
      });
    axios
      .get("https://api.coingecko.com/api/v3/coins/matic-network/market_chart?vs_currency=usd&days=max")
      .then(function (response) {
        // handle success
        console.log(response.data);
        setMaticData(response.data.prices);
      });
  };
  const ethereumCandleData = () => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/ethereum/ohlc?vs_currency=usd&days=max")
      .then(function (response) {
        // handle success
        console.log(response.data);

        setEthCandleData(response.data);
      });
  };
  useEffect(() => {
    ethereumCandleData();
    ethMaticData();
  }, []);

  let max = new Date().getTime(); // Current timestamp
  let min = new Date("2021-08-1").getTime(); // timestamp 90 days before

  let range = max - min;
  const apexSeries = [{ data: EthCandleData }];
  const apexOption = {
    chart: {
      fontFamily: "PressStart2P",
      fontWeight: "400",
      fontSize: "5px",
      // color: "#111",
      color: "#fff",
      type: "candlestick",
      height: 390,
      events: {
        // beforeZoom: function(chartContext, { xaxis }) {
        //   return {
        //     xaxis: {
        //       min: timestamp,
        //       max: timestamp
        //     }
        //   }
        beforeZoom: function (ctx) {
          ctx.w.config.xaxis.range = undefined;
        },
      },
    },
    title: {
      text: "Eth CandleStick Chart",
      align: "left",
      margin: 20,
      style: {
        fontSize: "10px",
        fontWeight: "400",
        fontFamily: "PressStart2P",
        // color: "#111",
        color: "#fff",
      },
    },
    xaxis: {
      type: "datetime",
      range: range,
      labels: {
        style: {
          fontSize: "8px",
          colors: "#fff",
        },
      },
      tooltip: {
        style: {
          fontSize: "8px",
        },
      },
    },
    yaxis: {
      decimalsInFloat: 0,
      // tickAmount: 10,
      labels: {
        style: {
          fontSize: "8px",
          colors: "#fff",
        },
      },
    },
    noData: {
      text: "Please Wait! We are fetching data...",
    },
    responsive: [
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: 290,
          },
        },
      },
    ],
  };

  const series = [
    {
      name: "Eth",
      data: ethData,
    },
    {
      name: "Matic",
      data: maticData,
    },
  ];
  const options = {
    chart: {
      fontFamily: "PressStart2P",
      fontWeight: "400",
      fontSize: "5x",
      // color: "#111",
      foreColor: "#fff",
      width: "100%",
      height: 400,
      type: "area",
      events: {
        // beforeZoom: function(chartContext, { xaxis }) {
        //   return {
        //     xaxis: {
        //       min: timestamp,
        //       max: timestamp
        //     }
        //   }
        beforeZoom: function (ctx) {
          ctx.w.config.xaxis.range = undefined;
        },
      },
    },
    title: {
      text: "Eth-Matic Chart",
      align: "left",
      margin: 20,
      style: {
        fontSize: "10px",
        fontWeight: "400",
        fontFamily: "PressStart2P",
        // color: "#111",
        color: "#fff",
      },
    },
    tooltip: {
      style: {
        fontSize: "8px",
      },
    },
    legend: {
      fontSize: "11px",
      labels: {
        colors: "#fff",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    noData: {
      text: "Please Wait! We are fetching data...",
    },
    yaxis: {
      decimalsInFloat: 0,
      tickAmount: 10,
      labels: {
        style: {
          fontSize: "8px",
          colors: "#fff",
        },
      },
    },
    xaxis: {
      type: "datetime",
      format: "MM/yy ",
      range: range,
      labels: {
        style: {
          fontSize: "8px",
          colors: "#fff",
        },
      },
      tooltip: {
        style: {
          fontSize: "8px",
        },
      },
    },
    responsive: [
      {
        breakpoint: 1200,
        options: {
          chart: {
            height: 300,
          },
        },
      },
    ],
  };

  return (
    <>
      <Box p="2rem" align="center">
        <Flex mb="1rem" justifyContent="space-around">
          <Box w="45vw" className="box box-2">
            <ReactApexChart options={options} series={series} type="area" />
          </Box>
          <Box w="45vw" className="box box-2">
            <ReactApexChart options={apexOption} type="candlestick" series={apexSeries} />
          </Box>
        </Flex>
        <Flex alignItems="center" justifyContent="space-around" m={1} w="93vw" h="auto" className="box">
          <Grid p="2rem" align="left" templateColumns="repeat(3, 1fr)" gap={4}>
            <Text
              color="#fff"
              className="farming-text"
              letterSpacing="1px"
              fontFamily="PressStart2P"
              fontWeight="600"
              fontSize="12px"
            >
              Current Value : <span>$4540</span>
            </Text>
            <Text
              color="#fff"
              className="farming-text"
              letterSpacing="1px"
              fontFamily="PressStart2P"
              fontWeight="700"
              fontSize="12px"
            >
              Token Value : <span>$4.5</span>
            </Text>
            <Text
              color="#fff"
              className="farming-text"
              letterSpacing="1px"
              fontFamily="PressStart2P"
              fontWeight="700"
              fontSize="12px"
            >
              Initial Investment: <span>$1000</span>
            </Text>
            <Text
              color="#fff"
              className="farming-text"
              letterSpacing="1px"
              fontFamily="PressStart2P"
              fontWeight="700"
              fontSize="12px"
            >
              HODL Value : <span>$976</span>
            </Text>
            <Text
              color="#fff"
              className="farming-text"
              letterSpacing="1px"
              fontFamily="PressStart2P"
              fontWeight="700"
              fontSize="12px"
            >
              Impermanent Loss : <span>$26</span>
            </Text>
          </Grid>
          <Flex bg="#f8f8f8" p="0.3rem" rounded="5px" alignItems="center" h="90px" maxW="200px" m="1rem">
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
