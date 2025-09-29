import DetailBook from "@/components/client/book/detailBook";
import { GetBookId } from "@/services/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookPage = () => {
  const [bookChoose, setBookChoose] = useState<IBook>();
  const { id } = useParams();

  const fetchBookChoose = async () => {
    if (id) {
      const res = await GetBookId(id);
      setBookChoose(res.data);
    }
  };
  useEffect(() => {
    fetchBookChoose();
  }, [id]);
  return (
    <>
      <DetailBook bookChoose={bookChoose} />
    </>
  );
};
export default BookPage;
