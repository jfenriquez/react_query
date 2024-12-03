import { apiGithub } from "@/service/github.api";
import { GitgubIssuesInterface } from "@/interfaces/IssueInterface";

export const getIssue = async (
  issueNumber: number
): Promise<GitgubIssuesInterface> => {
  const { data } = await apiGithub.get<GitgubIssuesInterface>(
    `/issues/${issueNumber}`
  );
  console.log(data);
  // Agregar retraso antes de retornar los datos
  //await new Promise((resolve) => setTimeout(resolve, 2000));
  return data;
};

export const getIssueComments = async (
  issueNumber: number
): Promise<GitgubIssuesInterface[]> => {
  const { data } = await apiGithub.get<GitgubIssuesInterface[]>(
    `/issues/${issueNumber}/comments`
  );
  console.log(data);
  // Agregar retraso antes de retornar los datos
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return data;
};
