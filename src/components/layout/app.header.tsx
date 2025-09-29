import CartHeader from "./header/cart";
import LogoHeader from "./header/Logo";
import SearchHeader from "./header/search";
import UserHeader from "./header/user";
import { useCurrentApp } from "../context/app.context";
import { Link } from "react-router-dom";
const AppHeader = () => {
  const { user } = useCurrentApp();
  return (
    <>
      <div className="Header flex justify-between p-5 items-center">
        <div className="flex gap-10 flex-1 items-center">
          <LogoHeader />
          <SearchHeader />
        </div>
        <div className="flex gap-10 items-center">
          {" "}
          <CartHeader />
          {user ? (
            <>
              <UserHeader />
            </>
          ) : (
            <Link to="/login">Đăng nhập</Link>
          )}
        </div>
      </div>
    </>
  );
};
export default AppHeader;
