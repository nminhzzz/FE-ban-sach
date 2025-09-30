import { useCurrentApp } from "@/components/context/app.context";
import { loginAPI } from "@/services/api";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  type FieldType = {
    email: string;
    password: string;
    remember: string;
  };

  const [loading, setLoading] = useState<boolean>(false);
  const { setAuthentic, setUser } = useCurrentApp();
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    try {
      const res = await loginAPI(values.email, values.password);
      if (res.statusCode === 201) {
        localStorage.setItem("access_token", res.data?.access_token!);
        message.success("Đăng nhập thành công");
        setAuthentic(true);
        const u = res.data?.user!;
        setUser({
          email: u.email,
          phone: u.phone,
          fullName: u.fullName,
          role: u.role,
          avatar: u.avatar,
          id: u._id,
        });
        navigate("/");
      } else {
        message.error(`Đăng nhập thất bại: ${res.message}`);
      }
    } catch (err) {
      message.error(`Đăng nhập thất bại`);
    } finally {
      setLoading(false);
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
          Đăng nhập tài khoản
        </h1>

        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          <Form.Item<FieldType> name="remember" valuePropName="checked">
            <Checkbox>Ghi nhớ đăng nhập</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full"
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        <p className="text-center text-gray-600">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
