import { dropZones, type DropZoneId, type TreeStage } from "../data/dropZones";
import { DropZone } from "./DropZone";
import { EnvironmentLayer } from "./EnvironmentLayer";
import { FallTransition } from "./FallTransition";
import { ResurrectionTransition } from "./ResurrectionTransition";
import { SvgTree } from "./SvgTree";

type VisualStage = TreeStage | "fall_transition" | "resurrection_transition";

type TreeCanvasProps = {
  visualStage: VisualStage;
  currentStage: TreeStage;
  placed: Partial<Record<DropZoneId, DropZoneId>>;
  wrongZoneId: DropZoneId | null;
  selectedId: DropZoneId | null;
  onPlace: (draggedId: DropZoneId, zoneId: DropZoneId) => void;
};

export function TreeCanvas({ visualStage, currentStage, placed, wrongZoneId, selectedId, onPlace }: TreeCanvasProps) {
  return (
    <main className="tree-stage" aria-label="مكان شجرة الخلاص">
      <div className="tree-frame">
        <EnvironmentLayer stage={visualStage} />
        <SvgTree stage={visualStage} />
        <div className="drop-zone-layer">
          {dropZones.map((zone) => {
            const placedId = placed[zone.id];
            const state = placedId ? "filled" : zone.unlockStage === currentStage ? "available" : "locked";

            return (
              <DropZone
                key={zone.id}
                zone={zone}
                state={state}
                placedId={placedId}
                selectedId={selectedId}
                isWrong={wrongZoneId === zone.id}
                onPlace={onPlace}
              />
            );
          })}
        </div>
        <FallTransition active={visualStage === "fall_transition"} />
        <ResurrectionTransition active={visualStage === "resurrection_transition"} />
      </div>
    </main>
  );
}
