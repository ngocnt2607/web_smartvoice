/* eslint-disable no-unused-vars */
import React from "react";
import AuthService from "../../services/auth.service";
import { Descriptions, Badge, Card } from "antd";
import Wrapper from "../../common/Wrapper";
const Profile = () => {
  // const currentUser = AuthService.getCurrentUser();
  return (
    <Wrapper>
      <Descriptions bordered title="Thông tin người dùng">
        <Descriptions.Item span={3} label="ID">
          1{/* {currentUser.id} */}
        </Descriptions.Item>
        <Descriptions.Item span={3} label="Họ và tên">
          Leeon
          {/* {currentUser.fullname} */}
        </Descriptions.Item>
        <Descriptions.Item span={3} label="Username">
          Leeon
          {/* {currentUser.username} */}
        </Descriptions.Item>
        <Descriptions.Item span={3} label="Email">
          Leeon@gmail.com
          {/* {currentUser.email} */}
        </Descriptions.Item>
      </Descriptions>
    </Wrapper>
  );
};

export default Profile;
