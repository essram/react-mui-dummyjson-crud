import { useMutation } from "@tanstack/react-query";
import { getProductById } from "@/lib/ApiProducts";

export const useGetProductById = () => {
    return useMutation({
        mutationFn: (id: number) => getProductById(id),
    });
};