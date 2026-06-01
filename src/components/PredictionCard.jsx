import { motion } from 'framer-motion';

/**
 * Large prediction card (INJURY or NORMAL) with icon and description.
 * @param {{ prediction: string, isOverall?: boolean }} props
 */
export default function PredictionCard({ prediction, isOverall = false }) {
  const isInjury = prediction === 'Injury';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        boxShadow: isInjury 
          ? ['0 0 0px rgba(248,81,73,0.3)', '0 0 25px rgba(248,81,73,0.5)', '0 0 0px rgba(248,81,73,0.3)'] 
          : 'none'
      }}
      transition={{ 
        duration: 0.5,
        boxShadow: isInjury ? { repeat: Infinity, duration: 1.5, ease: "easeInOut" } : {}
      }}
      className={`
        relative overflow-hidden rounded-xl border p-6
        ${isInjury
          ? 'bg-spine-danger/5 border-spine-danger/30'
          : 'bg-spine-accent/5 border-spine-accent/30'
        }
      `}
    >
      {/* Background glow */}
      <div
        className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20
          ${isInjury ? 'bg-spine-danger' : 'bg-spine-accent'}
        `}
      />

      <div className="relative flex items-center gap-4">
        {/* Icon */}
        <div
          className={`
            flex items-center justify-center w-14 h-14 rounded-xl
            ${isInjury ? 'bg-spine-danger/15' : 'bg-spine-accent/15'}
          `}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isInjury ? '#F85149' : '#3FB950'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isInjury ? (
              <>
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </>
            ) : (
              <>
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </>
            )}
          </svg>
        </div>

        {/* Text */}
        <div>
          <div className="text-xs font-mono text-spine-text-secondary mb-1 tracking-widest">
            {isOverall ? 'OVERALL PREDICTION' : 'PREDICTION'}
          </div>
          <div
            className={`text-2xl font-bold tracking-wide
              ${isInjury ? 'text-spine-danger' : 'text-spine-accent'}
            `}
          >
            {isInjury ? 'INJURY DETECTED' : 'NORMAL'}
          </div>
          <div className="text-sm text-spine-text-secondary mt-1">
            {isInjury
              ? 'Potential spinal abnormality identified. Consult a specialist.'
              : 'No significant abnormalities detected in the scan.'
            }
          </div>
        </div>
      </div>
    </motion.div>
  );
}
