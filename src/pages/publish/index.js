import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useSearchParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import MyEditor from "./components/wangEditor";
import {
  createArticleAPI,
  getChannelAPI,
  getArticleById,
} from "@/apis/article";
import "./index.scss";

const { Option } = Select;

const Publish = () => {
  const [channelList, setChannelList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const restRef = useRef(null);
  const [searcParams] = useSearchParams();

  // 获取频道列表
  useEffect(() => {
    const getChannelList = async () => {
      const res = await getChannelAPI();
      setChannelList(res.data.channels);
    };
    getChannelList();
  }, []);

  // 表单提交处理函数
  const onFinish = async (values) => {
    const { title, content, channel_id } = values;
    const reqData = {
      title,
      content,
      cover: {
        type: imageCount,
        images: fileList,
      },
      channel_id,
    };

    const res = await createArticleAPI(reqData);
    // setImageCount(0);
    console.log(res);
    // 如果res.message === 'OK'那么执行以下代码
    if (res.message === "OK") {
      restRef.current.click();
      // 如果上传成功，输出提示上传成功
      message.success("文章发布成功");
    } else {
      message.error("文章发布失败");
    }
  };

  // 上传图片变更处理
  const onChange = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setFileList(info.fileList);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  // 封面图片类型变更处理
  const onTypeChange = (e) => {
    setImageCount(e.target.value);
  };

  // 回填数据
  useEffect(() => {
    // 得到searParams里面的id

    // console.log(searcParams.get('id'));
    if (searcParams.get("id")) {
      // 使用id发送请求，获取数据
      const getArticleInfo = async () => {
        const res = await getArticleById(searcParams.get("id"));
        console.log(res);
      };
      getArticleInfo();
      return;
    }
  }, []);

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: <Link to={window.location.pathname}>发布</Link> },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>

          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageCount > 0 && (
              <Upload
                listType="picture-card"
                showUploadList
                action={"http://geek.itheima.net/v1_0/upload"}
                name="image"
                onChange={onChange}
                maxCount={imageCount}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>

          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                Publish
              </Button>
              <Button
                size="large"
                type="primary"
                htmlType="reset"
                onClick={() => {
                  setImageCount(0);
                }}
                ref={restRef}
                style={{ display: "none" }}
              >
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
