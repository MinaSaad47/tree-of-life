import { ParticleBurst } from "./ParticleBurst";

type FallTransitionProps = {
  active: boolean;
};

export function FallTransition({ active }: FallTransitionProps) {
  if (!active) return null;

  return (
    <div className="fall-transition" aria-hidden="true">
      <span className="fall-vignette" />
      <span className="fall-shadow-wave" />
      <span className="fall-ripple" />
      <ParticleBurst variant="fall" active={active} />
    </div>
  );
}
