import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Disclaimer from '../components/Disclaimer';
import { analyzeAllImages } from '../services/analysisService';
import ShaderBackground from '../components/ui/ShaderBackground';
import FloatingParticles from '../components/ui/FloatingParticles';

export default function UploadPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state?.patient;

  const [scanCount, setScanCount] = useState(null);
  const [files, setFiles] = useState([]);      // File[]
  const [previews, setPreviews] = useState([]); // string[] (object URLs)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fileInputRefs = useRef([]);

  // Initialize file slots when count is selected
  const handleCountSelect = (count) => {
    setScanCount(count);
    setFiles(new Array(count).fill(null));
    setPreviews(new Array(count).fill(null));
    setError(null);
  };

  // Handle file selection for a specific slot
  const handleFileSelect = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newFiles = [...files];
    newFiles[index] = file;
    setFiles(newFiles);

    const newPreviews = [...previews];
    if (newPreviews[index]) URL.revokeObjectURL(newPreviews[index]);
    newPreviews[index] = URL.createObjectURL(file);
    setPreviews(newPreviews);
  };

  const uploadedCount = files.filter(Boolean).length;
  const allUploaded = scanCount !== null && uploadedCount === scanCount;

  const handleAnalyze = async () => {
    if (!allUploaded) return;
    setLoading(true);
    setError(null);

    try {
      const results = await analyzeAllImages(files);
      navigate('/results', {
        state: {
          patient,
          results,
          imageUrls: previews,
        },
      });
    } catch (err) {
      console.error('Analysis failed:', err);
      setError(
        err.response?.data?.detail ||
        err.message ||
        'Analysis failed. Please check your connection and try again.'
      );
      setLoading(false);
    }
  };

  return (
    <div className="grid-bg min-h-screen relative z-0">
      <ShaderBackground />
      <FloatingParticles />
      {/* ── App Bar ── */}
      <div className="sticky top-0 z-50 bg-spine-surface/80 backdrop-blur-xl border-b border-spine-border">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo chip */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-spine-primary/10 border border-spine-primary/30">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2F81F7" strokeWidth="2">
                <path d="M12 2v4M12 18v4" />
                <rect x="8" y="6" width="8" height="4" rx="1" />
                <rect x="7" y="11" width="10" height="3" rx="1" />
                <rect x="8" y="15" width="8" height="3" rx="1" />
              </svg>
              <span className="text-sm font-bold gradient-text">SpineAI</span>
            </div>
            {/* Ready badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-spine-accent/10 border border-spine-accent/30">
              <span className="w-1.5 h-1.5 rounded-full bg-spine-accent animate-pulse" />
              <span className="text-[10px] font-mono font-semibold text-spine-accent tracking-wider">READY</span>
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
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="inline-block text-[10px] font-mono font-bold text-spine-primary tracking-[0.2em] bg-spine-primary/10 border border-spine-primary/30 rounded-full px-3 py-1 mb-3">
            MRI SCAN UPLOAD
          </span>
          <h1 className="text-3xl font-bold text-spine-text">MRI Analysis</h1>
        </motion.div>

        {/* ── Step 01: Scan Count ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-spine-surface border border-spine-border rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-mono font-bold text-spine-primary">STEP 01</span>
            <span className="text-xs font-mono text-spine-text-secondary">— SELECT SCAN COUNT</span>
          </div>

          <div className="flex gap-3 justify-center">
            {[1, 2, 3, 4, 5].map((n) => (
              <motion.button
                key={n}
                animate={scanCount === n ? { scale: 1.05 } : { scale: 1 }}
                style={scanCount === n ? { boxShadow: '0 0 20px rgba(47,129,247,0.35)' } : {}}
                onClick={() => handleCountSelect(n)}
                className={`
                  w-14 h-14 rounded-xl font-mono text-lg font-bold transition-colors cursor-pointer border-2
                  ${scanCount === n
                    ? 'border-spine-primary bg-spine-primary/10 text-spine-primary'
                    : 'border-spine-border bg-spine-surface-light text-spine-text-secondary hover:border-spine-text-secondary hover:bg-spine-border/30'
                  }
                `}
              >
                {n}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ── Step 02: Upload Slots ── */}
        <AnimatePresence>
          {scanCount !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="bg-spine-surface border border-spine-border rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-spine-primary">STEP 02</span>
                  <span className="text-xs font-mono text-spine-text-secondary">— UPLOAD MRI SCANS</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: scanCount }, (_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <input
                        ref={el => fileInputRefs.current[i] = el}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(i, e)}
                        className="hidden"
                        id={`scan-upload-${i}`}
                      />

                      {previews[i] ? (
                        /* ── Filled Slot ── */
                        <div
                          onClick={() => fileInputRefs.current[i]?.click()}
                          className="relative rounded-xl border border-spine-primary/30 overflow-hidden cursor-pointer group h-48 bg-spine-bg"
                        >
                          {/* Image */}
                          <img
                            src={previews[i]}
                            alt={`Scan ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {/* Scan line */}
                          <div className="absolute left-0 right-0 h-[2px] z-20" style={{ background: 'linear-gradient(90deg, transparent, #2F81F7, transparent)', animation: 'scanLine 2.5s ease-in-out infinite' }} />
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-spine-bg/20 group-hover:bg-spine-bg/40 transition-colors z-10" />
                          {/* Corner brackets */}
                          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-spine-primary z-20 m-2" />
                          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-spine-primary z-20 m-2" />
                          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-spine-primary z-20 m-2" />
                          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-spine-primary z-20 m-2" />
                          {/* Badges */}
                          <div className="absolute top-3 left-3 text-[9px] font-mono font-bold bg-spine-primary/90 text-white px-2 py-0.5 rounded z-20">
                            SCAN {String(i + 1).padStart(2, '0')}
                          </div>
                          <div className="absolute top-3 right-3 text-[9px] font-mono font-bold bg-spine-surface/80 text-spine-text-secondary px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            CHANGE
                          </div>
                          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[9px] font-mono font-bold bg-spine-accent/90 text-white px-2 py-0.5 rounded z-20">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            IMAGE LOADED
                          </div>
                        </div>
                      ) : (
                        /* ── Empty Slot ── */
                        <div
                          onClick={() => fileInputRefs.current[i]?.click()}
                          className="relative h-48 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-spine-surface-light/30 transition-colors bg-spine-surface-light/10"
                          style={{ animation: 'borderOpacity 2s infinite ease-in-out' }}
                        >
                          <div className="w-10 h-10 rounded-full bg-spine-surface-light flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B949E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                              <polyline points="17 8 12 3 7 8" />
                              <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                          </div>
                          <div className="text-center">
                            <div className="text-xs font-mono font-bold text-spine-text-secondary">
                              SCAN {String(i + 1).padStart(2, '0')}
                            </div>
                            <div className="text-[10px] font-mono text-spine-text-secondary/70 mt-0.5">
                              CLICK TO UPLOAD
                            </div>
                          </div>
                          {/* Corner brackets */}
                          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-spine-primary m-2 opacity-50" />
                          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-spine-primary m-2 opacity-50" />
                          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-spine-primary m-2 opacity-50" />
                          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-spine-primary m-2 opacity-50" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Upload progress */}
                {!allUploaded && (
                  <p className="text-xs font-mono text-spine-text-secondary text-center mt-3">
                    {uploadedCount} of {scanCount} scans uploaded
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Error ── */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-spine-danger/10 border border-spine-danger/30 rounded-xl p-4 text-sm text-spine-danger font-mono"
          >
            {error}
          </motion.div>
        )}

        {/* ── Analyze Button ── */}
        {scanCount !== null && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              boxShadow: allUploaded && !loading 
                ? ['0 0 0px rgba(47,129,247,0.4)', '0 0 30px rgba(47,129,247,0.7)', '0 0 0px rgba(47,129,247,0.4)'] 
                : 'none'
            }}
            transition={allUploaded && !loading ? { boxShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" } } : {}}
            onClick={handleAnalyze}
            disabled={!allUploaded || loading}
            whileHover={allUploaded && !loading ? { scale: 1.01 } : {}}
            whileTap={allUploaded && !loading ? { scale: 0.99 } : {}}
            className={`
              w-full py-4 rounded-xl font-semibold text-sm tracking-wider transition-all
              flex items-center justify-center gap-3 cursor-pointer
              ${allUploaded && !loading
                ? 'bg-spine-primary text-white hover:bg-spine-primary/90'
                : 'bg-spine-border/50 text-spine-text-secondary cursor-not-allowed'
              }
            `}
          >
            {loading ? (
              <>
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                ANALYZING ALL SCANS...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                ANALYZE ALL SCANS
              </>
            )}
          </motion.button>
        )}

        {/* ── Disclaimer ── */}
        <Disclaimer />
      </div>
    </div>
  );
}
