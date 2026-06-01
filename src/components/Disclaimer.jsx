/**
 * Yellow-tinted disclaimer box with info icon.
 */
export default function Disclaimer() {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-spine-warning/30 bg-spine-warning/5 p-4">
      {/* Info icon */}
      <svg
        className="w-5 h-5 text-spine-warning shrink-0 mt-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
      <p className="text-xs text-spine-warning/90 leading-relaxed">
        This tool is for <strong>research purposes only</strong>. Not a substitute for professional medical diagnosis.
        Always consult a qualified healthcare provider for medical decisions.
      </p>
    </div>
  );
}
