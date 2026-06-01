import { motion } from 'framer-motion';
import { getRiskColor } from '../constants/colors';

/**
 * Circular progress ring showing risk percentage.
 * @param {{ score: number, size?: number, strokeWidth?: number, label?: string }} props
 */
export default function RiskRing({ score, size = 72, strokeWidth = 5, label }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = getRiskColor(score);

  return (
    <div className="relative flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#30363D"
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ type: 'spring', stiffness: 60, damping: 15, duration: 1.2 }}
        />
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center font-mono text-sm font-bold"
        style={{ color }}
      >
        {Math.round(score)}%
      </div>
      {label && (
        <span className="text-[10px] font-mono text-spine-text-secondary uppercase tracking-wider mt-1">
          {label}
        </span>
      )}
    </div>
  );
}
