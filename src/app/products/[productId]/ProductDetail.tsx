// 📄 products/[productId]/ProductDetail.tsx
"use client";

import { useProductsApi } from "@/hooks/useProductsApi";
import Image from "next/image";

export default function ProductDetail({ productId }: { productId: string }) {
  const { ProductById } = useProductsApi();

  const { data: product, isLoading } = ProductById(productId);

  if (isLoading) return <div>Cargando detalles...</div>;

  return (
    <div>
      <h1>{product?.title}</h1>
      <Image
        src={product?.image || ""}
        alt={product?.title || ""}
        width={300}
        height={300}
      />
      <p>{product?.description}</p>
      <p>Precio: ${product?.price}</p>
    </div>
  );
}
