import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import RiskRing from '../components/RiskRing';
import PredictionCard from '../components/PredictionCard';
import RiskScoreCard from '../components/RiskScoreCard';
import ConfidenceBadge from '../components/ConfidenceBadge';
import ScanTimeline from '../components/ScanTimeline';
import SummaryGrid from '../components/SummaryGrid';
import ScanCard from '../components/ScanCard';
import Disclaimer from '../components/Disclaimer';
import { getRiskColor } from '../constants/colors';
import ShaderBackground from '../components/ui/ShaderBackground';
import FloatingParticles from '../components/ui/FloatingParticles';

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { patient, results = [], imageUrls = [] } = location.state || {};

  // Derived data
  const scores = results.map(r => r.riskScore);
  const worstIndex = scores.indexOf(Math.max(...scores));
  const worstScore = scores[worstIndex] ?? 0;
  const hasInjury = results.some(r => r.prediction === 'Injury');
  const flaggedCount = results.filter(r => r.prediction === 'Injury').length;
  const overallPrediction = hasInjury ? 'Injury' : 'Normal';
  const overallConfidence = results[worstIndex]?.confidenceStatus || 'Verified';

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  if (!results.length) {
    return (
      <div className="grid-bg min-h-screen flex items-center justify-center relative z-0">
        <ShaderBackground />
        <FloatingParticles />
        <div className="text-center space-y-4 relative z-10">
          <p className="text-spine-text-secondary font-mono">No results available.</p>
          <button
            onClick={() => navigate('/upload')}
            className="px-6 py-2 bg-spine-primary text-white rounded-lg font-mono text-sm cursor-pointer"
          >
            Go to Upload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid-bg min-h-screen relative z-0">
      <ShaderBackground />
      <FloatingParticles />
      {/* ── App Bar ── */}
      <div className="sticky top-0 z-50 bg-spine-surface/80 backdrop-blur-xl border-b border-spine-border">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-spine-primary/10 border border-spine-primary/30">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2F81F7" strokeWidth="2">
                <path d="M12 2v4M12 18v4" />
                <rect x="8" y="6" width="8" height="4" rx="1" />
                <rect x="7" y="11" width="10" height="3" rx="1" />
                <rect x="8" y="15" width="8" height="3" rx="1" />
              </svg>
              <span className="text-sm font-bold gradient-text">SpineAI</span>
            </div>
          </div>
          {patient && (
            <span className="text-xs font-mono text-spine-text-secondary">
              {patient.name} · {patient.age}y · {patient.gender}
            </span>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 relative z-10">

        {/* ════════════════════════════════════════════════════
            HERO HEADER CARD
            ════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-spine-surface border border-spine-border rounded-2xl p-6 overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-10 bg-spine-primary" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1 space-y-3">
              {/* Pill badge */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[10px] font-mono font-bold text-spine-primary tracking-[0.2em] bg-spine-primary/10 border border-spine-primary/30 rounded-full px-3 py-1">
                  AI ANALYSIS REPORT
                </span>
                <span className="text-[10px] font-mono text-spine-text-secondary bg-spine-surface-light border border-spine-border rounded-full px-3 py-1">
                  {dateStr} · {timeStr}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold gradient-text">
                Analysis Complete
              </h1>

              {/* Ghost pills */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[10px] font-mono text-spine-text-secondary bg-spine-surface-light border border-spine-border rounded-full px-3 py-1">
                  {results.length} scans processed
                </span>
                <span
                  className={`text-[10px] font-mono font-bold rounded-full px-3 py-1 border
                    ${hasInjury
                      ? 'bg-spine-danger/10 border-spine-danger/30 text-spine-danger'
                      : 'bg-spine-accent/10 border-spine-accent/30 text-spine-accent'
                    }
                  `}
                >
                  {hasInjury ? `${flaggedCount} FLAGGED` : 'ALL NORMAL'}
                </span>
              </div>
            </div>

            {/* Risk Ring */}
            <div className="flex-shrink-0">
              <RiskRing score={worstScore} size={90} strokeWidth={6} label="WORST RISK" />
            </div>
          </div>
        </motion.div>

        {/* ════════════════════════════════════════════════════
            SYSTEM SUMMARY
            ════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-xs font-mono text-spine-text-secondary tracking-widest mb-3">
            SYSTEM SUMMARY
          </div>
          <SummaryGrid results={results} worstIndex={worstIndex} />
        </motion.div>

        {/* ════════════════════════════════════════════════════
            SCAN TIMELINE
            ════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ScanTimeline results={results} worstIndex={worstIndex} />
        </motion.div>

        {/* ════════════════════════════════════════════════════
            OVERALL ASSESSMENT
            ════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="text-xs font-mono text-spine-text-secondary tracking-widest">
            OVERALL ASSESSMENT
          </div>

          {/* Prediction */}
          <PredictionCard prediction={overallPrediction} isOverall />

          {/* Tech Strip */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono font-bold px-3 py-1.5 rounded-lg bg-spine-surface border border-spine-border text-spine-text-secondary">
              MODEL · <span className="text-spine-text">ResNet50</span>
            </span>
            <ConfidenceBadge status={overallConfidence} />
            <span className="text-[10px] font-mono font-bold px-3 py-1.5 rounded-lg bg-spine-surface border border-spine-border text-spine-text-secondary">
              MODE · <span className="text-spine-text">MULTI-SCAN</span>
            </span>
          </div>

          {/* Risk Score */}
          <RiskScoreCard score={worstScore} label="OVERALL RISK SCORE" />
        </motion.div>

        {/* ════════════════════════════════════════════════════
            SCAN-BY-SCAN BREAKDOWN
            ════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <div className="text-xs font-mono text-spine-text-secondary tracking-widest">
            SCAN-BY-SCAN BREAKDOWN
          </div>

          {results.map((result, i) => (
            <ScanCard
              key={i}
              result={result}
              index={i}
              imageUrl={imageUrls[i]}
            />
          ))}
        </motion.div>

        {/* ── Disclaimer ── */}
        <Disclaimer />

        {/* ── Analyze Another Set ── */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate('/upload', { state: { patient } })}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full py-4 rounded-xl font-semibold text-sm tracking-wider bg-spine-primary text-white hover:bg-spine-primary/90 shadow-lg shadow-spine-primary/20 transition-all flex items-center justify-center gap-3 cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
          </svg>
          ANALYZE ANOTHER SET
        </motion.button>

        {/* Bottom spacing */}
        <div className="h-8" />
      </div>
    </div>
  );
}
