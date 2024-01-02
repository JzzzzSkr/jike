import { Alert } from "antd";
import "./Alert.scss"
import classNames from "classnames";

function Ant_Alert({ message, type }) {
  return <Alert message={message} type={type} className={classNames("alert")}/>;
}

export default Ant_Alert;
