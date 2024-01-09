import { Layout, Menu, Popconfirm } from "antd";
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "@/store/models/token";
import { removeToken } from "@/utils/index";

const { Header, Sider } = Layout;

const items = [
  {
    label: "Home",
    key: "/",
    icon: <HomeOutlined />,
  },
  {
    label: "Article Management",
    key: "/article",
    icon: <DiffOutlined />,
  },
  {
    label: "Create Article",
    key: "/publish",
    icon: <EditOutlined />,
  },
];

const GeekLayout = () => {
  // Get user's personal information
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, []);
  const username = useSelector((state) => state.user.userInfo.name);

  // Navigate to the target page
  const navigate = useNavigate();
  const jumpToPage = (e) => {
    navigate(e.key);
  };

  // Highlight the selected tab when clicked
  const location = useLocation();
  const selectedKey = location.pathname;

  // Handle logout when clicking the logout button
  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{username}</span>
          <span className="user-logout">
            <Popconfirm
              title="Are you sure you want to log out?"
              okText="Logout"
              cancelText="Cancel"
              onConfirm={handleLogout}
            >
              <LogoutOutlined /> Logout
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={selectedKey}
            onClick={jumpToPage}
            items={items}
            style={{ height: "100%", borderRight: 0 }}
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* Outlet for the secondary routes */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default GeekLayout;
