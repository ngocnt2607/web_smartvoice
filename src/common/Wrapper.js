/* eslint-disable no-restricted-globals */
import {
  AimOutlined, LogoutOutlined, UserOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/style.css";
import logo from "../assets/img/logongoc1.png";
import { BaseContext } from "../context/baseContext";
import authService from "../services/auth.service";

const { Header, Content, Footer, Sider } = Layout;

export const DEFAULT_KEY_MENU = "7" //Campaign

export default function Wrapper(props) {
  const navigate = useNavigate();
  const {key, setKey, collapsed} = useContext(BaseContext);

  // const user = authService.getCurrentUser();
  // const roleId = user.role.id;

  const handleClick = (e) => {
    setKey(e.key)
    switch (parseInt(e.key)) {
      case 7: {
        navigate("/spam");
        break;
      }
      case 8: {
        navigate("/profile");
        break;
      }
      case 10: {
        navigate('/smartvoice')
        break;
      }
      default: {
        authService.logout();
        navigate("/");
      }
    }
  };
  // <Menu
  //   onClick={handleClick}
  //   theme="dark"
  //   defaultSelectedKeys={[key]}
  //   mode="inline"
  // >
  //   <Menu.Item key="8" icon={<UserOutlined />}>
  //     Thông tin chung
  //   </Menu.Item>
  //   <Menu.Item key="9" icon={<LogoutOutlined />}>
  //     Đăng xuất
  //   </Menu.Item>
  // </Menu>;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
      {!collapsed && (
        <div className="logo">
         <img src={logo} alt=""/>
        </div>
      )}
        <Menu
          onClick={handleClick}
          theme="dark"
          defaultSelectedKeys={[key]}
          mode="horizontal"
        >
          <Menu.Item key="7" icon={<AimOutlined />}>
            Spam List
          </Menu.Item>
          <Menu.Item key="10" icon={<PhoneOutlined />}>
            Cước Smartvoice
          </Menu.Item>
          <Menu.Item key="8" icon={<UserOutlined />}>
            Thông tin chung
          </Menu.Item>
          <Menu.Item key="9" icon={<LogoutOutlined />}>
            Đăng xuất
          </Menu.Item>
          
        </Menu>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home </Breadcrumb.Item>
          {key === "7" && <Breadcrumb.Item>Spam</Breadcrumb.Item>}
          {key === "8" && (
            <Breadcrumb.Item>Thông tin người dùng</Breadcrumb.Item>
          )}
          {key === "10" && (
            <Breadcrumb.Item>Cước cuộc gọi</Breadcrumb.Item>
          )}

          {/* <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item> */}
        </Breadcrumb>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}
        >
          {props.children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Design by SNA Center
      </Footer>
    </Layout>
  );
}
