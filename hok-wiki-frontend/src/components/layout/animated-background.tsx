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
  { x: 5, y: 32, size: 2, duration: 25, delay: -9 },
  { x: 24, y: 24, size: 3, duration: 28, delay: -17 },
  { x: 41, y: 38, size: 2, duration: 22, delay: -5 },
  { x: 59, y: 18, size: 2, duration: 30, delay: -21 },
  { x: 76, y: 36, size: 3, duration: 26, delay: -13 },
  { x: 94, y: 27, size: 2, duration: 24, delay: -8 },
  { x: 12, y: 46, size: 2, duration: 29, delay: -19 },
  { x: 31, y: 67, size: 3, duration: 23, delay: -11 },
  { x: 48, y: 53, size: 2, duration: 27, delay: -15 },
  { x: 66, y: 76, size: 2, duration: 31, delay: -23 },
  { x: 85, y: 49, size: 3, duration: 25, delay: -7 },
  { x: 97, y: 72, size: 2, duration: 28, delay: -18 },
  { x: 3, y: 96, size: 3, duration: 24, delay: -14 },
  { x: 20, y: 79, size: 2, duration: 30, delay: -4 },
  { x: 38, y: 98, size: 3, duration: 26, delay: -20 },
  { x: 56, y: 65, size: 2, duration: 29, delay: -12 },
  { x: 74, y: 97, size: 3, duration: 23, delay: -6 },
  { x: 88, y: 84, size: 2, duration: 32, delay: -24 },
  { x: 14, y: 15, size: 2, duration: 27, delay: -10 },
  { x: 46, y: 12, size: 2, duration: 31, delay: -16 },
  { x: 69, y: 29, size: 3, duration: 28, delay: -22 },
  { x: 83, y: 10, size: 2, duration: 25, delay: -3 },
];

type ParticleStyle = CSSProperties & {
  "--particle-duration": string;
  "--particle-delay": string;
};

export function AnimatedBackground() {
  return (
    <>
      <div className="hok-background" aria-hidden="true">
        <div className="hok-background__artwork" />
        <div className="hok-background__overlay" />

        <div className="hok-background__mist hok-background__mist--blue" />
        <div className="hok-background__mist hok-background__mist--pink" />
      </div>

      <div className="hok-background__particles" aria-hidden="true">
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
    </>
  );
}
