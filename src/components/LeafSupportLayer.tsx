import { dropZones } from "../data/dropZones";

type LeafSupportLayerProps = {
  stage: "creation_alive" | "fall_transition" | "dead_waiting" | "resurrection_transition" | "redeemed_alive";
};

export function LeafSupportLayer({ stage }: LeafSupportLayerProps) {
  return (
    <div className={`leaf-support-layer leaf-support-layer--${stage}`} aria-hidden="true">
      {dropZones.map((zone) => (
        <span
          className="leaf-pad"
          key={zone.id}
          style={{
            left: `${zone.x}%`,
            top: `${zone.y}%`,
            width: zone.size + 28,
            height: zone.size + 20,
          }}
        />
      ))}
    </div>
  );
}
