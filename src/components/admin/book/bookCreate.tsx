import React, { useState } from "react";
import { Modal, Button, Form, Input, Select, message, InputNumber } from "antd";
import type { FormProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Upload } from "antd";
import { CreateBook, UpLoadImage } from "@/services/api";

const { Option } = Select;
type TProps = {
  fetchBook: () => void;
};
const BookCreate: React.FC<TProps> = ({ fetchBook }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [thumbnail, setThumbnail] = useState<string>("");
  const [sliders, setSliders] = useState<string[]>([]);

  const props: UploadProps = {
    listType: "picture",
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        const formData = new FormData();
        formData.append("fileImg", file as Blob);

        // gọi API upload
        const res = await UpLoadImage(formData, "book");

        // Nếu API trả về link ảnh, ví dụ res.data.url
        console.log("Upload result:", res);
        if (res.statusCode === 201) {
          message.success("upload thành công");
          setThumbnail(res.data?.fileUploaded!);
        } else {
          message.error("upload thất bại");
        }
        // báo cho Ant Design Upload biết upload thành công
        // data bạn truyền vào onSuccess sẽ được lưu trong file.response
        onSuccess?.(res, file as any);
      } catch (err) {
        console.error("Upload failed", err);
        onError?.(err as Error);
      }
    },
  };
  const slider: UploadProps = {
    listType: "picture",
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        const formData = new FormData();
        formData.append("fileImg", file as Blob);

        // gọi API upload
        const res = await UpLoadImage(formData, "book");

        // Nếu API trả về link ảnh, ví dụ res.data.url
        console.log("Upload result:", res);
        if (res.statusCode === 201) {
          message.success("upload thành công");
          setSliders((prev) => [...prev, res.data?.fileUploaded as string]);
        } else {
          message.error("upload thất bại");
        }
        // báo cho Ant Design Upload biết upload thành công
        // data bạn truyền vào onSuccess sẽ được lưu trong file.response
        onSuccess?.(res, file as any);
      } catch (err) {
        console.error("Upload failed", err);
        onError?.(err as Error);
      }
    },
  };

  const onFinish: FormProps<IBook>["onFinish"] = async (values) => {
    console.log("Success:", values);
    const res = await CreateBook(
      thumbnail,
      sliders,
      values.mainText,
      values.author,
      Number(values.price),
      Number(values.quantity),
      values.category
    );
    if (res.statusCode === 201) {
      message.success("thêm sách thành công");
      fetchBook();
      setIsModalOpen(false);
    } else {
      message.error("thêm sách thất bại");
    }
  };

  const onFinishFailed: FormProps<IBook>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Book
      </Button>
      <Modal
        title=" Add Book"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form<IBook>
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<IBook>
            label="mainText"
            name="mainText"
            rules={[{ required: true, message: "Please input your mainText!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<IBook>
            label="author"
            name="author"
            rules={[{ required: true, message: "Please input your author!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<IBook>
            label="price"
            name="price"
            rules={[{ required: true, message: "Please input your price!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item<IBook>
            label="quantity"
            name="quantity"
            rules={[{ required: true, message: "Please input your quantity!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item<IBook>
            label="category"
            name="category"
            rules={[
              { required: true, message: "Please select your category!" },
            ]}
          >
            <Select placeholder="Select category">
              <Option value="Arts">Arts</Option>
              <Option value="Business">Business</Option>
              <Option value="Comics">Comics</Option>
              <Option value="Cooking">Cooking</Option>
              <Option value="Entertainment">Entertainment</Option>
              <Option value="History">History</Option>
              <Option value="Music">Music</Option>
              <Option value="Sports">Sports</Option>
              <Option value="Teen">Teen</Option>
              <Option value="Travel">Travel</Option>
            </Select>
          </Form.Item>
          <div className="flex gap-4">
            {/* Thumbnail */}
            <div className="flex flex-col w-1/2">
              <Upload {...props} className="w-full">
                <h2>thumbnail</h2>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </div>

            {/* Slider */}
            <div className="flex flex-col w-1/2">
              <Upload {...slider} className="w-full">
                <p>slider</p>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </div>
          </div>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              ADD
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default BookCreate;
