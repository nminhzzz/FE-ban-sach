import React from "react";
import { Drawer, Descriptions, Avatar } from "antd";

type Tprops = {
  userDetailView?: AdminUser; // dữ liệu user được truyền vào
  open: boolean; // trạng thái mở Drawer
  onClose: () => void; // hàm đóng Drawer
};

const UserDetailView: React.FC<Tprops> = ({
  userDetailView,
  open,
  onClose,
}) => {
  return (
    <Drawer
      title="Chi tiết User"
      placement="right"
      width={400}
      onClose={onClose}
      open={open}
    >
      {userDetailView ? (
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label="Họ tên">
            {userDetailView.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {userDetailView.email}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {userDetailView.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Vai trò">
            {userDetailView.role}
          </Descriptions.Item>
          <Descriptions.Item label="Avatar">
            <Avatar
              src={`${import.meta.env.VITE_BACKEND}/images/avatar/${
                userDetailView.avatar
              }`}
              alt="avatar"
            />
          </Descriptions.Item>
          <Descriptions.Item label="ID">{userDetailView._id}</Descriptions.Item>
        </Descriptions>
      ) : (
        <p>Không có dữ liệu user.</p>
      )}
    </Drawer>
  );
};

export default UserDetailView;
