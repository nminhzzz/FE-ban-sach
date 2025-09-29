import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const DoneOrder = () => {
  const navigate = useNavigate();

  return (
    <>
      <Result
        status="success"
        title="Đặt Hàng Thành Công"
        subTitle="Hệ thống đã ghi nhận đơn hàng của bạn."
        extra={[
          <Button key="console" onClick={() => navigate("/")}>
            Trang Chủ
          </Button>,
          <Button key="buy" onClick={() => navigate("/history")}>
            Lịch Sử Mua Hàng
          </Button>,
        ]}
      />
    </>
  );
};

export default DoneOrder;
