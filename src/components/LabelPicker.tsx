import { useLabelPicker } from "../hooks/useLabelPicker";

interface Props {
  selectedLabel: string[];
  onLabelSelect: (label: string) => void;
}

export const LabelPicker = ({ onLabelSelect, selectedLabel }: Props) => {
  const { labelsQuery } = useLabelPicker();

  if (labelsQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h-20">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (labelsQuery.isError) {
    return (
      <div className="text-center text-error font-semibold">
        Error al cargar etiquetas.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {labelsQuery.data?.map((label) => (
        <span
          key={label.id}
          onClick={() => onLabelSelect(label.name)}
          className={`badge badge-outline badge-lg cursor-pointer transition-colors `}
          style={{
            color: `black`,
            backgroundColor: selectedLabel.includes(label.name)
              ? "white"
              : `#${label.color}`,
            borderColor: `#${label.color}`,
          }}
        >
          {label.name}
        </span>
      ))}
    </div>
  );
};
