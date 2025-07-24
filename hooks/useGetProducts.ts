import { useQuery } from "@tanstack/react-query";
import { getAllProducts, getProductByCategory } from "@/lib/ApiProducts";

export const useProducts = (page: number, limit: number, category: string) => {
  return useQuery({
    queryKey: ["products", page, limit, category],
    queryFn: () => {
      if (category && category !== "all") {
        return getProductByCategory(category, page, limit);
      }
      return getAllProducts(page, limit);
    },
    keepPreviousData: true,
  });
};
