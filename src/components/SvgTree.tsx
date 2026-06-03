import { dropZones } from "../data/dropZones";
import { CrossGlow } from "./CrossGlow";
import { LeafSupportLayer } from "./LeafSupportLayer";
import type { DropZoneId } from "../data/dropZones";

type SvgTreeProps = {
  stage: "creation_alive" | "fall_transition" | "dead_waiting" | "resurrection_transition" | "redeemed_alive";
  lastPlacedId: DropZoneId | null;
};

const creationTree = new URL("../assets/tree/creation-tree.webp", import.meta.url).href;
const deadTree = new URL("../assets/tree/dead-tree.webp", import.meta.url).href;
const redeemedTree = new URL("../assets/tree/redeemed-tree.webp", import.meta.url).href;

export function SvgTree({ stage, lastPlacedId }: SvgTreeProps) {
  const showCreation = stage === "creation_alive";
  const showDead = stage === "fall_transition" || stage === "dead_waiting" || stage === "resurrection_transition";
  const showRedeemed = stage === "redeemed_alive";
  const showCross = stage === "resurrection_transition" || stage === "redeemed_alive";

  return (
    <div className={`tree-backdrop tree-backdrop--${stage}`} role="img" aria-label="شجرة الخلاص">
      <img
        className={`tree-backdrop__image tree-backdrop__image--creation ${showCreation ? "is-visible" : ""}`}
        src={creationTree}
        alt=""
        draggable={false}
      />
      <img
        className={`tree-backdrop__image tree-backdrop__image--dead ${showDead ? "is-visible" : ""}`}
        src={deadTree}
        alt=""
        draggable={false}
      />
      <img
        className={`tree-backdrop__image tree-backdrop__image--redeemed ${showRedeemed ? "is-visible" : ""}`}
        src={redeemedTree}
        alt=""
        draggable={false}
      />

      <svg className="tree-overlay-svg" viewBox="0 0 1000 1000" aria-hidden="true">
        <defs>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <CrossGlow active={showCross} redeemed={showRedeemed} />

        <g id="drop-zone-guides" className="drop-zone-guides">
          {dropZones.map((zone) => (
            <circle key={zone.id} cx={zone.x * 10} cy={zone.y * 10} r={zone.size / 2 + 8} />
          ))}
        </g>

        {stage === "fall_transition" && <circle className="svg-fall-pulse" cx="500" cy="800" r="28" />}
      </svg>
      <LeafSupportLayer stage={stage} activeId={lastPlacedId} />
    </div>
  );
}
