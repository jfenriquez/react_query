import { FC } from "react";
import ReactMarkdown from "react-markdown";
import { GitgubIssuesInterface } from "@/interfaces/IssueInterface";

interface Props {
  issue: GitgubIssuesInterface;
}

export const IssueComment: FC<Props> = ({ issue }) => {
  return (
    <div className="w-full max-w-3xl mx-auto my-6">
      <div className="border rounded-md shadow-lg overflow-hidden bg-base-200 border-base-300">
        
        <div className="flex items-center bg-base-300 text-base-content p-4">
          <img
            src={issue.user.avatar_url}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-base-300"
          />
          <span className="ml-3 font-semibold">{issue.user.login}</span>
          <span className="ml-auto text-sm text-base-content/60">commented</span>
        </div>

        <div className="p-6 bg-base-100 text-base-content prose max-w-none">
          <ReactMarkdown>{issue.body}</ReactMarkdown>
        </div>
        
      </div>
    </div>
  );
};
