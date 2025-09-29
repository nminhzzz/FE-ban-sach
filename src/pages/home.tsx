import CategoryProduct from "@/components/client/home/categoryProduct";
import ProductList from "@/components/client/home/productList";
import SearchResults from "@/components/client/home/searchResults";
import { useCurrentApp } from "@/components/context/app.context";

const HomePage = () => {
  const { isSearching } = useCurrentApp();

  return (
    <div className="flex justify-between items-start gap-10 p-5">
      <CategoryProduct />
      {isSearching ? <SearchResults /> : <ProductList />}
    </div>
  );
};
export default HomePage;
