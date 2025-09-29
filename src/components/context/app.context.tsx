import { createContext, useContext, useState, useEffect } from "react";

interface Product {
  Authentic: boolean;
  user: IUser | null;
  setAuthentic: (v: boolean) => void;
  setUser: (v: IUser | null) => void;
  categoryBook: IBook[];
  setCategoryBook: (v: IBook[]) => void;
  carts: ICarts[] | null;
  setCarts: (v: ICarts[] | null) => void;
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  searchResults: IBook[];
  setSearchResults: (v: IBook[]) => void;
  isSearching: boolean;
  setIsSearching: (v: boolean) => void;
}
type TProps = {
  children: React.ReactNode;
};
const AppContext = createContext<Product | null>(null);

export const AppProvider = (props: TProps) => {
  const [Authentic, setAuthentic] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [categoryBook, setCategoryBook] = useState<IBook[]>([]);
  const [carts, setCarts] = useState<ICarts[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<IBook[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Đồng bộ carts từ localStorage khi app khởi động
  useEffect(() => {
    const cartStorage = localStorage.getItem("carts");
    if (cartStorage) {
      try {
        const parsedCarts = JSON.parse(cartStorage);
        setCarts(parsedCarts);
      } catch (error) {
        console.error("Lỗi khi parse carts từ localStorage:", error);
        localStorage.removeItem("carts");
        setCarts(null);
      }
    }
  }, []);
  return (
    <>
      <AppContext.Provider
        value={{
          Authentic,
          user,
          setAuthentic,
          setUser,
          categoryBook,
          setCategoryBook,
          carts,
          setCarts,
          searchTerm,
          setSearchTerm,
          searchResults,
          setSearchResults,
          isSearching,
          setIsSearching,
        }}
      >
        {props.children}
      </AppContext.Provider>
    </>
  );
};
export const useCurrentApp = () => {
  const currentAppContext = useContext(AppContext);

  if (!currentAppContext) {
    throw new Error(
      "useCurrentApp has to be used within <CurrentAppContext.Provider>"
    );
  }

  return currentAppContext;
};
