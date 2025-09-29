import { Tabs } from "antd";
import type { TabsProps } from "antd";
import PopularProduct from "./popularProduct";
import NewProduct from "./newProduct";
import IncreasePriceProduct from "./increasePriceProduct";
import ReducePriceProduct from "./reducePriceProduct";
const ProductList = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Phổ Biến",
      children: <PopularProduct />,
    },
    {
      key: "2",
      label: "Hàng mới nhất",
      children: <NewProduct />,
    },
    {
      key: "3",
      label: "Giá thấp đến cao ",
      children: <IncreasePriceProduct />,
    },
    {
      key: "4",
      label: "Giá cao đến thấp ",
      children: <ReducePriceProduct />,
    },
  ];
  return (
    <>
      <div className="shadow-lg rounded-lg p-4 bg-white">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </>
  );
};
export default ProductList;
