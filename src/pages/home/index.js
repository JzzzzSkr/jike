import * as echarts from "echarts";
import { useEffect } from "react";
import BarChart from "./components/barchart";

import chartImage from "../../assets/chart.png";

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${chartImage})`,
        height: "100%",
        width: "100%",
      }}
    ></div>
  );
};

export default Home;
