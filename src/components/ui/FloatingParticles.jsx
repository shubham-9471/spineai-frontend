import { useEffect, useRef } from 'react';

const FloatingParticles = ({ count = 18 }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 12 + 8,
    delay: Math.random() * 6,
    opacity: Math.random() * 0.3 + 0.05,
  }));

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full bg-blue-400"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
            animation: `floatParticle ${p.duration}s ${p.delay}s infinite ease-in-out alternate`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
