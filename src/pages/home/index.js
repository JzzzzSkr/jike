import * as echarts from "echarts";
import { useEffect } from "react";
import BarChart from "./components/barchart";

const Home = () => {
  return (
    <div>
      <BarChart title={'a'}></BarChart>
      <BarChart title={'b'}></BarChart>
    </div>
  );
};

export default Home;
