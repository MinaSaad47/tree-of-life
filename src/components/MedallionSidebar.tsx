import { useState } from "react";
import { dropZones, type DropZoneId, type TreeStage } from "../data/dropZones";
import { Medallion } from "./Medallion";
import { MedallionPreview } from "./MedallionPreview";

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
  const [hoveredId, setHoveredId] = useState<DropZoneId | null>(null);
  const available = dropZones.filter((zone) => zone.unlockStage === currentStage && !placedIds.has(zone.id));
  const hoveredItem = hoveredId ? dropZones.find((z) => z.id === hoveredId) : null;

  return (
    <div className="medallion-sidebar">
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
                  onHover={setHoveredId}
                  onHoverEnd={() => setHoveredId(null)}
                />
              ))}
            </div>
          )}
        </div>
      </aside>
      {hoveredItem && (
        <MedallionPreview
          image={hoveredItem.image}
          label={hoveredItem.label}
        />
      )}
    </div>
  );
}
