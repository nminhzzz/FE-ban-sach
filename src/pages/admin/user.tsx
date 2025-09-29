import UserCreate from "@/components/admin/user/userCreate";
import UserTable from "@/components/admin/user/userTable";
import { GetUser } from "@/services/api";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button } from "antd";
import UserListImport from "@/components/admin/user/userListImport";
import type { FormProps } from "antd";
import { Form, Input } from "antd";

type FieldType = {
  fullName?: string;
  email?: string;
};

const UserAdmin = () => {
  const [userTable, setUserTable] = useState<AdminUser[] | null>();
  const [userFilter, setUserFilter] = useState<AdminUser[] | null>();

  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totol, setTotol] = useState<number>();

  const exportToExcel = (data: AdminUser[], fileName: string) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    // 4. Lưu file
    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(blob, `${fileName}.xlsx`);
  };

  const fetchData = async () => {
    const res = await GetUser(current, pageSize);
    setUserTable(res.data?.result);
    setTotol(res.data?.meta.total);
    setUserFilter(res.data?.result ?? []); // ⬅️ ban đầu hiển thị tất cả
  };
  useEffect(() => {
    fetchData();
  }, [current, pageSize]);

  const onFinish = (values: { fullName?: string; email?: string }) => {
    const filtered = userTable?.filter((user) => {
      // điều kiện lọc theo tên
      const matchName = values.fullName
        ? user.fullName?.toLowerCase().includes(values.fullName.toLowerCase())
        : true;

      // điều kiện lọc theo email
      const matchEmail = values.email
        ? user.email?.toLowerCase().includes(values.email.toLowerCase())
        : true;

      return matchName && matchEmail;
    });

    setUserFilter(filtered); // cập nhật danh sách hiển thị
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  const handleReset = () => {
    // reset lại form + danh sách hiển thị
    setUserFilter(userTable); // lấy lại danh sách gốc
  };
  return (
    <>
      <div>
        <Form
          className="flex gap-10 justify-between  max-w-full"
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="fullName"
            name="fullName"
            className="w-1/3"
            // rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="email"
            name="email"
            className="w-1/3"
            // rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="reset" onClick={handleReset}>
              Reset
            </Button>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Tìm
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="flex justify-between">
        <h1 className="mb-2 text-xl font-bold">Table User</h1>
        <div className="flex gap-10">
          <UserCreate fetchData={fetchData} />
          <Button
            type="primary"
            onClick={() => exportToExcel(userTable ?? [], "danhSachUser")}
          >
            Export
          </Button>
          <UserListImport />
        </div>
      </div>

      <UserTable
        userTable={userFilter} // ⬅️ hiển thị danh sách đã lọc
        current={current}
        pageSize={pageSize}
        setCurrent={setCurrent}
        setPageSize={setPageSize}
        totol={totol}
        fetchData={fetchData}
      />
    </>
  );
};
export default UserAdmin;
