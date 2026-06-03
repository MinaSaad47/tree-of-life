import { medallionImage, type DropZoneData, type DropZoneId } from "../data/dropZones";

type MedallionProps = {
  item: DropZoneData;
  selectedId?: DropZoneId | null;
  compact?: boolean;
  draggable?: boolean;
  onSelect?: (id: DropZoneId) => void;
  onPointerStart?: (id: DropZoneId, event: React.PointerEvent<HTMLButtonElement>) => void;
};

export function Medallion({
  item,
  selectedId,
  compact = false,
  draggable = false,
  onSelect,
  onPointerStart,
}: MedallionProps) {
  const isSelected = selectedId === item.id;

  return (
    <button
      className={`medallion ${compact ? "medallion--compact" : ""} ${isSelected ? "is-selected" : ""}`}
      type="button"
      draggable={draggable}
      onClick={(event) => {
        if (!onPointerStart) onSelect?.(item.id);
        event.preventDefault();
      }}
      onPointerDown={(event) => onPointerStart?.(item.id, event)}
      onDragStart={(event) => {
        event.preventDefault();
      }}
      aria-label={`${item.label}: ${item.description}`}
      title={item.description}
    >
      <img src={medallionImage(item.image)} alt="" />
      {!compact && <span>{item.label}</span>}
    </button>
  );
}
