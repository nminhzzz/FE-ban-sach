import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Upload, message, Modal, Button } from "antd";
import * as XLSX from "xlsx";
import UserTable from "./userTable";
import { UploadListUser } from "@/services/api";

const { Dragger } = Upload;

const UserListImport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [userUpLoad, setUserUpLoad] = useState<UserListUpLoad[]>([]);
  const [fileList, setFileList] = useState<any[]>([]);

  // Đọc file excel và convert sang JSON
  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target?.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json<any>(worksheet);

      const mappedData: UserListUpLoad[] = jsonData.map((item) => ({
        fullName: String(item.fullName ?? item["Họ và tên"] ?? ""),
        password: `${item.password}`,
        email: String(item.email ?? item["Email"] ?? ""),
        phone: String(item.phone ?? item["SĐT"] ?? ""),
      }));

      setUserUpLoad(mappedData);
      setUsers(jsonData);
      message.success("Đọc file thành công!");
    };
    reader.readAsBinaryString(file);
    return false;
  };

  const handleOk = async () => {
    const res = await UploadListUser(userUpLoad);
    console.log(res);
    if (res.statusCode === 201 && res.data?.countSuccess != 0) {
      message.success("up load user thành công");
      setUsers([]);
      setFileList([]);
      setUserUpLoad([]);
      setIsModalOpen(false);
    } else {
      message.error("up load user thất bại");
    }
  };
  const props = {
    name: "file",
    multiple: false,
    fileList, // 🟢 điều khiển fileList
    beforeUpload: (file: File) => {
      handleFile(file);
      setFileList([file]); // lưu file
      return false; // chặn upload lên server
    },
    onRemove: () => {
      // khi xóa file
      setFileList([]);
      setUsers([]);
      setUserUpLoad([]);
    },
    onDrop(e: React.DragEvent<HTMLDivElement>) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Import
      </Button>
      <Modal
        className="flex"
        title="Import File"
        onOk={() => {
          handleOk();
        }}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      >
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
        </Dragger>

        {/* Hiển thị bảng user ngay dưới */}
        <UserTable
          userTable={users}
          current={1}
          pageSize={10}
          setCurrent={() => {}}
          setPageSize={() => {}}
          fetchData={() => {}}
        />
      </Modal>
    </>
  );
};

export default UserListImport;
