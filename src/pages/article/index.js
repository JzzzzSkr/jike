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
import { useForm } from "antd/es/form/Form";

const Article = () => {
  const [form] = useForm();

  const status = {
    1: <Tag color="warning">Pending Review</Tag>,
    2: <Tag color="success">Approved</Tag>,
  };

  // Clicking the edit button, navigate to the edit page with the article id
  const navigate = useNavigate();
  const jumpPage = (id) => {
    console.log(id);
    navigate(`/publish?id=${id}`);
  };

  const columns = [
    {
      title: "Cover",
      dataIndex: "cover",
      width: 120,
      render: (cover) => {
        return (
          <img src={cover.images[0] || img404} alt="" width={80} height={60} />
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      width: 220,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (data) => status[data],
    },
    {
      title: "Publish Date",
      dataIndex: "pubdate",
    },
    {
      title: "Views",
      dataIndex: "read_count",
    },
    {
      title: "Comments",
      dataIndex: "comment_count",
    },
    {
      title: "Likes",
      dataIndex: "like_count",
    },
    {
      title: "Action",
      render: (data) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => jumpPage(data.id)}
            />
            <Popconfirm
              title="Delete Article"
              description="Are you sure you want to delete this article?"
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

  // Get article list
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
    setFormDate(values);
    setReqData({
      ...reqData,
      status: values.status,
      channel_id: values.channel,
      begin_pubdate: values.date[0].format("YYYY-MM-DD"),
      end_pubdate: values.date[1].format("YYYY-MM-DD"),
    });
    
  };

  // Render channel list
  const [channelList, setChannelList] = useState([]);
  // Get article list
  const [list, setList] = useState([]);
  useEffect(() => {
    // Get channel list
    const getChannelList = async () => {
      const channelList = await getChannelAPI();
      setChannelList(channelList.data.channels);
    };
    getChannelList();

    const getArticleList = async () => {
      const res = await getArticleListAPI(reqData);
      setList(res.data.results);
    };
    getArticleList();
  }, [reqData]);

  const onConfirm = async (data) => {
    console.log("id", data.id);
    const res = await deleteArticleAPI(data.id);
    if (res.message === "OK") {
      message.success("Deleted successfully");
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
              { title: <Link to={"/"}>Home</Link> },
              {
                title: <Link to={window.location.pathname}>Article List</Link>,
              },
            ]}
          />
        }
      >
        <Form onFinish={collection} name="filterForm" form={form}>
          <Form.Item label="Status" name="status">
            <Radio.Group>
              <Radio value={""}>All</Radio>
              <Radio value={1}>Draft</Radio>
              <Radio value={2}>Approved</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Channel" name="channel">
            <Select style={{ width: "100px" }}>
              {channelList?.map((item) => (
                <Select.Option value={item.id} key={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <RangePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="filterBtn">
              Filter
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* Table area */}
      <Card
        title={
          "Found " + list.length + " results based on the filter criteria:"
        }
      >
        <Table
          style={{ height: "300px" }}
          rowKey="id"
          columns={columns}
          dataSource={list}
          pagination={{
            total: list.length,
            pageSize: 2,
          }}
        />
      </Card>
    </div>
  );
};

export default Article;
