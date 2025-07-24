import { useQuery } from "@tanstack/react-query";
import { getProductDetail } from "@/lib/ApiProducts";

export const useProductDetail = (id: number) => {
    return useQuery({
        queryKey: ["product-detail", id],
        queryFn: () => getProductDetail(id),
        enabled: !!id // kalau ga ada ID nya, ga bakal jalan
    });
}