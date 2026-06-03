type ParticleBurstProps = {
  variant: "fall" | "resurrection";
  active: boolean;
};

const fallParticles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  x: 47 + (index % 6) * 1.4,
  y: 78 + Math.floor(index / 6) * 1.6,
  delay: `${index * 0.08}s`,
}));

const resurrectionParticles = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  angle: index * 15,
  delay: `${0.45 + index * 0.045}s`,
}));

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
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="particle-layer" aria-hidden="true">
      {resurrectionParticles.map((particle) => (
        <span
          className="light-particle"
          key={particle.id}
          style={
            {
              "--angle": `${particle.angle}deg`,
              animationDelay: particle.delay,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
