import * as echarts from "echarts";
import { useEffect, useRef } from "react";

const LinearChart = ({ title }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    const chartDom = chartRef.current;

    let myChart = echarts.init(chartDom);
    let option;

    option = {
      title: {
        text: title,
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line",
        },
      ],
    };

    option && myChart.setOption(option);
  }, [title]);
  return <div ref={chartRef} style={{ width: "400px", height: "400px" }}></div>;
};

export default LinearChart;
