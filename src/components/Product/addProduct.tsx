import { useMutation } from "@tanstack/react-query"; 
import { useState } from "react"; 
import { ProductsInterface } from "@/interfaces/productsInterface"; 
import { useMutationProducts } from "@/hooks/useMutationProducts"; 
import { Controller, SubmitHandler, useForm } from "react-hook-form"; 

interface FormInputs { 
  title: string; 
  price: number; 
  description: string; 
  category: string; 
  image: string; 
}

export default function AddProduct() {
  const { mutation } = useMutationProducts();
  const { control, handleSubmit, watch } = useForm<FormInputs>({
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      category: "women's clothing",
      image: "https://www.lavanguardia.com/andro4all/hero/2023/06/teclados-logitech.jpg?width=1200",
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    mutation.mutate(data);
  };

  const newimage = watch("image");

  return (
    <div className="w-full flex-col">
      <h1 className="text-2xl font-bold mb-6">Nuevo producto</h1>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-around items-center">
          <div className="flex-col w-[500px] space-y-4">
            <Controller
              control={control}
              name="title"
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  className="input input-bordered w-full"
                  type="text"
                  placeholder="Titulo del producto"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="price"
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  className="input input-bordered w-full"
                  type="number"
                  placeholder="Precio del producto"
                  value={field.value?.toString()}
                  onChange={(ev) => field.onChange(+ev.target.value)}
                />
              )}
            />

            <Controller
              control={control}
              name="image"
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  className="input input-bordered w-full"
                  type="url"
                  placeholder="Url del producto"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              rules={{ required: true }}
              render={({ field }) => (
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Descripcion del producto"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="category"
              rules={{ required: true }}
              render={({ field }) => (
                <select
                  className="select select-bordered w-full"
                  value={field.value}
                  onChange={field.onChange}
                >
                  <option value="men's clothing">Men's clothing</option>
                  <option value="women's clothing">Women's clothing</option>
                  <option value="jewelery">Jewelery</option>
                  <option value="electronics">Electronics</option>
                </select>
              )}
            />

            <button
              className="btn btn-primary mt-4"
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "CARGANDO..." : "CREAR"}
            </button>

            {mutation.isError && (
              <p className="text-red-500 text-sm mt-2">{mutation.error.message}</p>
            )}
            {mutation.isSuccess && (
              <p className="text-green-500 text-sm mt-2">Producto creado correctamente</p>
            )}
          </div>

          <div
            className="bg-white rounded-2xl p-10 flex items-center"
            style={{
              width: "500px",
              height: "600px",
            }}
          >
            <img src={newimage} alt="Vista previa del producto" className="w-full h-full object-cover rounded-lg" />
          </div>
        </div>
      </form>
    </div>
  );
}
