import { ParticleBurst } from "./ParticleBurst";

type ResurrectionTransitionProps = {
  active: boolean;
};

export function ResurrectionTransition({ active }: ResurrectionTransitionProps) {
  if (!active) return null;

  return (
    <div className="resurrection-transition" aria-hidden="true">
      <span className="resurrection-wash" />
      <span className="trunk-light-stream" />
      <span className="resurrection-wave" />
      <span className="resurrection-light" />
      <ParticleBurst variant="resurrection" active={active} />
    </div>
  );
}
