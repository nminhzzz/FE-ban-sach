import { Outlet } from "react-router-dom";
import AppHeader from "./components/layout/app.header";
import { useCurrentApp } from "./components/context/app.context";
import { FetchAccount } from "./services/api";
import { useEffect } from "react";

const Layout = () => {
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

  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
};
export default Layout;
