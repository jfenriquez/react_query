// 📄 products/[productId]/IssueDetails.tsx
"use client";

import { IssueComment } from "@/components/IssueComment";
import { useIssue } from "@/hooks/useIssue";
import Link from "next/link";
import { FiSkipBack } from "react-icons/fi";
//import Image from "next/image";

export default function IssueDetails({ ussueId }: { ussueId: number }) {
  const { issueQuery } = useIssue(ussueId);

  if (issueQuery.isLoading) return <div>Cargando detalles...</div>;
  if (!issueQuery.data) return <div>Datos no disponibles</div>;

  const { title, body, comments } = issueQuery.data;

  return (
    <div>
      <div className="mb-5">
        <div className="mb-4">
          <Link
            href={"/listView"}
            className="hover:underline text-blue-400 flex items-center"
          >
            <FiSkipBack />
            Regresar
          </Link>
        </div>

        {/* Primer comentario */}
        <IssueComment issue={issueQuery.data} />
        {issueQuery.isLoading && <div>cargando</div>}

        {/* Primer comentario */}
        <IssueComment issue={issueQuery.data} />

        {Array.isArray(comments) &&
          comments.map((comment) => (
            <IssueComment key={comment.id} issue={comment} />
          ))}
      </div>
    </div>
  );
}
