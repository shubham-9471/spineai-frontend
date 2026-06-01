import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RiskRing from './RiskRing';
import ConfidenceBadge from './ConfidenceBadge';
import { getRiskColor } from '../constants/colors';

/**
 * Expandable per-scan card with side-by-side / overlay image views.
 * @param {{ result: Object, index: number, imageUrl: string }} props
 */
export default function ScanCard({ result, index, imageUrl }) {
  const [expanded, setExpanded] = useState(true);
  const [viewMode, setViewMode] = useState('side'); // 'side' | 'overlay'
  const [overlayOpacity, setOverlayOpacity] = useState(0.5);

  const isInjury = result.prediction === 'Injury';
  const color = getRiskColor(result.riskScore);
  const scanLabel = `SCAN ${String(index + 1).padStart(2, '0')}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="rounded-xl border border-spine-border bg-spine-surface overflow-hidden"
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-spine-surface-light/50 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-spine-primary tracking-widest">
            {scanLabel}
          </span>
          <span
            className={`
              text-xs font-mono font-semibold px-2 py-0.5 rounded-full
              ${isInjury ? 'bg-spine-danger/15 text-spine-danger' : 'bg-spine-accent/15 text-spine-accent'}
            `}
          >
            {isInjury ? 'INJURY' : 'NORMAL'}
          </span>
          <span className="text-xs font-mono" style={{ color }}>
            {result.riskScore.toFixed(1)}%
          </span>
        </div>

        <div className="flex items-center gap-3">
          <RiskRing score={result.riskScore} size={36} strokeWidth={3} />
          <svg
            className={`w-4 h-4 text-spine-text-secondary transition-transform ${expanded ? 'rotate-180' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {/* Expandable content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-spine-border p-4 space-y-4">
              {/* View mode toggle */}
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setViewMode('side')}
                  className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    viewMode === 'side'
                      ? 'border-spine-primary bg-spine-primary/10 text-spine-primary'
                      : 'border-spine-border text-spine-text-secondary hover:border-spine-text-secondary'
                  }`}
                >
                  SIDE-BY-SIDE
                </button>
                <button
                  onClick={() => setViewMode('overlay')}
                  className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    viewMode === 'overlay'
                      ? 'border-spine-primary bg-spine-primary/10 text-spine-primary'
                      : 'border-spine-border text-spine-text-secondary hover:border-spine-text-secondary'
                  }`}
                >
                  OVERLAY
                </button>
              </div>

              {viewMode === 'side' ? (
                /* Side-by-side view */
                <div className="grid grid-cols-2 gap-3">
                  {/* Original */}
                  <div className="rounded-lg border border-spine-border overflow-hidden bg-spine-bg">
                    <div className="text-[10px] font-mono text-spine-text-secondary tracking-widest p-2 text-center border-b border-spine-border">
                      ORIGINAL
                    </div>
                    <div className="h-[170px] flex items-center justify-center">
                      {imageUrl ? (
                        <img src={imageUrl} alt={`Scan ${index + 1}`} className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-xs font-mono text-spine-text-secondary">No image</span>
                      )}
                    </div>
                  </div>

                  {/* Heatmap */}
                  <div className="rounded-lg border border-spine-border overflow-hidden bg-spine-bg">
                    <div className="text-[10px] font-mono text-spine-text-secondary tracking-widest p-2 text-center border-b border-spine-border">
                      HEATMAP (Grad-CAM)
                    </div>
                    <div className="h-[170px] flex items-center justify-center">
                      {result.heatmapBase64 ? (
                        <img
                          src={result.heatmapBase64}
                          alt={`Heatmap ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-spine-text-secondary">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="M21 15l-5-5L5 21" />
                          </svg>
                          <span className="text-[10px] font-mono">Not available</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Overlay view */
                <div className="space-y-3">
                  <div className="relative rounded-lg border border-spine-border overflow-hidden bg-spine-bg h-[220px]">
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={`Scan ${index + 1}`}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    )}
                    {result.heatmapBase64 && (
                      <img
                        src={result.heatmapBase64}
                        alt={`Heatmap ${index + 1}`}
                        className="absolute inset-0 h-full w-full object-cover"
                        style={{ opacity: overlayOpacity }}
                      />
                    )}
                    {!imageUrl && !result.heatmapBase64 && (
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-mono text-spine-text-secondary">
                        No images available
                      </div>
                    )}
                  </div>

                  {/* Opacity slider */}
                  <div className="flex items-center gap-3 px-2">
                    <span className="text-[10px] font-mono text-spine-text-secondary whitespace-nowrap">Original</span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={overlayOpacity}
                      onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))}
                      className="flex-1 h-1 accent-spine-primary cursor-pointer"
                    />
                    <span className="text-[10px] font-mono text-spine-text-secondary whitespace-nowrap">Heatmap</span>
                  </div>
                </div>
              )}

              {/* Confidence badge */}
              <div className="flex justify-center">
                <ConfidenceBadge status={result.confidenceStatus} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
