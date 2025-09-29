import { DeleteOutlined } from "@ant-design/icons";
import { message, Space, Table } from "antd";
import type { TableProps } from "antd";
import UserEdit from "./userEdit";
import { DeleteUser } from "@/services/api";
import UserDetailView from "./userdetailview";
import { useState } from "react";

interface UserTableProps {
  userTable: AdminUser[] | null | undefined;
  current: number;
  pageSize: number;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  totol?: number;
  fetchData: () => void;
}
const UserTable: React.FC<UserTableProps> = ({
  userTable,
  current,
  pageSize,
  setCurrent,
  setPageSize,
  totol,
  fetchData,
}) => {
  const [open, setOpen] = useState(false);
  const [userDetailView, setUserDetailView] = useState<AdminUser>();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const columns: TableProps<AdminUser>["columns"] = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (_, record) => (
        <p
          onClick={() => {
            showDrawer();
            setUserDetailView(record);
          }}
        >
          {record._id}
        </p>
      ),
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "phone",
      dataIndex: "phone",
      key: "phone",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>
            <DeleteOutlined onClick={() => handleDeleteUser(record._id)} />
          </a>

          <UserEdit record={record} />
        </Space>
      ),
    },
  ];
  const handleDeleteUser = async (_id: string) => {
    const res = await DeleteUser(_id);
    if (res.statusCode === 200) {
      message.success("xoá user thành công");
      fetchData();
    } else {
      message.error("xoá user thất bại");
    }
  };
  return (
    <>
      <UserDetailView
        userDetailView={userDetailView}
        open={open}
        onClose={onClose}
      />
      <Table<AdminUser>
        rowKey={"_id"}
        columns={columns}
        dataSource={userTable ?? []}
        pagination={{
          current,
          pageSize,
          total: totol,
          onChange: (page, size) => {
            setCurrent(page);
            setPageSize(size);
          },
        }}
      />
    </>
  );
};
export default UserTable;
