import { useQuery } from "@tanstack/react-query";
import { getIssue, getIssueComments } from "@/service/endpoints/get-issue";

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery({
    queryKey: ["issues", issueNumber],
    queryFn: () => getIssue(issueNumber),
    staleTime: 1000 * 60 * 60 * 24 * 7, // 1 week
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // Definimos una consulta usando `useQuery` para obtener comentarios de un issue específico
  const commentsQuery = useQuery({
    // `queryKey` identifica la consulta de manera única en la caché de React Query.
    // En este caso, usa "issues", el número de issue (`issueNumber.data?.number`), y "comments".

    queryKey: ["issues", issueNumber, "comments"],
    // `queryFn` es la función que se llama para obtener los datos de la consulta.
    // Aquí se usa `getIssueComments` y se pasa `issueNumber` como argumento para obtener los comentarios de un issue específico.
    queryFn: () => getIssueComments(issueNumber),

    // `staleTime` es el tiempo que los datos son considerados "frescos" (no obsoletos).
    // En este caso, se establece en 1 semana (1000 ms * 60 s * 60 min * 24 h * 7 días).
    // Durante este tiempo, la consulta no se actualizará automáticamente, ya que los datos se consideran válidos.
    staleTime: 1000 * 60 * 60 * 24 * 7, // 1 semana

    // `enabled` controla si la consulta debe ejecutarse.
    // Aquí se ejecuta solo si `issueQuery.data` está definido (es decir, que se han cargado los datos del issue principal).
    enabled: issueQuery.data != undefined,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return { issueQuery, commentsQuery };
};
