"use client";
import { FiInfo, FiMessageSquare, FiCheckCircle } from "react-icons/fi";
import { GitgubIssuesInterface } from "@/interfaces/IssueInterface";
//import { getIssue, getIssueComments } from "@/service/endpoints/get-issue";
import { timeSince } from "@/helpers/time-since";

import { useQueryClient } from "@tanstack/react-query";
import { getIssue } from "@/service/endpoints/get-issue";
import Link from "next/link";

interface Props {
  issue: GitgubIssuesInterface;
}

export const IssueItem = ({ issue }: Props) => {
  const queryClient = useQueryClient();

  const prefetchIsssue = async () => {
    await queryClient.prefetchQuery({
      queryKey: ["issues", issue.number],
      queryFn: () => getIssue(issue.number),
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
    });
  };

  return (
    <div
      onMouseEnter={() => prefetchIsssue()} // Prefetch cuando el mouse entra en el componente
      className="flex items-center p-4 mb-4 border rounded-lg shadow-lg bg-base-200 border-base-300 hover:bg-base-300 transition-all duration-200"
    >
      {/* Estado del Issue */}
      {issue.state === "open" ? (
        <FiInfo size={24} className="text-red-500 mr-4" />
      ) : (
        <FiCheckCircle size={24} className="text-green-500 mr-4" />
      )}

      {/* Información del Issue */}
      <div className="flex flex-col flex-grow">
        <Link
          href={`/listView/${issue.number}`}
          className="text-lg font-semibold hover:underline cursor-pointer text-primary"
          //onClick={() => handleMouseEnter(issue.number)}
        >
          {issue.title}
        </Link>
        <span className="text-sm text-base-content/70">
          #{issue.number} opened {timeSince(issue.created_at)} ago by{" "}
          <span className="font-semibold">{issue.user.login}</span>
        </span>
        <div className="flex flex-wrap mt-2 gap-2">
          {issue.labels.map((label) => (
            <span
              key={label.id}
              className="px-2 py-1 text-xs font-semibold rounded-full"
              style={{
                backgroundColor: `#${label.color}`,
                color: "#994d96",
              }}
            >
              {label.name}
            </span>
          ))}
        </div>
      </div>

      {/* Avatar del Usuario */}
      <img
        src={issue.user.avatar_url}
        alt="User Avatar"
        className="w-10 h-10 rounded-full border-2 border-base-300 mr-4"
      />

      {/* Contador de Comentarios */}
      <div className="flex items-center">
        <FiMessageSquare size={24} className="text-primary" />
        <span className="ml-2 text-sm font-medium text-base-content/60">
          {issue.comments}
        </span>
      </div>
    </div>
  );
};
