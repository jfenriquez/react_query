"use client";
import AddProduct from "@/components/Product/addProduct";
import { ProductList } from "@/components/Product/ProductList";
import { useProductsApi } from "@/hooks/useProductsApi";

import React from "react";

const Home = () => {
  const { productQuery } = useProductsApi();

  // Manejo de estado de carga
  if (productQuery.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <div className="loading loading-spinner text-primary w-12 h-12"></div>
      </div>
    );
  }

  // Manejo de errores
  if (productQuery.isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <div className="alert alert-error shadow-lg max-w-md">
          <div>
            <span>Error al cargar los productos. Inténtalo de nuevo.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <ProductList productQuery={productQuery} />
      <AddProduct />
    </>
  );
};

export default Home;
