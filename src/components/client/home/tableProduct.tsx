import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
type TProps = {
  book?: IBook[];
  current: number;
  pageSize: number;
  totol?: number;
  setCurrent: (v: number) => void;
  setPageSize: (v: number) => void;
};

const TableProduct: React.FC<TProps> = ({
  book,
  current,
  pageSize,
  totol,
  setCurrent,
  setPageSize,
}) => {
  // tính số trang
  const totalPage = totol ? Math.ceil(totol / pageSize) : 1;
  const navigator = useNavigate();

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPage) return;
    setCurrent(page);
  };

  return (
    <>
      <div className="p-4">
        {/* Grid responsive 5 cột trên desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {book?.map((p) => (
            <div
              onClick={() => navigator(`/book/${p._id}`)}
              key={p._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={`${import.meta.env.VITE_BACKEND}/images/book/${
                  p.thumbnail
                }`}
                alt={p.mainText}
                className="w-full h-56 object-cover"
              />
              <div className="p-3">
                <h3 className="text-sm font-medium line-clamp-2 min-h-[2.5rem]">
                  {p.mainText}
                </h3>
                <p className="text-red-600 font-semibold text-sm">
                  {p.price.toLocaleString("vi-VN")} đ
                </p>
                <div className="flex items-center gap-1 text-yellow-500 text-xs mt-1">
                  <span className="text-gray-500">Đã bán {p.sold}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPage > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              onClick={() => handlePageChange(current - 1)}
              disabled={current === 1}
            >
              «
            </button>
            {Array.from({ length: totalPage }).map((_, idx) => {
              const page = idx + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded ${
                    current === page
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              onClick={() => handlePageChange(current + 1)}
              disabled={current === totalPage}
            >
              »
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default TableProduct;
