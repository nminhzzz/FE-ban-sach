import { useCurrentApp } from "@/components/context/app.context";
import { LogoutAPI } from "@/services/api";
import { Avatar, Modal } from "antd";
import type { MenuProps } from "antd";
import { Dropdown, message } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserInfo from "./UserUpdate/userinfo";

import { Tabs } from "antd";
import type { TabsProps } from "antd";
import UserPassWord from "./UserUpdate/userpassword";

const UserHeader = () => {
  const { user, setAuthentic, setUser } = useCurrentApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userUpdate, setUserUpdate] = useState<IUser | null>();
  const navigate = useNavigate();

  const showModal = () => {
    setUserUpdate(user);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items: MenuProps["items"] = [
    ...(user?.role === "ADMIN"
      ? [
          {
            key: "1",
            label: <Link to="admin/">Trang quản trị</Link>,
          },
        ]
      : []),
    {
      key: "2",
      label: (
        <div
          onClick={() => {
            if (user?.role === "USER") {
              showModal();
            } else {
              alert("không được chỉnh sửa tài khoản ADMIN");
            }
          }}
        >
          Quản lý tài khoản{" "}
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          onClick={() => {
            navigate("/history");
          }}
        >
          Lịch sử mua hàng
        </div>
      ),
    },
    {
      key: "4",
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
  const itemss: TabsProps["items"] = [
    {
      key: "1",
      label: "Update Info",
      children: (
        <UserInfo setIsModalOpen={setIsModalOpen} userUpdate={userUpdate} />
      ),
    },
    {
      key: "2",
      label: "Update Password",
      children: (
        <UserPassWord setIsModalOpen={setIsModalOpen} userUpdate={userUpdate} />
      ),
    },
  ];
  return (
    <>
      <Modal
        title="Update User "
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Tabs defaultActiveKey="1" items={itemss} />
      </Modal>

      <Dropdown
        menu={{ items }}
        placement="bottom"
        arrow={{ pointAtCenter: true }}
      >
        <div className="flex items-center gap-4">
          <Avatar
            size={46}
            src={`${import.meta.env.VITE_BACKEND}/images/avatar/${
              user?.avatar
            }`}
          />

          <span className="text-[16px]">{user?.fullName}</span>
        </div>
      </Dropdown>
    </>
  );
};
export default UserHeader;
