import "./index.scss";
import { Card, Form, Input, Button, message } from "antd";
import logo from "@/assets/logo.png";
import React, { useState } from "react";
import { Alert } from "antd";
import classNames from "classnames";

const Login = () => {
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    type: "",
    message: "",
  });

  const onFinish = (values) => {
    setAlertInfo({ show: true, type: "success", message: "登录成功" });
  };
  const onFinishFailed = (errorInfo) => {
    setAlertInfo({ show: true, type: "error", message: "登录失败" }); // 登录失败
  };

  return (
    <div className="login">
      {alertInfo.show && (
        <Alert
          message={alertInfo.message}
          type={alertInfo.type}
          className={classNames("alert")}
        />
      )}
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form
          validateTrigger="onBlur"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="mobile"
            // 多条校验逻辑 先校验第一条 第一条通过之后再校验第二条
            rules={[
              {
                required: true,
                message: "请输入手机号",
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "请输入正确的手机号格式",
              },
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: "请输入验证码",
              },
            ]}
          >
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
