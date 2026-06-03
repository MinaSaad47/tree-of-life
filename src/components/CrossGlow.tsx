type CrossGlowProps = {
  active: boolean;
  redeemed: boolean;
};

export function CrossGlow({ active, redeemed }: CrossGlowProps) {
  return (
    <g className={`cross-glow ${active ? "is-active" : ""} ${redeemed ? "is-redeemed" : ""}`} aria-hidden="true">
      <circle cx="500" cy="302" r="184" className="cross-glow__halo" />
      <circle cx="500" cy="302" r="108" className="cross-glow__core" />
      <path className="cross-glow__cross cross-glow__cross-shadow" d="M500 112V542M392 250H608" />
      <path className="cross-glow__cross" d="M500 112V542M392 250H608" />
    </g>
  );
}
