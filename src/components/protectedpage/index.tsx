import { FetchAccount } from "@/services/api";
import { Button, Result, Spin } from "antd";
import { useCurrentApp } from "components/context/app.context";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface IProps {
  children: React.ReactNode;
}

const ProtectedRoute = (props: IProps) => {
  const { Authentic, user } = useCurrentApp();
  const location = useLocation();
  const { setUser, setAuthentic } = useCurrentApp();
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        setIsCheckingAuth(true);
        const res = await FetchAccount();
        if (res && res.statusCode === 200) {
          setAuthentic(true);
          setUser(res.data?.user!);
        } else {
          // Nếu không có response hoặc statusCode khác 200, set về false
          setAuthentic(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        // Khi có lỗi, set về false để user có thể đăng nhập lại
        setAuthentic(false);
        setUser(null);
      } finally {
        setIsCheckingAuth(false);
      }
    })();
  }, []);

  // Hiển thị loading khi đang kiểm tra xác thực
  if (isCheckingAuth) {
    return (
      <Spin
        spinning={true}
        size="large"
        tip="Đang kiểm tra quyền truy cập..."
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#f5f5f5",
        }}
      >
        <div style={{ height: "100vh", width: "100%" }} />
      </Spin>
    );
  }

  if (Authentic === false) {
    return (
      <Result
        status="404"
        title="403"
        subTitle="Xin lỗi, bạn cần đăng nhập để vào trang này!!!"
        extra={
          <Button type="primary">
            <Link to={"/"}>Back Home</Link>
          </Button>
        }
      />
    );
  }
  const isAdminRoute = location.pathname.includes("admin");
  if (Authentic && isAdminRoute) {
    const role = user?.role;
    if (role === "USER") {
      return (
        <Result
          status="403"
          title="403"
          subTitle="Xin lỗi, Bạn không đủ quyền hạn truy cập vào trang này!!!"
          extra={
            <Button type="primary">
              <Link to={"/"}>Back Home</Link>
            </Button>
          }
        />
      );
    }
  }

  return <>{props.children}</>;
};

export default ProtectedRoute;
