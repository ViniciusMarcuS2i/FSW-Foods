import Image from "next/image";
import { CartContext, CartProduct } from "../_context/cart";
import { calculateProdutTotalPrice, formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseQuantityClick = () => {
    decreaseProductQuantity(cartProduct.id);
  };

  const handleIncreaseQuantityClick = () => {
    increaseProductQuantity(cartProduct.id);
  };

  const removeProductFromCartClick = () => {
    removeProductFromCart(cartProduct.id);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {" "}
        <div className="relative h-20 w-20">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-xs">{cartProduct.name}</h3>
          <div className="flex items-center gap-1">
            {" "}
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                calculateProdutTotalPrice(cartProduct) * cartProduct.quantity,
              )}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </span>
            )}
          </div>
          <div className="flex items-center">
            {" "}
            <div className="flex items-center gap-3 text-center">
              <Button
                disabled={cartProduct.quantity === 1}
                size="icon"
                variant="ghost"
                className="h-7 w-7 border border-solid border-muted-foreground"
              >
                <ChevronLeft onClick={handleDecreaseQuantityClick} size={16} />
              </Button>
              <span className="block w-3 text-xs">{cartProduct.quantity}</span>
              <Button className="h-7 w-7" size="icon">
                <ChevronRight onClick={handleIncreaseQuantityClick} size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 border border-solid border-muted-foreground"
        onClick={removeProductFromCartClick}
      >
        <TrashIcon size={16} />
      </Button>
    </div>
  );
};

export default CartItem;
