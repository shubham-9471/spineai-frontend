import { motion } from 'framer-motion';
import { getRiskColor } from '../constants/colors';

/**
 * Horizontal timeline of scan nodes connected by gradient lines.
 * Highlights the worst scan.
 * @param {{ results: Array, worstIndex: number }} props
 */
export default function ScanTimeline({ results, worstIndex }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="rounded-xl border border-spine-border bg-spine-surface p-6"
    >
      <div className="text-xs font-mono text-spine-text-secondary tracking-widest mb-5">
        SCAN TIMELINE
      </div>

      <div className="flex items-center justify-center gap-0 overflow-x-auto py-2">
        {results.map((result, i) => {
          const isWorst = i === worstIndex;
          const color = getRiskColor(result.riskScore);

          return (
            <div key={i} className="flex items-center">
              {/* Node */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.15, type: 'spring', stiffness: 300 }}
                className="flex flex-col items-center"
              >
                <div
                  className={`
                    relative w-12 h-12 rounded-full flex items-center justify-center
                    border-2 font-mono text-xs font-bold
                    ${isWorst ? 'border-spine-primary glow-blue' : ''}
                  `}
                  style={{
                    borderColor: isWorst ? '#2F81F7' : color,
                    backgroundColor: isWorst ? 'rgba(47, 129, 247, 0.1)' : `${color}15`,
                  }}
                >
                  <span style={{ color }}>{Math.round(result.riskScore)}%</span>
                </div>

                <span className="text-[10px] font-mono text-spine-text-secondary mt-2">
                  SCAN {String(i + 1).padStart(2, '0')}
                </span>

                {isWorst && (
                  <motion.span
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[9px] font-mono font-bold text-spine-primary mt-0.5 tracking-wider"
                  >
                    WORST
                  </motion.span>
                )}
              </motion.div>

              {/* Connector line */}
              {i < results.length - 1 && (
                <div className="w-8 md:w-14 h-0.5 mx-1 bg-gradient-to-r from-spine-border to-spine-border via-spine-text-secondary/30" />
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
