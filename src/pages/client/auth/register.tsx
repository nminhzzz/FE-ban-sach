import { Register } from "@/services/api";
import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  type FieldType = {
    fullName: string;
    email: string;
    password: string;
    phone: string;
  };
  const navigator = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const res = await Register(
      values.fullName,
      values.email,
      values.password,
      values.phone
    );
    if (res.statusCode === 201) {
      message.success("đăng kí thành công");
      navigator("/login");
    } else {
      message.success("lỗi đăng kí ");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <h1 className="text-center">Trang đăng Kí tài khoản </h1>
      <div className="flex items-center justify-center min-h-[20px]">
        <Form
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
            <Input autoComplete="username" />
          </Form.Item>
          <Form.Item<FieldType>
            label="email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "nhập chuẩn dạng email" },
            ]}
          >
            <Input autoComplete="email" />
          </Form.Item>
          <Form.Item<FieldType>
            label="password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password autoComplete="current-password" />
          </Form.Item>

          <Form.Item<FieldType>
            label="phone"
            name="phone"
            rules={[{ required: true, message: "Please input your phone!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default RegisterPage;
