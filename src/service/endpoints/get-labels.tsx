import { apiGithub } from "@/service/github.api";
import { GithubLabel } from "@/interfaces/LabelInterface";

export const getLabels = async (): Promise<GithubLabel[]> => {
  const { data } = await apiGithub.get<GithubLabel[]>("/labels");
  console.log(data);
  // Agregar retraso antes de retornar los datos
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return data;
};
