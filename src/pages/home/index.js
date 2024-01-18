import "./index.scss";
import LinearChart from "./components/linearchart";
import BarChart from "./components/barchart";
import AreaChart from "./components/areachart";
import GradientChart from "./components/gradient";

const Home = () => {
  return (
    <>
      <div className="up">
        <div className="left"><LinearChart title="Linear Graph"></LinearChart></div>
        <div className="middle"><BarChart title="Bar chart"></BarChart></div>
        <div className="right"><AreaChart title={"Area chart"}></AreaChart></div>
      </div>
      <div className="down"><GradientChart></GradientChart></div>
    </>
  );
};

export default Home;
