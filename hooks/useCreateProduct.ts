import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { createProduct } from "@/lib/ApiProducts";

type CreatePayload = {
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      title: string;
      description: string;
      price: number;
      category: string;
      stock: number;
      image: string;
    }) =>
      createProduct(
        data.title,
        data.description,
        data.price,
        data.category,
        data.stock,
        data.image
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["products"] }),
  });
};
