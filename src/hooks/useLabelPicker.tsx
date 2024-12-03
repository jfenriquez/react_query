import { useQuery } from "@tanstack/react-query";

import { getLabels } from "@/service/endpoints/get-labels";
//import { GithubLabel } from "@/interfaces/LabelInterface";

export const useLabelPicker = () => {
  const labelsQuery = useQuery({
    queryKey: ["labels"],
    queryFn: getLabels,
    staleTime: 1000 * 60 * 60, ///1hora
    /* placeholderData: [
      {
        id: 69105383,
        node_id: "MDU6TGFiZWw2OTEwNTM4Mw==",
        url: "https://api.github.com/repos/facebook/react/labels/Browser:%20IE",
        name: "Browser: IE",
        color: "c7def8",
        default: false,
        description: null,
      } satisfies GithubLabel,
    ], */
    /* initialData: [
      {
        id: 69105383,
        node_id: "MDU6TGFiZWw2OTEwNTM4Mw==",
        url: "https://api.github.com/repos/facebook/react/labels/Browser:%20IE",
        name: "Browser: IE",
        color: "c7def8",
        default: false,
        description: null,
      } satisfies GithubLabel,
    ], */
  });

  return {
    labelsQuery,
  };
};
