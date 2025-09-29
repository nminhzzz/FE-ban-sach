import React from "react";
import { Drawer, Image, Divider, Tag } from "antd";
type TProps = {
  open: boolean;
  onClose: () => void;
  bookInfo?: IBook;
};
const BookDetail: React.FC<TProps> = ({ open, onClose, bookInfo }) => {
  return (
    <>
      <Drawer
        title="Thông tin chi tiết "
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
      >
        {/* Thumbnail */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Image
            src={`${import.meta.env.VITE_BACKEND}/images/book/${
              bookInfo?.thumbnail
            }`}
            alt={bookInfo?.mainText}
            width={200}
            height={300}
            style={{ objectFit: "cover" }}
          />
        </div>

        {(bookInfo?.slider?.length ?? 0) > 0 && (
          <>
            <Divider orientation="left">Ảnh khác</Divider>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {bookInfo!.slider!.map((url, idx) => (
                <Image
                  key={idx}
                  src={`${import.meta.env.VITE_BACKEND}/images/book/${url}`}
                  alt={`slider-${idx}`}
                  width={100}
                  height={150}
                  style={{ objectFit: "cover" }}
                />
              ))}
            </div>
          </>
        )}

        <Divider orientation="left">Thông tin cơ bản</Divider>
        <p>
          <strong>Tác giả:</strong> {bookInfo?.author}
        </p>
        <p>
          <strong>Giá:</strong> {bookInfo?.price.toLocaleString()} VNĐ
        </p>
        <p>
          <strong>Đã bán:</strong> {bookInfo?.sold}
        </p>
        <p>
          <strong>Số lượng tồn:</strong> {bookInfo?.quantity}
        </p>
        <p>
          <strong>Danh mục:</strong>{" "}
          <Tag color="blue">{bookInfo?.category}</Tag>
        </p>
        <p>
          <strong>Ngày tạo:</strong>{" "}
          {bookInfo?.createdAt
            ? new Date(bookInfo.createdAt).toLocaleString()
            : "—"}
        </p>
        <p>
          <strong>Ngày cập nhật:</strong>{" "}
          {bookInfo?.updatedAt
            ? new Date(bookInfo.updatedAt).toLocaleString()
            : "—"}
        </p>
      </Drawer>
    </>
  );
};
export default BookDetail;
