import { motion } from 'framer-motion';
import { getRiskColor } from '../constants/colors';

/**
 * Horizontal progress bar showing risk percentage with color coding.
 * @param {{ score: number, label?: string }} props
 */
export default function RiskScoreCard({ score, label }) {
  const color = getRiskColor(score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-xl border border-spine-border bg-spine-surface p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono text-spine-text-secondary tracking-widest">
          {label || 'RISK SCORE'}
        </span>
        <span className="text-lg font-bold font-mono" style={{ color }}>
          {score.toFixed(1)}%
        </span>
      </div>

      {/* Progress bar track */}
      <div className="h-3 rounded-full bg-spine-surface-light overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>

      {/* Scale labels */}
      <div className="flex justify-between mt-2 text-[10px] font-mono text-spine-text-secondary">
        <span>0%</span>
        <span>LOW</span>
        <span>MODERATE</span>
        <span>HIGH</span>
        <span>100%</span>
      </div>
    </motion.div>
  );
}
