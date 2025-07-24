import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/ApiProducts";

const fetchCategories = async () => {
  const res = await getCategories();
  return res.data;
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
};
