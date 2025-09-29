import { useEffect, useState } from "react";
import { Select, Space, Skeleton } from "antd";
import { GetBookCategory, GetCategory } from "@/services/api";
import { useCurrentApp } from "@/components/context/app.context";
const CategoryProduct = () => {
  const [category, setCategory] = useState<[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const { setCategoryBook } = useCurrentApp();
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const handleChange = async (value: string) => {
    const res = await GetBookCategory(value, current, pageSize);
    console.log(res);
    setCategoryBook(res.data?.result ?? []);
    setCurrent(res.data?.meta.current ?? 1);
    setPageSize(res.data?.meta.pageSize ?? 10);
  };
  const fetchCategory = async () => {
    setLoading(true);
    const res = await GetCategory();
    convertData(res.data);
    setLoading(false);
  };
  const convertData = (arrayCategory: any) => {
    const objectCategory: any = [];

    arrayCategory.map((item: string) => {
      objectCategory.push({
        value: item,
        label: item,
      });
    });
    // setData(objectCategory);
    setCategory(objectCategory);
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <>
      {" "}
      <Space wrap>
        {loading ? (
          <Skeleton.Input active style={{ width: 150 }} />
        ) : (
          <Select
            className="w-[150px]"
            mode="multiple"
            onChange={handleChange}
            placeholder={"chọn category cần tìm"}
            options={category}
          />
        )}
      </Space>
    </>
  );
};
export default CategoryProduct;
