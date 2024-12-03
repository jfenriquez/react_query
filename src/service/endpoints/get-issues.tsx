import { apiGithub } from "@/service/github.api";
import { GitgubIssuesInterface } from "@/interfaces/IssueInterface";

export const getIssues = async (
  state: string,
  selectedLabel: string[],
  page: number
): Promise<GitgubIssuesInterface[]> => {
  const params = new URLSearchParams();

  if (selectedLabel.length > 0) {
    params.append("labels", selectedLabel.join(","));
  }

  if (state !== "all") params.append("state", state);

  params.append("page", `${page}`);
  params.append("per_page", "5");

  const { data } = await apiGithub.get<GitgubIssuesInterface[]>("/issues", {
    params,
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(data, "ssssssssssssssssss");
  return data;
};

export const fetchtIssues = async (): Promise<GitgubIssuesInterface[]> => {
  const { data } = await apiGithub.get<GitgubIssuesInterface[]>("/issues");

  return data;
};
