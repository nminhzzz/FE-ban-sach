import React from "react";
import { useCurrentApp } from "@/components/context/app.context";
import TableProduct from "./tableProduct";
import { Empty, Typography } from "antd";

const { Title } = Typography;

const SearchResults: React.FC = () => {
  const { searchTerm, searchResults, isSearching } = useCurrentApp();

  if (!isSearching) {
    return null;
  }

  return (
    <div className="shadow-lg rounded-lg p-4 bg-white">
      <div className="mb-4">
        <Title level={4}>
          Kết quả tìm kiếm cho: "{searchTerm}"
        </Title>
        <p className="text-gray-600">
          Tìm thấy {searchResults.length} sản phẩm
        </p>
      </div>
      
      {searchResults.length > 0 ? (
        <TableProduct
          book={searchResults}
          current={1}
          pageSize={searchResults.length}
          totol={searchResults.length}
          setCurrent={() => {}}
        />
      ) : (
        <Empty
          description="Không tìm thấy sản phẩm nào phù hợp với từ khóa tìm kiếm"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
    </div>
  );
};

export default SearchResults;
