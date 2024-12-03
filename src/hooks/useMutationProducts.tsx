import { useMutation, useQueryClient } from "@tanstack/react-query";
//import { createProduct, ProductLike } from "../services/actions";
import { ProductsInterface } from "@/interfaces/productsInterface";
import axios from "axios";

// Asegúrate de definir generateId si es necesario
const generateId = () => Math.floor(Math.random() * 1000000);

const addProduct = async (product: ProductsInterface) => {
  // Agregar retraso antes de retornar los datos
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const { data } = await axios.post(
    "https://deluxe-pear-keeper.glitch.me/products",
    product
  );
  return data;
};
export const useMutationProducts = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addProduct,

    // Almacena el producto de forma optimista en la caché antes de la mutación
    onMutate: async (data: ProductsInterface) => {
      const optimisticProduct = { id: generateId(), ...data };
      
      // Usar el `category` directamente desde los datos recibidos
      queryClient.setQueryData<ProductsInterface[]>(
        ["productos",],
        (old = []) => [...old, optimisticProduct]
      );

      // Retornar el producto optimista para referencia posterior
      return { optimisticProduct };
    },

    // Manejo de error para revertir el cambio si falla
    onError: (error, variables, context) => {
      queryClient.setQueryData<ProductsInterface[]>(
        ["productos", variables.category],
        (old) =>
          old?.filter(
            (product) => product.id !== context?.optimisticProduct.id
          ) || []
      );
      console.log("Product creation failed");
    },

    // Confirmar el producto en caché tras éxito
    onSuccess: (data, variables, context) => {
      const productData: ProductsInterface = {
        ...data,
        id: data.id || context?.optimisticProduct.id,
      };

      queryClient.setQueryData<ProductsInterface[]>(
        ["productos", variables.category],
        (old) =>
          old?.map((product) =>
            product.id === context?.optimisticProduct.id ? productData : product
          ) || []
      );
    },

    // Evitar refetch automático
    // Manejo de cancelación para revertir el cambio si se cancela
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["productos"] });
    },
  });

  return {
    mutation,
  };
};
