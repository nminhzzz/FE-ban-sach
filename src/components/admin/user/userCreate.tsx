import { useState } from "react";
import { Modal, Button, Form, Input, message } from "antd";
import type { FormProps } from "antd";
import { CreateUser } from "@/services/api";

type FieldType = {
  fullName: string;
  password: string;
  email: string;
  phone: string;
};
type TProps = {
  fetchData: () => void;
};

const UserCreate: React.FC<TProps> = ({ fetchData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm(); // để reset form sau khi submit

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Form Values:", values);
    const res = await CreateUser(
      values.fullName,
      values.password,
      values.email,
      values.phone
    );
    if (res.statusCode === 201) {
      message.success("tạo user thành công");
      form.resetFields();
      fetchData();
    } else {
      message.error("tạo user thất bại");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create
      </Button>
      <Modal
        title="Create User"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null} // bỏ footer default để nút Submit trong Form xử lý
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="fullName"
            name="fullName"
            rules={[{ required: true, message: "Please input your fullName!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType>
            label="email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "please input email font right" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="phone"
            name="phone"
            rules={[{ required: true, message: "Please input your phone!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Tạo
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserCreate;
