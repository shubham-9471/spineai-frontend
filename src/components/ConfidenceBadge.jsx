import { motion } from 'framer-motion';

/**
 * Confidence badge showing verified or low-confidence status.
 * @param {{ status: string }} props
 */
export default function ConfidenceBadge({ status }) {
  const isVerified = status === 'Verified';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-semibold
        border backdrop-blur-sm
        ${isVerified
          ? 'bg-spine-accent/10 border-spine-accent/30 text-spine-accent'
          : 'bg-spine-warning/10 border-spine-warning/30 text-spine-warning'
        }
      `}
    >
      {/* Icon */}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {isVerified ? (
          <>
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="M9 12l2 2 4-4" />
          </>
        ) : (
          <>
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="M12 8v4M12 16h.01" />
          </>
        )}
      </svg>
      {isVerified ? 'VERIFIED' : 'LOW CONFIDENCE'}
    </motion.div>
  );
}
