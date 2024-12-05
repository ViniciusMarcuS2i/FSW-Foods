import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface ButtonQuantityProps {
  quantity: number;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
}

const ButtonQuantity = ({
  quantity,
  onDecreaseQuantity,
  onIncreaseQuantity,
}: ButtonQuantityProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        size={"icon"}
        variant={"ghost"}
        className="h-8 w-8 border border-muted-foreground"
        onClick={onDecreaseQuantity}
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
      <span className="w-4 text-center text-sm">{quantity}</span>
      <Button size={"icon"} onClick={onIncreaseQuantity} className="h-8 w-8">
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ButtonQuantity;
