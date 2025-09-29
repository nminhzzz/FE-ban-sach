import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  message,
  Space,
  theme,
  type MenuProps,
} from "antd";
import { IoMdBook } from "react-icons/io";
import { SiBitcoinsv } from "react-icons/si";

import { Link, Outlet } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import LogoHeader from "./header/Logo";
import { useCurrentApp } from "../context/app.context";
import { LogoutAPI } from "@/services/api";

const LayoutAdmin = () => {
  const { Header, Sider, Content } = Layout;
  const { user, setAuthentic, setUser } = useCurrentApp();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleLogout = async () => {
    const res = await LogoutAPI();
    if (res?.statusCode === 201) {
      message.success("Đăng xuất thành công");
    }
    // Dù backend trả gì, chủ động clear client state
    localStorage.removeItem("access_token");
    setAuthentic(false);
    setUser(null);
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <>Quản lý tài khoản </>,
    },
    {
      key: "2",
      label: <Link to="/">Trang Chủ</Link>,
    },
    {
      key: "3",
      label: (
        <div
          onClick={() => {
            handleLogout();
          }}
        >
          Đăng xuất
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="flex justify-between p-4">
        <LogoHeader />
        <div>
          <Dropdown
            menu={{ items }}
            placement="bottom"
            arrow={{ pointAtCenter: true }}
          >
            <Space style={{ cursor: "pointer" }}>
              <Avatar
                src={`${import.meta.env.VITE_BACKEND}/images/avatar/${
                  user?.avatar
                }`}
              />
              {user?.fullName}
            </Space>
          </Dropdown>
        </div>
      </div>

      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
          <div className="demo-logo-vertical" />
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <MdDashboard />,
                label: <Link to="/admin/">DashBroad</Link>,
              },
              {
                key: "2",
                icon: <UserOutlined />,
                label: <Link to="user">Manage Users</Link>,
              },
              {
                key: "3",
                icon: <IoMdBook />,
                label: <Link to="book">Manage Book</Link>,
              },
              {
                key: "4",
                icon: <SiBitcoinsv />,
                label: <Link to="order">Manage Order</Link>,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default LayoutAdmin;
