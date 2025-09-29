import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useCurrentApp } from "@/components/context/app.context";
import { GetBookSearch } from "@/services/api";
import { useRef } from "react";

const SearchHeader = () => {
  const { 
    searchTerm, 
    setSearchTerm, 
    setSearchResults, 
    setIsSearching,
    setCategoryBook 
  } = useCurrentApp();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = async (value: string) => {
    if (!value.trim()) {
      // Nếu search term rỗng, hiển thị lại sách phổ biến
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setSearchTerm(value);

    try {
      // Gọi API tìm kiếm
      const searchUrl = `/api/v1/book?current=1&pageSize=50&mainText=/${value}/i`;
      const res = await GetBookSearch(searchUrl);
      
      if (res.data?.result) {
        setSearchResults(res.data.result);
        setCategoryBook(res.data.result); // Cập nhật để hiển thị kết quả tìm kiếm
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Lỗi khi tìm kiếm:", error);
      setSearchResults([]);
    } finally {
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Debounce search - tìm kiếm sau 500ms khi user ngừng gõ
    timeoutRef.current = setTimeout(() => {
      handleSearch(value);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(searchTerm);
    }
  };

  return (
    <div className="h-full w-1/2">
      <Input
        placeholder="Hôm nay bạn muốn tìm gì"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        prefix={<SearchOutlined />}
        allowClear
        onClear={() => {
          setSearchTerm("");
          setIsSearching(false);
          setSearchResults([]);
        }}
      />
    </div>
  );
};
export default SearchHeader;
