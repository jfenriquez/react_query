import { fakeStoreApi } from "@/service/fakeStore.api";
//import { GitgubIssuesInterface } from "@/interfaces/IssueInterface";

export const getProduts = async () => {
  const { data } = await fakeStoreApi.get(`/products`);
  console.log(data);
  // Agregar retraso antes de retornar los datos
  //await new Promise((resolve) => setTimeout(resolve, 2000));
  return data;
};

export const fetchProductById = async (id: string | number) => {
  const { data } = await fakeStoreApi.get(`/products/${id}`);
  console.log(data);
  // Agregar retraso antes de retornar los datos
  //await new Promise((resolve) => setTimeout(resolve, 2000));
  return data;
};

