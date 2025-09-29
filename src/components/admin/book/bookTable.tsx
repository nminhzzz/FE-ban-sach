import { message, Space, Table, type TableProps } from "antd";
import BookCreate from "./bookCreate";
import BookEdit from "./bookEdit";
import { DeleteOutlined } from "@ant-design/icons";
import { DeleteBook } from "@/services/api";
import BookExport from "./bookexport";
import BookSearch from "./bookSearch";
import { useEffect, useState } from "react";
import BookDetail from "./bookDetail";

type TProps = {
  book?: IBook[];
  current: number;
  pageSize: number;
  totol?: number;
  setCurrent: (v: number) => void;
  setPageSize: (v: number) => void;
  fetchBook: () => void;
};
const BookTable: React.FC<TProps> = ({
  book,
  current,
  pageSize,
  totol,
  setCurrent,
  setPageSize,
  fetchBook,
}) => {
  const [bookTable, setBookTable] = useState<IBook[]>([]);

  const [open, setOpen] = useState(false);
  const [bookInfo, setBookInfo] = useState<IBook>();

  const showDrawer = (record: IBook) => {
    setBookInfo(record);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setBookTable(book || []);
  }, [book]);
  const columns: TableProps<IBook>["columns"] = [
    {
      title: "_id",
      dataIndex: "_id",
      key: "_id",
      render: (_, record) => (
        <a onClick={() => showDrawer(record)}>{record._id}</a>
      ),
    },
    {
      title: "mainText",
      dataIndex: "mainText",
      key: "mainText",
    },
    {
      title: "author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <BookEdit oldBook={record} fetchBook={fetchBook} />
          <DeleteOutlined onClick={() => handleClickDelete(record._id)} />
        </Space>
      ),
    },
  ];
  const handleClickDelete = async (_id: String) => {
    const res = await DeleteBook(_id);
    if (res.statusCode === 200) {
      message.success("đã xoá sách");
      fetchBook();
    } else {
      message.error("xoá sách thất bại");
    }
  };

  return (
    <>
      <BookDetail open={open} onClose={onClose} bookInfo={bookInfo} />
      <div>
        <BookSearch
          totol={totol}
          current={current}
          setBookTable={setBookTable}
          book={book}
        />
      </div>
      <div className="flex justify-between">
        <h1>Table Book</h1>
        <div className="flex gap-5">
          <BookExport book={book} />
          <BookCreate fetchBook={fetchBook} />
        </div>
      </div>
      <Table<IBook>
        rowKey={"_id"}
        columns={columns}
        dataSource={bookTable}
        pagination={{
          current,
          pageSize,
          total: totol,
          onChange: (page, size) => {
            setCurrent(page);
            setPageSize(size);
          },
        }}
      />
    </>
  );
};
export default BookTable;
