import { useEffect, useState } from "react";
import { GetBook } from "@/services/api";
import BookTable from "@/components/admin/book/bookTable";

const BookAdmin = () => {
  const [book, setBook] = useState<IBook[]>();
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totol, setTotol] = useState<number>();

  const fetchBook = async () => {
    const res = await GetBook(current, pageSize);
    setBook(res.data?.result);
    setTotol(res.data?.meta.total);
  };
  useEffect(() => {
    fetchBook();
  }, [current, pageSize]);

  return (
    <>
      <BookTable
        book={book}
        current={current}
        pageSize={pageSize}
        totol={totol}
        setCurrent={setCurrent}
        setPageSize={setPageSize}
        fetchBook={fetchBook}
      />
    </>
  );
};
export default BookAdmin;
