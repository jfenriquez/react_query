// 📄 products/[productId]/page.tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ProductDetail from "./ProductDetail";
import { useProductsApi } from "@/hooks/useProductsApi";
import {
  getProduts,
  fetchProductById,
} from "@/service/endpoints/get-fakeStore";
import { ProductsInterface } from "@/interfaces/productsInterface";

export async function generateStaticParams() {
  const products = await getProduts();
  return products.map((product: { id: number | string }) => ({
    productId: product?.id?.toString(),
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: { productId: string };
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["productos", params.productId],
    queryFn: () => fetchProductById(params.productId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetail productId={params.productId} />
    </HydrationBoundary>
  );
}
