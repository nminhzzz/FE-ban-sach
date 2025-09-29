import { GetNewBook } from "@/services/api";
import { useEffect, useState } from "react";
import TableProduct from "./tableProduct";

const NewProduct = () => {
  const [book, setBook] = useState<IBook[]>();
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totol, setTotol] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBook = async () => {
    setLoading(true);
    const res = await GetNewBook(current, pageSize);
    setBook(res.data?.result);
    setTotol(res.data?.meta.total);
    setLoading(false);
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
        loading={loading}
      />
    </>
  );
};
export default NewProduct;
