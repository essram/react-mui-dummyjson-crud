import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { updateProduct } from "@/lib/ApiProducts";

type UpdatePayload = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
};

export const useUpdateProduct = (): UseMutationResult<unknown,Error,UpdatePayload> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      id: number;
      title: string;
      description: string;
      price: number;
      category: string;
      stock: number;
    }) => updateProduct(
      data.id,
      data.title,
      data.description,
      data.price,
      data.category,
      data.stock
    ).then((response) => response.data),
    onSuccess: (data: {
      id: number;
      title: string;
      description: string;
      price: number;
      category: string;
      stock: number;
    }) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product-detail", data.id] });
    },
    
  });
};