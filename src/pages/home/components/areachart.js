import * as echarts from "echarts";
import { useEffect, useRef } from "react";

const Areachart = ({ title }) => {
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
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          areaStyle: {},
        },
      ],
    };

    option && myChart.setOption(option);
  }, [title]);
  return <div ref={chartRef} style={{ width: "400px", height: "400px" }}></div>;
};

export default Areachart;
