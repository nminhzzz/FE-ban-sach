import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { GetBookSearch } from "@/services/api";

type FieldType = {
  mainText?: string;
  author?: string;
};
type TProps = {
  totol?: number;
  current: number;
  setBookTable: (v: IBook[]) => void;
  book?: IBook[];
};
const BookSearch: React.FC<TProps> = ({ totol, setBookTable, book }) => {
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);
    let URL_API = `/api/v1/book?current=1&pageSize=${totol}`;
    if (values.mainText) {
      URL_API += `&mainText=${values.mainText}`;
    }
    if (values.author) {
      URL_API += `&author=${values.author}`;
    }
    const res = await GetBookSearch(URL_API);
    if (res && res.data) {
      console.log("Data search: ", res.data.result);
      setBookTable(res.data.result); // cập nhật bảng ngay
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  const handleClickReset = () => {
    setBookTable(book!);
  };
  return (
    <>
      {" "}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="flex gap-20"
      >
        <Form.Item<FieldType> label="mainText" name="mainText">
          <Input />
        </Form.Item>

        <Form.Item<FieldType> label="author" name="author">
          <Input />
        </Form.Item>

        <Form.Item label={null}>
          <Button
            type="primary"
            htmlType="reset"
            onClick={() => handleClickReset()}
          >
            reset
          </Button>
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default BookSearch;
