import { BikeIcon, TimerIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Restaurant } from "@prisma/client";
import { formatCurrency } from "../_helpers/price";

interface DeliveryInfoProps {
  restaurant: Pick<Restaurant, "deliveryFee" | `deliveryTimeMinutes`>;
}

const DeliveryInfo = ({ restaurant }: DeliveryInfoProps) => {
  return (
    <Card className="mt-6 flex justify-around py-3">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 text-muted-foreground">
          <span className="text-xs">Entrega</span>
          <BikeIcon size={12} />
        </div>

        <span className="text-xs font-semibold">
          {Number(restaurant.deliveryFee) > 0
            ? formatCurrency(Number(restaurant.deliveryFee))
            : "Grátis"}
        </span>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 text-muted-foreground">
          <span className="text-xs">Entrega</span>
          <TimerIcon size={12} />
        </div>
        <span className="text-xs font-semibold">
          {restaurant.deliveryTimeMinutes} min
        </span>
      </div>
    </Card>
  );
};

export default DeliveryInfo;
