import { medallionImage, type DropZoneData, type DropZoneId } from "../data/dropZones";

type DropZoneProps = {
  zone: DropZoneData;
  state: "locked" | "available" | "filled";
  isWrong: boolean;
  placedId?: DropZoneId;
  selectedId: DropZoneId | null;
  onPlace: (id: DropZoneId, zoneId: DropZoneId) => void;
};

export function DropZone({ zone, state, isWrong, placedId, selectedId, onPlace }: DropZoneProps) {
  const canAccept = state === "available";
  const placedImage = placedId ? medallionImage(`${placedId}.webp`) : "";
  const stateLabels = {
    locked: "لسه مقفول",
    available: "جاهز",
    filled: "اتحط",
  };

  return (
    <button
      className={`drop-zone drop-zone--${state} ${isWrong ? "is-wrong" : ""}`}
      type="button"
      style={{
        left: `${zone.x}%`,
        top: `${zone.y}%`,
        width: zone.size,
        height: zone.size,
      }}
      data-drop-zone-id={zone.id}
      disabled={state === "locked" || state === "filled"}
      onClick={() => {
        if (selectedId) onPlace(selectedId, zone.id);
      }}
      onDragOver={(event) => {
        if (canAccept) event.preventDefault();
      }}
      onDrop={(event) => {
        event.preventDefault();
        const draggedId = event.dataTransfer.getData("text/plain") as DropZoneId;
        onPlace(draggedId, zone.id);
      }}
      aria-label={`${zone.label}، مكان ${stateLabels[state]}`}
      title={zone.description}
    >
      <span className="drop-zone__inner">
        {placedId ? <img src={placedImage} alt={zone.label} /> : <span className="drop-zone__dot" />}
      </span>
    </button>
  );
}
