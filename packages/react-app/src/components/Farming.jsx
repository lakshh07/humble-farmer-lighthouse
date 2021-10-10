import React, { useState, useEffect } from "react";
import { Box, Flex, Grid, Button, Heading, Text, Stack } from "@chakra-ui/react";
import Chart from "react-apexcharts";
import axios from "axios";
import { modelFarm } from '../utils/Maths';

function Farming({ block }) {
  const [tokenData, setTokenData] = useState({ tokenPrice: "", tokenDate: "" });
  const [checkingDate, setCheckingDate] = useState(0);

  const tokenList = ["Eth"];
  const tokenDataList = tokenList.map(name => ({
    name: name,
    data: [],
  }));
  const returnList = ["Eth"];
  const returnDataList = returnList.map(name => ({
    name: name,
    data: [],
  }));

  const [returnsDataSet, setReturnsDataSet] = useState(returnDataList);
  const [tokenDataSet, setTokenDataSet] = useState(tokenDataList);

  useEffect(() => {
    const addReturnRandomly = data => {
      data = data || []
      if (Math.random() < 1 - 0.8) {
        return data;
      }
      return [
        ...data,
        {
          x: new Date(),
          y: data.length * Math.random(),
        },
      ];
    };
    const intervals = setInterval(() => {
      setReturnsDataSet([{
            name: returnsDataSet[0].name,
            data: addReturnRandomly(returnsDataSet[0].data),
          }]);
    }, 1000);

    return () => clearInterval(intervals);
  });
  useEffect(() => {

    const mGen = modelFarm(1, 1,'lp', 1000, 'token1', 'token2');
    const addTokenDataRandomly = data => {

        let nextPrice = mGen.next().value;
        if(nextPrice) {
          return [
            ...data,
            {
              x: new Date(),
              y: parseFloat(nextPrice.total_value.toString()),
            },
          ];
        } else {
          clearInterval(interval);
          return data;
        }
        
    };
    var interval = setInterval(() => {
      setTokenDataSet(
        tokenDataSet.map(val => {
          return {
            name: val.name,
            data: addTokenDataRandomly(val.data),
          };
        }),
      );
      console.log(tokenDataSet);
    }, 1000);

    return () => clearInterval(interval);
  },[]);

  const options = {
    chart: {
      color: "#fff",
      fontFamily: "PressStart2P",
      fontWeight: "400",
      fontSize: "8px",
      width: "100%",
      height: 400,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      animations: {
        easing: "linear",
        dynamicAnimation: {
          speed: 500,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: "8px",
      },
      x: {
        format: "yyyy/MM/dd HH:mm:ss.f",
      },
    },
    legend: {
      fontSize: "8px",
      labels: {
        colors: "#fff",
      },
    },
    stroke: {
      curve: "smooth",
    },
    dataLabels: {
      enabled: false,
    },
    noData: {
      text: "Please Wait! We are fetching data...",
      style: {
        color: "#fff",
        fontSize: "10px",
      },
    },
    xaxis: {
      type: "datetime",
      range: 30 * 1000,
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
      labels: {
        formatter: val => val.toFixed(0),
        style: {
          fontSize: "8px",
          colors: "#fff",
        },
      },
    }
  };

  const returnsOptions = {
    title: {
      text: "Returns",
      align: "left",
      margin: 20,
      style: {
        fontSize: "11px",
        fontWeight: "400",
        fontFamily: "PressStart2P",
        color: "#fff",
      },
    },
    ...options,
  };
  const tokensOptions = {
    title: {
      text: "Token Price",
      align: "left",
      margin: 20,
      style: {
        fontSize: "11px",
        fontWeight: "400",
        fontFamily: "PressStart2P",
        color: "#fff",
      },
    },
    ...options,
  };

  return (
    <>
      <Box p="2rem" align="center">
        <Flex mb="1rem" justifyContent="space-around">
          <Box w="45vw" className="box box-2">
            <Chart options={tokensOptions} series={tokenDataSet} type="line" />
          </Box>
          <Box w="45vw" className="box box-2">
            <Chart options={returnsOptions} series={returnsDataSet} type="area" />
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
