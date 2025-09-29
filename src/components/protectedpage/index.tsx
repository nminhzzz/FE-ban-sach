import { FetchAccount } from "@/services/api";
import { Button, Result } from "antd";
import { useCurrentApp } from "components/context/app.context";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

interface IProps {
  children: React.ReactNode;
}

const ProtectedRoute = (props: IProps) => {
  const { Authentic, user } = useCurrentApp();
  const location = useLocation();
  const { setUser, setAuthentic } = useCurrentApp();
  useEffect(() => {
    (async () => {
      const res = await FetchAccount();
      if (res.statusCode === 200) {
        setAuthentic(true);
        setUser(res.data?.user!);
      }
    })();
  }, []);

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
