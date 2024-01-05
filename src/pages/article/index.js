import {
  Breadcrumb,
  Card,
  Form,
  Radio,
  Select,
  DatePicker,
  Button,
  Space,
  Table,
  Tag,
  Popconfirm,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getChannelAPI,
  getArticleListAPI,
  deleteArticleAPI,
} from "../../apis/article";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import img404 from "@/assets/error.png";
import { use } from "echarts";
import { useNavigate } from "react-router-dom";

const Article = () => {
  const status = {
    1: <Tag color="warning">待审核</Tag>,
    2: <Tag color="success">审核通过</Tag>,
  };

  // 点击编辑按钮，携带文章id跳转到编辑页面
  const navigate = useNavigate();
  const jumpPage = (id) => {
    console.log(id);
    navigate(`/publish?id=${id}`);
  };

  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      width: 120,
      render: (cover) => {
        return (
          <img src={cover.images[0] || img404} alt="" width={80} height={60} />
        );
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 220,
    },
    {
      title: "状态",
      dataIndex: "status",
      // data - 后端返回的状态status 根据它做条件渲染
      // data === 1 => 待审核
      // data === 2 => 审核通过

      render: (data) => status[data],
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
    },
    {
      title: "操作",
      render: (data) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={()=>jumpPage(data.id)}
            />
            <Popconfirm
              title="删除文章"
              description="确认要删除当前文章吗?"
              onConfirm={() => onConfirm(data)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const { RangePicker } = DatePicker;

  // 获取文章列表
  const [reqData, setReqData] = useState({
    status: "",
    channel_id: "",
    begin_pubdate: "",
    end_pubdate: "",
    page: 1,
    per_page: 5,
  });
  const [formData, setFormDate] = useState();
  const collection = async (values) => {
    // console.log(values);
    setFormDate(values);
    setReqData({
      ...reqData,
      status: values.status,
      channel_id: values.channel,
      begin_pubdate: values.date[0].format("YYYY-MM-DD"),
      end_pubdate: values.date[1].format("YYYY-MM-DD"),
    });
  };

  // 渲染频道列表
  const [channelList, setChannelList] = useState([]);
  // 获取文章列表
  const [list, setList] = useState([]);
  useEffect(() => {
    // 获取频道列表
    const getChannelList = async () => {
      const channelList = await getChannelAPI();
      setChannelList(channelList.data.channels);
      // console.log(channelList.data.channels);
    };
    getChannelList();

    const getArticleList = async () => {
      const res = await getArticleListAPI(reqData);
      // console.log(formData);

      setList(res.data.results);
      // console.log(res.data.results);
    };
    getArticleList();
  }, [reqData]);

  // console.log(formData);

  const onConfirm = async (data) => {
    // console.log('确认删除');
    console.log("id", data.id);
    const res = await deleteArticleAPI(data.id);
    // console.log(res);
    if (res.message === "OK") {
      message.success("删除成功");
      setReqData({
        ...reqData,
      });
    }
  };

  return (
    <div>
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: <Link to={window.location.pathname}>文章列表</Link> },
            ]}
          />
        }
      >
        <Form onFinish={collection} name="filterForm">
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={""}> 全部 </Radio>
              <Radio value={1}> 草稿 </Radio>
              <Radio value={2}> 审核通过 </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="频道" name="channel">
            <Select style={{ width: "100px" }}>
              {channelList?.map((item) => (
                <Select.Option value={item.id} key={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="日期" name="date">
            <RangePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="filterBtn">
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格区域 */}
      <Card title={"根据筛选条件共查询到 " + list.length + " 条结果："}>
        <Table
          style={{ height: "300px" }}
          rowKey="id"
          columns={columns}
          dataSource={list}
          pagination={{
            total: list.length,
            pageSize: 2,
            // onChange: onPageChange,
          }}
        />
      </Card>
    </div>
  );
};

export default Article;
