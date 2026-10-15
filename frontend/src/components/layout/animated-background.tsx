import type { CSSProperties } from "react";

const particles = [
  { x: 8, y: 85, size: 3, duration: 18, delay: -4 },
  { x: 17, y: 62, size: 2, duration: 24, delay: -12 },
  { x: 26, y: 92, size: 4, duration: 21, delay: -7 },
  { x: 35, y: 48, size: 2, duration: 26, delay: -18 },
  { x: 44, y: 78, size: 3, duration: 20, delay: -10 },
  { x: 53, y: 95, size: 2, duration: 23, delay: -3 },
  { x: 62, y: 58, size: 3, duration: 19, delay: -14 },
  { x: 71, y: 88, size: 4, duration: 25, delay: -9 },
  { x: 80, y: 68, size: 2, duration: 22, delay: -16 },
  { x: 91, y: 94, size: 3, duration: 27, delay: -6 },
];

type ParticleStyle = CSSProperties & {
  "--particle-duration": string;
  "--particle-delay": string;
};

export function AnimatedBackground() {
  return (
    <div className="hok-background" aria-hidden="true">
      <div className="hok-background__artwork" />
      <div className="hok-background__overlay" />

      <div className="hok-background__mist hok-background__mist--blue" />
      <div className="hok-background__mist hok-background__mist--pink" />

      <div className="hok-background__particles">
        {particles.map((particle, index) => {
          const style: ParticleStyle = {
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            "--particle-duration": `${particle.duration}s`,
            "--particle-delay": `${particle.delay}s`,
          };

          return (
            <span
              key={index}
              className="hok-background__particle"
              style={style}
            />
          );
        })}
      </div>
    </div>
  );
}
