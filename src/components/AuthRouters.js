import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";

// 封装高阶组件，如果getToken函数没有返回任何东西，那么就导航到/login
function AuthRoute({ children }) {
  const token = getToken();

  if (!token) {
    return <Navigate to={"/login"} replace></Navigate>;
  }

  return <>{children}</>;
}

export default AuthRoute