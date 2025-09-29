import { useCurrentApp } from "@/components/context/app.context";
import { UpdateInfo, UpLoadImage } from "@/services/api";
import { Button, Input, message, type FormProps, Form } from "antd";
import { useState } from "react";
type FieldType = {
  fullName: string;
  phone: string;
  avatar: string;
  _id: string;
};

type TProps = {
  setIsModalOpen: (v: boolean) => void;
  userUpdate?: IUser | null;
};
const UserInfo: React.FC<TProps> = ({ setIsModalOpen, userUpdate }) => {
  const [file, setFile] = useState<File>();
  const { user, setUser } = useCurrentApp();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (!file) {
      message.error("Bạn chưa chọn file!");
      return;
    }
    const formData = new FormData();
    formData.append("fileImg", file);
    const res = await UpLoadImage(formData, "avatar");
    console.log("upload response", res);
    if (res.statusCode === 201) {
      message.success("upload thành công");
      const uploadedFileName = res.data?.fileUploaded!;

      const resUpDateUser = await UpdateInfo(
        values.fullName,
        values.phone,
        uploadedFileName, // dùng ngay ở đây
        values._id
      );
      if (resUpDateUser.statusCode === 200) {
        const updatedUser: IUser = {
          ...user!, // giữ nguyên các field khác như _id, role...
          fullName: values.fullName,
          phone: values.phone,
          avatar: uploadedFileName,
        };

        setUser(updatedUser); // truyền trực tiếp IUser
        message.success("Cập nhật thông tin thành công!");
        setIsModalOpen(false);
        localStorage.removeItem("access_token");
      } else {
        message.error("Update thất bại!");
      }
    } else {
      message.error("upload thất bại");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  const handleChooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setFile(e.target.files[0]);
  };
  return (
    <div className=" items-center justify-center ">
      <div
        className="w-[200px] 
"
      >
        <img
          src={`${import.meta.env.VITE_BACKEND}/images/avatar/${
            userUpdate?.avatar
          }`}
          alt=""
        />
      </div>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{
          _id: userUpdate?.id,
          fullName: userUpdate?.fullName,
          phone: userUpdate?.phone,
          avatar: userUpdate?.avatar,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="_id"
          name="_id"
          rules={[{ required: true, message: "Please input your phone!" }]}
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

        <input type="file" onChange={handleChooseFile} />

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            UPDATE
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default UserInfo;
