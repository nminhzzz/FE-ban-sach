import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import { UpdatePassWord } from "@/services/api";

type FieldType = {
  email: string;
  oldpass: string;
  newpass: string;
};

type TProps = {
  setIsModalOpen: (v: boolean) => void;
  userUpdate?: IUser | null;
};

const UserPassWord: React.FC<TProps> = ({ setIsModalOpen, userUpdate }) => {
  // tạo instance form
  const [form] = Form.useForm<FieldType>();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const res = await UpdatePassWord(
      values.email,
      values.oldpass,
      values.newpass
    );
    if (res.statusCode === 201) {
      message.success("Thay đổi mật khẩu thành công");
      // reset form sau khi update
      form.resetFields();
      setIsModalOpen(false);
    } else {
      message.error("Thay đổi mật khẩu thất bại");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form} // truyền instance form vào đây
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{
        email: userUpdate?.email,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input disabled />
      </Form.Item>

      <Form.Item<FieldType>
        label="oldpass"
        name="oldpass"
        rules={[{ required: true, message: "Please input your oldpass!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item<FieldType>
        label="newpass"
        name="newpass"
        rules={[{ required: true, message: "Please input your newpass!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserPassWord;
