import React, { useEffect, useState, useRef } from "react";
import { Box, Heading } from "@chakra-ui/react";
// import { Line } from "react-chartjs-2";
// import { Chart } from "chart.js";
// import buildChart from "../utils/buildChart";
import Chart from "react-apexcharts";

function CheckMode() {
  // let array = [65, 59, 80, 51, 56, 55, 40, 50];
  // let array2 = [6, 2, 4, 1, 5, 5, 4, 1];
  // const ref = useRef();

  // const [dataa, setDataa] = useState([65, 59, 80, 51, 56, 55, 40, 50]);
  // const [labels, setLabels] = useState([6, 2, 4, 1, 5, 5, 4, 1]);

  // useEffect(() => {
  //   const interval = setInterval(() => setData(genData()), 5000);

  //   return () => clearInterval(interval);
  // }, []);
  // const ctx = document.getElementById("myChart");
  // const labels = array2;
  // const data = array;
  // const chartType = "line";
  // const axes = false;
  // const legend = true;
  // const config = { ctx, chartType, labels, data, axes, legend };
  // buildChart(config);
  // let config = {
  //   type: "line",
  //   data: {
  //     labels: ["January", "February", "March", "April", "May", "June", "July"],
  //     datasets: [
  //       {
  //         label: "My First dataset",
  //         data: [65, 0, 80, 81, 56, 85, 40],
  //         fill: false,
  //       },
  //     ],
  //   },
  // };

  // let ctx = document.getElementById("myChart");
  // let myChart = new Chart(ctx, config);

  // setInterval(function () {
  //   config.data.labels.push(Math.random() * 100);
  //   config.data.datasets[0].data.push(Math.random() * 100);
  //   myChart.update();
  // }, 1000);
  // useEffect(() => {
  //   setInterval(() => {
  //     setLabels((...prevval) => {
  //       return [...prevval, Math.floor(Math.random() * 10) + 1];
  //     });
  //     setDataa((...prevval) => {
  //       return [...prevval, Math.floor(Math.random() * 95) + 20];
  //     });
  //     console.log(labels);
  //     console.log(dataa);
  //     ref.current.update();
  //     // array.push(Math.floor(Math.random() * 95) + 20);
  //     // array2.push(Math.floor(Math.random() * 10) + 1);
  //     // console.log(array);
  //     // console.log(array2);
  //     // let a = ref.chartInstance;
  //     // a.update();
  //   }, 2000);
  // }, []);

  // const data = {
  //   labels: labels,
  //   datasets: [
  //     {
  //       label: "My First dataset",
  //       fill: false,
  //       lineTension: 0.1,
  //       backgroundColor: "rgba(75,192,192)",
  //       borderColor: "rgba(75,192,192,1)",
  //       borderCapStyle: "butt",
  //       borderDash: [],
  //       borderDashOffset: 0.0,
  //       borderJoinStyle: "miter",
  //       pointBorderColor: "rgba(75,192,192,1)",
  //       pointBackgroundColor: "#fff",
  //       pointBorderWidth: 1,
  //       pointHoverRadius: 5,
  //       pointHoverBackgroundColor: "rgba(75,192,192,1)",
  //       pointHoverBorderColor: "rgba(220,220,220,1)",
  //       pointHoverBorderWidth: 2,
  //       pointRadius: 1,
  //       pointHitRadius: 10,
  //       data: dataa,
  //     },
  //   ],
  // };
  const TIME_RANGE_IN_MILLISECONDS = 30 * 1000;
  const ADDING_DATA_INTERVAL_IN_MILLISECONDS = 1000;
  const ADDING_DATA_RATIO = 0.8;

  const nameList = ["a", "b", "c"];
  const defaultDataList = nameList.map(name => ({
    name: name,
    data: [],
  }));
  const [dataList, setDataList] = React.useState(defaultDataList);

  React.useEffect(() => {
    const addDataRandomly = data => {
      if (Math.random() < 1 - ADDING_DATA_RATIO) {
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
    const interval = setInterval(() => {
      setDataList(
        dataList.map(val => {
          return {
            name: val.name,
            data: addDataRandomly(val.data),
          };
        }),
      );
      console.log(dataList);
    }, ADDING_DATA_INTERVAL_IN_MILLISECONDS);

    return () => clearInterval(interval);
  });

  const options = {
    chart: {
      zoom: {
        enabled: false,
      },
      animations: {
        easing: "linear",
        dynamicAnimation: {
          speed: 500,
        },
      },
    },
    tooltip: {
      x: {
        format: "yyyy/MM/dd HH:mm:ss.f",
      },
    },
    xaxis: {
      type: "datetime",
      range: TIME_RANGE_IN_MILLISECONDS,
    },
    yaxis: {
      labels: {
        formatter: val => val.toFixed(0),
      },
      title: { text: "Value" },
    },
  };
  return (
    <div>
      {" "}
      {/* <canvas id="myChart"></canvas> */}
      {/* <Line id="myChart" /> */}
      <Chart type="line" options={options} series={dataList} />
    </div>
  );
}

export default CheckMode;
