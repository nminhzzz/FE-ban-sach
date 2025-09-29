import { Outlet } from "react-router-dom";
import AppHeader from "./components/layout/app.header";
import { useCurrentApp } from "./components/context/app.context";
import { FetchAccount } from "./services/api";
import { useEffect, useState } from "react";
import { Spin } from "antd";

const Layout = () => {
  const { setUser, setAuthentic } = useCurrentApp();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
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
        console.error("Error fetching account:", error);
        // Khi có lỗi, set về false để user có thể đăng nhập lại
        setAuthentic(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Hiển thị loading khi đang tải dữ liệu
  if (isLoading) {
    return (
      <Spin
        spinning={true}
        size="large"
        tip="Đang tải ứng dụng..."
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#f5f5f5",
        }}
      >
        <div style={{ height: "100vh", width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <p style={{ marginTop: "20px", color: "#666", fontSize: "16px" }}>
              Vui lòng chờ trong giây lát...
            </p>
          </div>
        </div>
      </Spin>
    );
  }

  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
};
export default Layout;
