import "./index.scss";
import { Card, Form, Input, Button, message } from "antd";
import logo from "@/assets/logo.png";
import React, { useEffect, useState } from "react";
import { Ant_Alert } from "@/components";
import { useDispatch } from "react-redux";
import { fetchLogin } from "@/store/models/token";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    type: "",
    message: "",
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onFinish = (values) => {
    // Trigger the asynchronous fetchLogin, obtain the token from the backend, and store it in Redux
    dispatch(fetchLogin(values));

    // Page navigation
    setTimeout(() => {
      navigate("/");
    }, 2000);

    // Notify the user
    setAlertInfo({ show: true, type: "success", message: "Login successful" });
  };

  const onFinishFailed = (errorInfo) => {
    setAlertInfo({ show: true, type: "error", message: "Login failed" }); // Login failed
  };

  return (
    <div className="login">
      {alertInfo.show && (
        <Ant_Alert
          message={alertInfo.message}
          type={alertInfo.type}
        ></Ant_Alert>
      )}
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* Login form */}
        <Form
          validateTrigger="onBlur"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="mobile"
            // Multiple validation rules - validate the first rule, and if it passes, then validate the second rule
            rules={[
              {
                required: true,
                message: "Please enter your mobile number",
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "Please enter a valid mobile number format",
              },
            ]}
          >
            <Input size="large" placeholder="Please enter your mobile number" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: "Please enter the verification code",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Please enter the verification code"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
