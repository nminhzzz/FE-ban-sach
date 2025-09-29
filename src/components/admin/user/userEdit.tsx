import { useEffect, useState } from "react";
import { message, Modal } from "antd";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { UpdateUser } from "@/services/api";
interface TProps {
  record: AdminUser;
}
const UserEdit: React.FC<TProps> = ({ record }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm(); // để reset form sau khi submit

  type FieldType = {
    _id: string;
    fullName: string;
    phone: string;
  };
  useEffect(() => {
    if (isModalOpen && record) {
      form.setFieldsValue({
        _id: record._id,
        fullName: record.fullName,
        phone: record.phone,
      });
    }
  }, [record]);
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);
    const res = await UpdateUser(values._id, values.fullName, values.phone);
    console.log(res);
    if (res.statusCode === 200) {
      message.success("update user thành công");
    } else {
      message.error("update user thất bại");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  const showModal = () => {
    form.setFieldsValue({
      _id: record._id,
      fullName: record.fullName,
      phone: record.phone,
    });
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
      <EditOutlined onClick={showModal} />
      <Modal
        title={`edit_user_${record._id}`}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name={`edit_user_${record._id}`}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="_id"
            name="_id"
            rules={[{ required: true, message: "Please input your _id!" }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item<FieldType>
            label="fullName"
            name="fullName"
            rules={[{ required: true, message: "Please input your fullName!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="phone"
            name="phone"
            rules={[{ required: true, message: "Please input your phone!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label={null}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                handleOk();
              }}
            >
              Edit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UserEdit;
