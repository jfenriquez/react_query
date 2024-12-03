// 📄 products/[productId]/page.tsx
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
//import ProductDetail from "./ProductDetail";
import { getIssue } from "@/service/endpoints/get-issue";
import { fetchtIssues } from "@/service/endpoints/get-issues";
import IssueDetails from "./IssueDetails";

export async function generateStaticParams() {
  const issues = await fetchtIssues();
  return issues.map((issue) => ({
    number: issue.number,
  }));
}

export default async function IssueDetailPage({
  params,
}: {
  params: { issueNumber: number };
}) {
  console.log("params", params);
  const queryClient = new QueryClient();

  // Prefetch products on the server
  await queryClient.prefetchQuery({
    queryKey: ["issues", params.issueNumber],
    queryFn: () => getIssue(params.issueNumber),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <IssueDetails ussueId={params.issueNumber} />
    </HydrationBoundary>
  );
}
