import { dropZones, type DropZoneId, type TreeStage } from "../data/dropZones";

type StoryControlsProps = {
  currentStage: TreeStage;
  placedCount: number;
  selectedId: DropZoneId | null;
  isTransitioning: boolean;
  onReset: () => void;
};

const stageText: Record<TreeStage, { title: string; detail: string }> = {
  creation_alive: {
    title: "شجرة الخليقة",
    detail: "حط آدم وحواء، وبعدين صورة السقوط علشان نكمل القصة.",
  },
  dead_waiting: {
    title: "الشجرة بعد السقوط",
    detail: "حط صور العهد القديم، وبعدها يسوع والصليب والقيامة.",
  },
  redeemed_alive: {
    title: "شجرة الحياة الجديدة",
    detail: "كمل فوق بالرسل والكنيسة والقديسين وإحنا النهارده.",
  },
};

export function StoryControls({
  currentStage,
  placedCount,
  selectedId,
  isTransitioning,
  onReset,
}: StoryControlsProps) {
  const text = stageText[currentStage];
  const selectedLabel = selectedId ? dropZones.find((zone) => zone.id === selectedId)?.label : null;

  return (
    <aside className="sidebar sidebar--right" aria-label="لوحة القصة">
      <div className="stage-panel">
        <p>المرحلة</p>
        <h2>{text.title}</h2>
        <span>{text.detail}</span>
      </div>
      <div className="progress-panel">
        <div>
          <span>اتحط</span>
          <strong>{placedCount}/17</strong>
        </div>
        <div>
          <span>المختار</span>
          <strong>{selectedLabel ?? "مفيش"}</strong>
        </div>
      </div>
      <button className="reset-button" type="button" onClick={onReset} disabled={isTransitioning}>
        ابدأ من جديد
      </button>
    </aside>
  );
}
