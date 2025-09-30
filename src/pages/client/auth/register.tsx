import { Register } from "@/services/api";
import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import { useNavigate, Link } from "react-router-dom";

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
      message.success("Đăng ký thành công");
      navigator("/login");
    } else {
      message.error("Lỗi đăng ký");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Đăng ký tài khoản
        </h1>

        <Form
          name="register"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Họ và tên"
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          >
            <Input placeholder="Nhập họ và tên" autoComplete="username" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input placeholder="Nhập email" autoComplete="email" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              placeholder="Nhập mật khẩu"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>

        <p className="text-center text-gray-600">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
