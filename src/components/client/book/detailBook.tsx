import React, { useState } from "react";
import { Rate, Button, InputNumber, message, notification } from "antd";
import { useCurrentApp } from "@/components/context/app.context";
import { useNavigate } from "react-router-dom";

type TProps = {
  bookChoose?: IBook;
};

const DetailBook: React.FC<TProps> = ({ bookChoose }) => {
  const [quantityProduct, setQuantityProduct] = useState(1);
  const { user, setCarts } = useCurrentApp();
  const navigator = useNavigate();

  const handleClickAddCart = (
    id: string,
    detail: IBook,
    quantity: number // đổi tên cho rõ
  ) => {
    if (!user) {
      message.error("Bạn cần đăng nhập để thực hiện tính năng này.");
      return;
    }

    // kiểm tra tồn kho
    if (quantity > detail.quantity) {
      notification.warning({ message: "Số lượng sản phẩm vượt quá tồn kho!" });
      return;
    }

    // lấy carts từ localStorage
    const cartStorage = localStorage.getItem("carts");
    let carts: ICarts[] = cartStorage ? JSON.parse(cartStorage) : [];

    // tìm sản phẩm có sẵn trong giỏ
    const existingProductIndex = carts.findIndex((item) => item.id === id);

    if (existingProductIndex !== -1) {
      const newQuantity =
        carts[existingProductIndex].quantityProducts + quantity;

      if (newQuantity > detail.quantity) {
        notification.warning({
          message: "Số lượng sản phẩm vượt quá tồn kho!",
        });
        return;
      }

      carts[existingProductIndex].quantityProducts = newQuantity;
    } else {
      carts.push({ id, quantityProducts: quantity, detail }); // chuẩn
    }

    localStorage.setItem("carts", JSON.stringify(carts));
    setCarts(carts);

    message.success("Thêm sản phẩm vào giỏ hàng thành công.");
  };

  return (
    <div className="max-w-6xl mx-auto p-5 bg-white">
      {/* Breadcrumb */}
      <div className="text-gray-500 text-sm mb-4">
        <span>Trang Chủ &gt; </span>
        <span className="font-semibold">Xem chi tiết sách</span>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Left: Book Images */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="w-80 h-[28rem] border p-2">
            <img
              src={`${import.meta.env.VITE_BACKEND}/images/book/${
                bookChoose?.thumbnail
              }`}
              alt={bookChoose?.mainText}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex gap-2">
            {bookChoose?.slider.map((img, idx) => (
              <div key={idx} className="w-16 h-20 border p-1">
                <img
                  src={`${import.meta.env.VITE_BACKEND}/images/book/${img}`}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Book Info */}
        <div className="flex-1 flex flex-col gap-3">
          {/* Tác giả + Tên sách */}
          <h2 className="text-xl font-semibold">{bookChoose?.mainText}</h2>
          <p className="text-sm">
            Tác giả:{" "}
            <span className="text-blue-600 underline cursor-pointer">
              {bookChoose?.author}
            </span>
          </p>

          {/* Rate */}
          <div className="flex items-center gap-2">
            <Rate disabled defaultValue={5} className="text-yellow-500" />
            <span className="text-sm text-gray-500">11 đánh giá</span>
          </div>

          {/* Giá */}
          <div className="text-3xl text-red-500 font-bold">
            {bookChoose?.price.toLocaleString("vi-VN")} ₫
          </div>

          {/* Vận chuyển */}
          <div className="text-gray-600 text-sm">
            Vận Chuyển: Miễn phí vận chuyển
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-3">
            <span className="text-sm">Số lượng</span>
            <InputNumber
              min={1}
              value={quantityProduct}
              onChange={(e) => {
                setQuantityProduct(e!);
              }}
              className="w-20"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <Button
              type="default"
              className="flex-1 h-12 border-red-500 text-red-500 hover:bg-red-50"
              onClick={() =>
                handleClickAddCart(
                  bookChoose?._id!,
                  bookChoose!,
                  quantityProduct
                )
              }
            >
              Thêm vào giỏ hàng
            </Button>
            <Button
              type="primary"
              className="flex-1 h-12 bg-red-500 border-red-500 hover:bg-red-600"
              onClick={() => navigator("/order")}
            >
              Mua ngay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBook;
