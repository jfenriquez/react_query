import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchProductById,
  getProduts,
} from "@/service/endpoints/get-fakeStore";

export const useProductsApi = () => {
  const queryClient = useQueryClient();

  // Consulta principal para productos
  const productQuery = useQuery({
    queryKey: ["productos"],
    queryFn: () => getProduts(),
    staleTime: 1000 * 60 * 60 * 24,
  });

  // Función para prefetch de productos
  const prefetchProduct = async (productId: string | number) => {
    await queryClient.prefetchQuery({
      queryKey: ["productos", productId.toString()],
      queryFn: () => fetchProductById(productId),
    });
  };

  const ProductById = (productId: string) => {
    return useQuery({
      queryKey: ["productos", productId],
      queryFn: () => fetchProductById(productId),
    });
  };

  return { productQuery, prefetchProduct, ProductById };
};
