import { medallionImage, type DropZoneData, type DropZoneId } from "../data/dropZones";

type DropZoneProps = {
  zone: DropZoneData;
  state: "locked" | "available" | "filled";
  isWrong: boolean;
  isJustPlaced: boolean;
  placedId?: DropZoneId;
  selectedId: DropZoneId | null;
  onQuestion: (zoneId: DropZoneId | null) => void;
  onPlace: (id: DropZoneId, zoneId: DropZoneId) => void;
};

export function DropZone({ zone, state, isWrong, isJustPlaced, placedId, selectedId, onQuestion, onPlace }: DropZoneProps) {
  const canAccept = state === "available";
  const placedImage = placedId ? medallionImage(`${placedId}.webp`) : "";
  const stateLabels = {
    locked: "لسه مقفول",
    available: "جاهز",
    filled: "اتحط",
  };

  return (
    <button
      className={`drop-zone drop-zone--${state} ${isWrong ? "is-wrong" : ""} ${isJustPlaced ? "is-just-placed" : ""}`}
      type="button"
      style={{
        left: `${zone.x}%`,
        top: `${zone.y}%`,
        width: zone.size,
        height: zone.size,
      }}
      data-drop-zone-id={zone.id}
      disabled={state === "filled"}
      onClick={() => {
        if (selectedId) {
          onPlace(selectedId, zone.id);
          return;
        }

        if (!placedId && zone.question) {
          onQuestion(zone.id);
          return;
        }

        onQuestion(null);
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
        {isJustPlaced && <span className="drop-zone__success-ring" />}
      </span>
    </button>
  );
}
