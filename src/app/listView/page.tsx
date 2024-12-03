"use client";

import { useState } from "react";
import { IssueList } from "@/components/IssueList";
import { LabelPicker } from "@/components/LabelPicker";
import { useIssues } from "@/hooks/useIssues";

const ListView = () => {
  const [estado, setEstado] = useState<string>("all");
  const [selectedLabel, setSelectedLabel] = useState<string[]>([]);

  const { issuesQuery, nextPage, page, prevPage } = useIssues({
    state: estado,
    selectedLabel,
  });

  const issues = issuesQuery.data || [];

  const onLabelSelect = (label: string) => {
    setSelectedLabel((prevLabels) =>
      prevLabels.includes(label)
        ? prevLabels.filter((l) => l !== label)
        : [...prevLabels, label]
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-5 gap-4">
      <div className="col-span-1 sm:col-span-2">
        {issuesQuery.isLoading ? (
          <div className="flex justify-center items-center h-20">
            <span className="loading loading-spinner text-blue-500"></span>
          </div>
        ) : (
          <IssueList issues={issues} onStateChange={setEstado} state={estado} />
        )}
      </div>
      <div className="col-span-1 px-2">
        <LabelPicker
          selectedLabel={selectedLabel}
          onLabelSelect={onLabelSelect}
        />
      </div>
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className={`btn btn-circle ${
            page === 1
              ? "btn-disabled opacity-50"
              : "btn-primary hover:bg-primary-focus"
          }`}
        >
          ❮
        </button>
        <span className="text-lg font-semibold">{page}</span>
        <button
          onClick={nextPage}
          className="btn btn-circle btn-primary hover:bg-primary-focus"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default ListView;
