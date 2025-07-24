
import { useQuery } from "@tanstack/react-query";
import { getProductByCategory } from "@/lib/ApiProducts";

export const useProductByCategory = (category: string, page: number, limit: number) => {
  return useQuery({
    queryKey: ["products-category", category, page, limit],
    queryFn: () => getProductByCategory(category, page, limit),
    enabled: !!category,
  });
};
