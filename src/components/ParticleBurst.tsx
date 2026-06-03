import { dropZones } from "../data/dropZones";
import type { CSSProperties } from "react";

type ParticleBurstProps = {
  variant: "fall" | "resurrection";
  active: boolean;
};

const fallParticles = Array.from({ length: 30 }, (_, index) => ({
  id: index,
  x: 42 + (index % 7) * 2.6,
  y: 48 + Math.floor(index / 7) * 7.4,
  delay: `${index * 0.055}s`,
  drift: `${index % 2 === 0 ? -1 : 1}${18 + (index % 5) * 9}px`,
  driftMid: `${index % 2 === 0 ? -1 : 1}${Math.round((18 + (index % 5) * 9) * 0.42)}px`,
  duration: `${2.15 + (index % 6) * 0.16}s`,
  rotate: `${80 + (index % 8) * 24}deg`,
  scale: `${0.72 + (index % 4) * 0.1}`,
}));

const radialParticles = Array.from({ length: 30 }, (_, index) => ({
  id: index,
  angle: index * 12,
  delay: `${0.45 + index * 0.045}s`,
}));

const branchLights = dropZones.map((zone, index) => {
  const originX = 50;
  const originY = 30;
  const dx = zone.x - originX;
  const dy = zone.y - originY;

  return {
    id: zone.id,
    left: originX,
    top: originY,
    width: `${Math.hypot(dx, dy)}%`,
    angle: `${Math.atan2(dy, dx) * (180 / Math.PI)}deg`,
    delay: `${0.62 + index * 0.055}s`,
  };
});

export function ParticleBurst({ variant, active }: ParticleBurstProps) {
  if (!active) return null;

  if (variant === "fall") {
    return (
      <div className="particle-layer" aria-hidden="true">
        {fallParticles.map((particle) => (
          <span
            className="fall-leaf-particle"
            key={particle.id}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
              "--leaf-drift": particle.drift,
              "--leaf-drift-mid": particle.driftMid,
              "--leaf-rotate": particle.rotate,
              "--leaf-scale": particle.scale,
            } as CSSProperties}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="particle-layer" aria-hidden="true">
      <div className="branch-light-layer">
        {branchLights.map((beam) => (
          <span
            className="branch-light"
            key={beam.id}
            style={
              {
                left: `${beam.left}%`,
                top: `${beam.top}%`,
                width: beam.width,
                "--beam-angle": beam.angle,
                animationDelay: beam.delay,
              } as CSSProperties
            }
          />
        ))}
      </div>
      {radialParticles.map((particle) => (
        <span
          className="light-particle"
          key={particle.id}
          style={
            {
              "--angle": `${particle.angle}deg`,
              animationDelay: particle.delay,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
