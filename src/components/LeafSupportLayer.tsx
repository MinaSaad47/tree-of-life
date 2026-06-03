import { dropZones, type DropZoneId } from "../data/dropZones";
import type { CSSProperties } from "react";

type LeafSupportLayerProps = {
  stage: "creation_alive" | "fall_transition" | "dead_waiting" | "resurrection_transition" | "redeemed_alive";
  activeId: DropZoneId | null;
};

const leafRotations: Record<string, number> = {
  "adam-eve": 0,
  fall: 0,
  noah: -13,
  abraham: 13,
  joseph: -15,
  moses: 15,
  david: -12,
  jonah: 12,
  jesus: 0,
  crucifixion: 0,
  resurrection: 0,
  peter: -10,
  paul: 10,
  apostles: -15,
  "early-church": 15,
  "martyrs-saints": -8,
  "modern-believers": 8,
};

export function LeafSupportLayer({ stage, activeId }: LeafSupportLayerProps) {
  return (
    <div className={`leaf-support-layer leaf-support-layer--${stage}`} aria-hidden="true">
      {dropZones.map((zone) => (
        <span
          className={`leaf-pad ${activeId === zone.id ? "is-activated" : ""}`}
          key={zone.id}
          style={{
            left: `${zone.x}%`,
            top: `${zone.y}%`,
            width: zone.size + 28,
            height: zone.size + 20,
            "--leaf-rotate": `${leafRotations[zone.id]}deg`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}
