import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ShaderBackground from '../components/ui/ShaderBackground';
import FloatingParticles from '../components/ui/FloatingParticles';

const leftStats = [
  { label: 'SYSTEM', value: 'READY', color: '#3FB950' },
  { label: 'MODEL', value: 'ResNet50', color: '#E6EDF3' },
  { label: 'TYPE', value: 'CNN', color: '#E6EDF3' },
  { label: 'STATUS', value: 'ONLINE', color: '#3FB950' },
];

const rightStats = [
  { label: 'VERSION', value: 'v1.0.0', color: '#E6EDF3' },
  { label: 'ACCURACY', value: '94.3%', color: '#3FB950' },
  { label: 'PARAMS', value: '25M', color: '#E6EDF3' },
  { label: 'DATASET', value: 'RSNA', color: '#E6EDF3' },
];

export default function SplashPage() {
  const navigate = useNavigate();

  return (
    <div
      className="grid-bg min-h-screen flex items-center justify-center relative cursor-pointer select-none overflow-hidden"
      onClick={() => navigate('/patient-details')}
    >
      <ShaderBackground />
      <FloatingParticles />
      {/* ── Left Stats Panel ── */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4"
      >
        {leftStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + i * 0.15 }}
            className="flex items-center gap-3"
          >
            <span className="text-[10px] font-mono text-spine-text-secondary tracking-widest w-16 text-right">
              {stat.label}
            </span>
            <div className="w-px h-4 bg-spine-border" />
            <span className="text-xs font-mono font-semibold" style={{ color: stat.color }}>
              {stat.value}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Right Stats Panel ── */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4"
      >
        {rightStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + i * 0.15 }}
            className="flex items-center gap-3"
          >
            <span className="text-[10px] font-mono text-spine-text-secondary tracking-widest w-16 text-right">
              {stat.label}
            </span>
            <div className="w-px h-4 bg-spine-border" />
            <span className="text-xs font-mono font-semibold" style={{ color: stat.color }}>
              {stat.value}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Center — Pulsing Hub + Logo ── */}
      <div className="flex flex-col items-center gap-8">
        {/* Pulsing rings */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* Outer pulse ring */}
          <div
            className="absolute inset-0 rounded-full border border-spine-primary/40"
            style={{ animation: 'pulse-ring 2s infinite ease-out' }}
          />
          {/* Middle pulse ring */}
          <div
            className="absolute inset-0 rounded-full border border-spine-primary/40"
            style={{ animation: 'pulse-ring 2s infinite ease-out 0.75s' }}
          />
          {/* Inner circle */}
          <div
            className="w-24 h-24 rounded-full border-2 border-spine-primary/50 bg-spine-primary/5 flex items-center justify-center relative overflow-hidden z-10"
          >
            {/* Scan line */}
            <div className="scan-line" />
            {/* Hub icon (vertebra-like) */}
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2F81F7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v4M12 18v4" />
              <rect x="8" y="6" width="8" height="4" rx="1" />
              <rect x="7" y="11" width="10" height="3" rx="1" />
              <rect x="8" y="15" width="8" height="3" rx="1" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-5xl md:text-6xl font-extrabold gradient-text tracking-tight"
          >
            Spine AI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-sm font-mono text-spine-text-secondary mt-3 tracking-wider"
          >
            ADVANCED SPINAL MRI ANALYSIS
          </motion.p>
        </div>
      </div>

      {/* ── Bottom — Click to continue ── */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2"
        style={{ animation: 'blink 1s infinite alternate' }}
      >
        <span className="w-2 h-2 rounded-full bg-spine-accent" />
        <span className="text-xs font-mono text-spine-text-secondary tracking-[0.15em]">
          CLICK ANYWHERE TO CONTINUE
        </span>
      </div>

      {/* ── Corner decorations ── */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-spine-primary/30" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-spine-primary/30" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-spine-primary/30" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-spine-primary/30" />
    </div>
  );
}
