import { GetReducePriceBook } from "@/services/api";
import { useEffect, useState } from "react";
import TableProduct from "./tableProduct";

const ReducePriceProduct = () => {
  const [book, setBook] = useState<IBook[]>();
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totol, setTotol] = useState<number>();

  const fetchBook = async () => {
    const res = await GetReducePriceBook(current, pageSize);
    setBook(res.data?.result);
    setTotol(res.data?.meta.total);
  };
  useEffect(() => {
    fetchBook();
  }, [current, pageSize]);
  return (
    <>
      <TableProduct
        book={book}
        current={current}
        pageSize={pageSize}
        totol={totol}
        setCurrent={setCurrent}
        setPageSize={setPageSize}
      />
    </>
  );
};
export default ReducePriceProduct;
