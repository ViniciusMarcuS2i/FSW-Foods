import { toast } from "sonner";
import { toggleFavoriteRestaurant } from "../_actions/restaurant";
import { UserFavoriteResttaurant } from "@prisma/client";
import { useRouter } from "next/navigation";

interface UseToggleFavoriteRestaurantProps {
  userId?: string;
  restaurantId: string;
  userFavoriteRestaurants?: UserFavoriteResttaurant[];
  restaurantIsFavorited?: boolean;
}

const UseToggleFavoriteRestaurant = ({
  restaurantId,
  userId,
  restaurantIsFavorited,
}: UseToggleFavoriteRestaurantProps) => {
  const router = useRouter();

  const handleFavoriteClick = async () => {
    if (!userId) return;
    try {
      await toggleFavoriteRestaurant(userId, restaurantId);
      toast.success(
        restaurantIsFavorited
          ? "Removido dos favoritos"
          : "Adicionado aos favoritos",
        {
          action: {
            label: "Ver favoritos",
            onClick: () => {
              router.push("/my-favorites-restaurants");
            },
          },
        },
      );
    } catch (e) {
      toast.error("Não foi possível favoritar o restaurante");
    }
  };
  return { handleFavoriteClick };
};

export default UseToggleFavoriteRestaurant;
