import { GetDashBroad } from "@/services/api";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

const DashBroad = () => {
  const [dashBroad, setDashBroad] = useState<DashBroad>();

  const fetchDashBroad = async () => {
    const res = await GetDashBroad();
    setDashBroad(res.data); // API trả về phải đúng shape
  };

  useEffect(() => {
    fetchDashBroad();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Row gutter={[16, 16]} className="w-full">
        <Col xs={24} md={8}>
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center">
            <h3 className="text-gray-500 text-sm mb-2">Số lượng Sách</h3>
            <CountUp
              className="text-3xl font-bold text-indigo-600"
              end={
                isNaN(Number(dashBroad?.countBook))
                  ? 0
                  : Number(dashBroad?.countBook)
              }
              duration={1.2}
            />
          </div>
        </Col>

        <Col xs={24} md={8}>
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center">
            <h3 className="text-gray-500 text-sm mb-2">Số lượng Đơn hàng</h3>
            <CountUp
              className="text-3xl font-bold text-green-600"
              end={
                isNaN(Number(dashBroad?.countOrder))
                  ? 0
                  : Number(dashBroad?.countOrder)
              }
              duration={1.2}
            />
          </div>
        </Col>

        <Col xs={24} md={8}>
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center">
            <h3 className="text-gray-500 text-sm mb-2">Số lượng Người dùng</h3>
            <CountUp
              className="text-3xl font-bold text-orange-600"
              end={
                isNaN(Number(dashBroad?.countUser))
                  ? 0
                  : Number(dashBroad?.countUser)
              }
              duration={1.2}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default DashBroad;
