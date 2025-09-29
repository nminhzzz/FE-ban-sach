import "../../../index.css";
import { RingLoader } from "react-spinners";
import { Link } from "react-router-dom";
const LogoHeader = () => {
  return (
    <Link to="/">
      <div className="text-3xl text-blue-300 flex gap-2 font-black ">
        <RingLoader size={40} color="#61d5f5ff" />
        <h1 className="">LNM</h1>
      </div>
    </Link>
  );
};
export default LogoHeader;
