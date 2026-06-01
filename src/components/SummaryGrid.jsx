import { motion } from 'framer-motion';
import { getRiskColor, getRiskBgTailwind } from '../constants/colors';

/**
 * Summary grid: 4 metric tiles showing MIN / AVG / MAX / WORST SCAN.
 * @param {{ results: Array, worstIndex: number }} props
 */
export default function SummaryGrid({ results, worstIndex }) {
  const scores = results.map(r => r.riskScore);
  const min = Math.min(...scores);
  const max = Math.max(...scores);
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;

  const tiles = [
    { label: 'MIN RISK', value: min },
    { label: 'AVG RISK', value: avg },
    { label: 'MAX RISK', value: max },
    { label: 'WORST SCAN', value: max, extra: `SCAN ${String(worstIndex + 1).padStart(2, '0')}` },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {tiles.map((tile, i) => {
        const color = getRiskColor(tile.value);
        const bgClass = getRiskBgTailwind(tile.value);

        return (
          <motion.div
            key={tile.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`
              rounded-xl border p-4 text-center ${bgClass}
            `}
          >
            <div className="text-[10px] font-mono text-spine-text-secondary tracking-widest mb-2">
              {tile.label}
            </div>
            <div className="text-2xl font-bold font-mono" style={{ color }}>
              {tile.value.toFixed(1)}%
            </div>
            {tile.extra && (
              <div className="text-[10px] font-mono mt-1" style={{ color }}>
                {tile.extra}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
