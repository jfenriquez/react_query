"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getIssues } from "@/service/endpoints/get-issues";
//import { State } from "@/interfaces/IssueInterface";

interface Props {
  state: string;
  selectedLabel: string[];
}

export const useIssues = ({ state, selectedLabel }: Props) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [state, selectedLabel]);

  const issuesQuery = useQuery({
    queryKey: ["issues", { state, selectedLabel, page }],
    queryFn: () => getIssues(state, selectedLabel, page),
    staleTime: 1000 * 60 * 60 * 24,
  });

  const prevPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) {
      return;
    }
    setPage(page + 1);
  };

  return { issuesQuery, prevPage, nextPage, page };
};
