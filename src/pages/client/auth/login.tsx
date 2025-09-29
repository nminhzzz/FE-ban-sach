import { useCurrentApp } from "@/components/context/app.context";
import { loginAPI } from "@/services/api";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
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
    setLoading(true); // ✅ bắt đầu loading
    try {
      const res = await loginAPI(values.email, values.password);
      console.log(res);
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
      setLoading(false); // ✅ kết thúc loading
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h1 className="text-center">Trang đăng nhập tài khoản</h1>
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
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            label={null}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
