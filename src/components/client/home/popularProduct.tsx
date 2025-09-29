import { useEffect, useState } from "react";
import TableProduct from "./tableProduct";
import { GetBook } from "@/services/api";
import { useCurrentApp } from "@/components/context/app.context";

const PopularProduct: React.FC = () => {
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totol, setTotol] = useState<number>();
  const { categoryBook, setCategoryBook } = useCurrentApp();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBook = async () => {
    setLoading(true);
    const res = await GetBook(current, pageSize);
    setTotol(res.data?.meta.total);
    // luôn đồng bộ dữ liệu hiển thị với context
    setCategoryBook(res.data?.result ?? []);
    setLoading(false);
  };
  useEffect(() => {
    fetchBook();
  }, [current, pageSize]);
  return (
    <>
      <TableProduct
        book={categoryBook}
        current={current}
        pageSize={pageSize}
        totol={totol}
        setCurrent={setCurrent}
        setPageSize={setPageSize}
        loading={loading}
      />
    </>
  );
};
export default PopularProduct;
