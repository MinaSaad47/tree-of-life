import type { TreeStage } from "../data/dropZones";

type VisualStage = TreeStage | "fall_transition" | "resurrection_transition";

type EnvironmentLayerProps = {
  stage: VisualStage;
};

const cloudPaths = [
  "M112 246c20-31 64-35 88-10 17-18 50-18 68 2 34-6 62 12 70 40H84c2-13 12-25 28-32Z",
  "M688 182c17-26 53-31 75-11 14-16 42-16 58 1 29-6 54 10 61 34H664c3-11 11-20 24-24Z",
  "M756 350c13-20 41-23 58-8 11-12 33-12 45 1 22-4 42 8 47 26H736c2-8 8-16 20-19Z",
];

export function EnvironmentLayer({ stage }: EnvironmentLayerProps) {
  return (
    <div className={`environment-layer environment-layer--${stage}`} aria-hidden="true">
      <svg className="environment-layer__svg" viewBox="0 0 1000 1000">
        <defs>
          <radialGradient id="environmentSun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff8c9" />
            <stop offset="54%" stopColor="#ffd96e" />
            <stop offset="100%" stopColor="#f2a94c" />
          </radialGradient>
          <linearGradient id="environmentGroundAlive" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#8eca6d" stopOpacity="0" />
            <stop offset="22%" stopColor="#83bf66" stopOpacity="0.72" />
            <stop offset="50%" stopColor="#a6d77a" stopOpacity="0.86" />
            <stop offset="78%" stopColor="#74b765" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#86c46d" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="environmentGroundDead" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#9c8e78" stopOpacity="0" />
            <stop offset="26%" stopColor="#8a7b67" stopOpacity="0.52" />
            <stop offset="52%" stopColor="#b2a38d" stopOpacity="0.46" />
            <stop offset="78%" stopColor="#877760" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#9c8e78" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g className="environment-sun">
          <circle cx="812" cy="152" r="74" className="environment-sun__halo" />
          <circle cx="812" cy="152" r="42" className="environment-sun__disk" />
          <g className="environment-rays">
            {Array.from({ length: 12 }, (_, index) => (
              <line
                key={index}
                x1="812"
                y1="152"
                x2="812"
                y2="44"
                style={{ transform: `rotate(${index * 30}deg)`, transformOrigin: "812px 152px" }}
              />
            ))}
          </g>
        </g>

        <g className="environment-clouds">
          {cloudPaths.map((path, index) => (
            <path key={path} d={path} className={`environment-cloud environment-cloud--${index + 1}`} />
          ))}
        </g>

        <g className="environment-dead-clouds">
          <path d="M44 185c52-41 120-38 169-6 33-28 90-27 123 4 55-9 100 17 119 58H34c-5-21-1-40 10-56Z" />
          <path d="M562 245c48-34 109-31 151-4 30-23 82-22 111 4 49-8 91 15 108 51H546c-4-18 1-36 16-51Z" />
        </g>

        <path className="environment-horizon" d="M64 838C250 806 362 838 500 820C640 802 736 795 936 832" />
        <path className="environment-ground environment-ground--alive" d="M78 885C250 846 360 892 500 868C646 843 764 842 924 884" />
        <path className="environment-ground environment-ground--dead" d="M78 884C250 862 362 888 500 876C646 862 760 860 924 884" />

        <g className="environment-garden">
          {[
            [186, 850],
            [256, 872],
            [704, 858],
            [778, 878],
            [842, 842],
          ].map(([cx, cy]) => (
            <path key={`${cx}-${cy}`} d={`M${cx} ${cy}c14-34 30-34 44 0c-16-8-28-8-44 0Z`} />
          ))}
        </g>

        <g className="environment-redeemed-flowers">
          {[
            [168, 872],
            [228, 848],
            [302, 878],
            [706, 876],
            [776, 850],
            [838, 876],
          ].map(([cx, cy]) => (
            <g key={`${cx}-${cy}`} transform={`translate(${cx} ${cy})`}>
              <line x1="0" y1="18" x2="0" y2="0" />
              <circle cx="-8" cy="-2" r="6" />
              <circle cx="8" cy="-2" r="6" />
              <circle cx="0" cy="-10" r="6" />
              <circle cx="0" cy="-2" r="4" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
