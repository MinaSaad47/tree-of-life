import { dropZones, type DropZoneId, type TreeStage } from "../data/dropZones";
import { Medallion } from "./Medallion";

type MedallionSidebarProps = {
  currentStage: TreeStage;
  placedIds: Set<DropZoneId>;
  selectedId: DropZoneId | null;
  onSelect: (id: DropZoneId) => void;
  onPointerStart: (id: DropZoneId, event: React.PointerEvent<HTMLButtonElement>) => void;
};

export function MedallionSidebar({
  currentStage,
  placedIds,
  selectedId,
  onSelect,
  onPointerStart,
}: MedallionSidebarProps) {
  const available = dropZones.filter((zone) => zone.unlockStage === currentStage && !placedIds.has(zone.id));

  return (
    <aside className="medallion-tray" aria-label="مكتبة الصور">
      <div className="medallion-library medallion-library--tray">
        {available.length === 0 ? (
          <p className="empty-library">كل الصور المتاحة اتحطت.</p>
        ) : (
          <div className="library-grid">
            {available.map((item) => (
              <Medallion
                item={item}
                key={item.id}
                selectedId={selectedId}
                onSelect={onSelect}
                onPointerStart={onPointerStart}
              />
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
