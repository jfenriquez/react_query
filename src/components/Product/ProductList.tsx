"use client";
import { useProductsApi } from "@/hooks/useProductsApi";
import { QueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
import { FiShoppingCart, FiHeart, FiRefreshCw, FiFilter } from "react-icons/fi";

interface Product {
  id: number|string;
  title: string;
  price: number;
  image: string;
  category?: string;
  rating?: {
    rate: number;
    count: number;
  };
}
interface ProductQueryProps {
  data?: Product[]; // o un tipo más específico como `Product[]`
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  refetch: () => void;
}

export const ProductList = ({
  productQuery,
}: {
  productQuery: ProductQueryProps;
}) => {
  const [filter, setFilter] = useState<string | null>(null);

  // Filter products by category
  const filteredProducts = filter
    ? productQuery.data?.filter(
        (product: Product) => product.category === filter
      )
    : productQuery.data || [];

  const { prefetchProduct } = useProductsApi();

  const uniqueCategories = Array.from(
    new Set(productQuery?.data?.map((p: Product) => p.category))
  );
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold text-primary flex items-center">
          <FiShoppingCart className="mr-3" />
          Product Catalog
        </h1>

        <div className="flex space-x-4">
          {/* Category Filter Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-outline btn-primary"
            >
              <FiFilter className="mr-2" />
              Filter
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li onClick={() => setFilter(null)}>
                <a>All Products</a>
              </li>
              {productQuery.data &&
                Array.from(
                  new Set(
                    productQuery.data
                      .map((p: Product) => p.category)
                      .filter((category): category is string =>
                        Boolean(category)
                      ) // Filtra y asegura que solo queden strings
                  )
                ).map((category) => (
                  <li key={category} onClick={() => setFilter(category)}>
                    <a>{category}</a>
                  </li>
                ))}
            </ul>
          </div>

          {/* Refresh Button */}
          <button
            className={`btn ${
              productQuery.isFetching ? "btn-disabled" : "btn-primary"
            }`}
            onClick={() => productQuery.refetch()}
          >
            <FiRefreshCw className="mr-2" />
            {productQuery.isFetching ? "Updating..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts?.map((product: Product) => (
          <div
            onMouseEnter={() => prefetchProduct(product.id)}
            key={product.id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-base-200"
          >
            <Link href={`/products/${product.id}`}>
              <h2>{product.title}</h2>
              <p>${product.price}</p>
            </Link>
            {/* Product Image */}
            <figure className="relative pt-4 px-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain rounded-xl transition-transform duration-300 hover:scale-105"
              />
              {/* Wishlist Button */}
              <button className="absolute top-6 right-6 btn btn-circle btn-sm btn-ghost">
                <FiHeart className="text-primary" />
              </button>
            </figure>

            {/* Product Details */}
            <div className="card-body">
              <h2 className="card-title text-lg font-bold truncate">
                {product.title}
              </h2>

              {/* Category Tag */}
              {product.category && (
                <div className="badge badge-secondary mb-2">
                  {product.category}
                </div>
              )}

              {/* Price and Rating */}
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-primary">
                  $
                  {isNaN(Number(product.price))
                    ? "Precio no disponible"
                    : Number(product.price).toFixed(2)}
                </span>

                {product.rating && (
                  <div className="flex items-center">
                    <span className="text-warning mr-1">★</span>
                    <span className="text-sm">
                      {product.rating.rate} ({product.rating.count})
                    </span>
                  </div>
                )}
              </div>

              {/* Add to Cart Button */}
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-primary btn-block">
                  <FiShoppingCart className="mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-2xl text-base-content/50">No products found</p>
        </div>
      )}
    </div>
  );
};
