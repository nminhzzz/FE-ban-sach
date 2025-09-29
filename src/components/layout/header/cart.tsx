import { Badge } from "antd";
import { FaShoppingCart } from "react-icons/fa";
import { useCurrentApp } from "../../context/app.context";
import { Link } from "react-router-dom";

const CartHeader = () => {
  const { carts } = useCurrentApp();
  
  // Tính tổng số lượng sản phẩm trong giỏ hàng
  const cartCount = carts ? carts.reduce((total, item) => total + item.quantityProducts, 0) : 0;
  
  return (
    <Link to="/order" className="cursor-pointer">
      <Badge count={cartCount} showZero>
        <FaShoppingCart className="text-3xl" />
      </Badge>
    </Link>
  );
};
export default CartHeader;
