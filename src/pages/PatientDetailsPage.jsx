import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ShaderBackground from '../components/ui/ShaderBackground';
import FloatingParticles from '../components/ui/FloatingParticles';

export default function PatientDetailsPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', age: '', gender: '' });
  const [touched, setTouched] = useState({});
  const [focused, setFocused] = useState(null);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setFocused(null);
  };

  const handleFocus = (field) => {
    setFocused(field);
  };

  // Validation
  const errors = {};
  if (!form.name.trim()) errors.name = 'Full name is required';
  if (!form.age) errors.age = 'Age is required';
  else if (Number(form.age) < 1 || Number(form.age) > 120) errors.age = 'Age must be 1–120';
  if (!form.gender) errors.gender = 'Please select a gender';

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) {
      setTouched({ name: true, age: true, gender: true });
      return;
    }
    navigate('/upload', {
      state: {
        patient: {
          name: form.name.trim(),
          age: Number(form.age),
          gender: form.gender,
        },
      },
    });
  };

  return (
    <div className="grid-bg min-h-screen flex items-center justify-center p-4 relative z-0">
      <ShaderBackground />
      <FloatingParticles />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="w-full max-w-md relative z-10"
      >
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ boxShadow: '0 0 60px 10px rgba(47,129,247,0.07)', animation: 'float 4s ease-in-out infinite' }}
        />
        {/* Card */}
        <div className="bg-spine-surface border border-spine-border rounded-2xl overflow-hidden shadow-2xl relative">
          {/* Header */}
          <div className="p-6 pb-4 border-b border-spine-border">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-spine-primary/10 border border-spine-primary/30 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2F81F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-spine-text">Patient Details</h1>
                <p className="text-sm text-spine-text-secondary mt-0.5">
                  Please enter your details before proceeding with the MRI analysis.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="patient-name" className="block text-xs font-mono text-spine-text-secondary tracking-widest mb-2">
                FULL NAME
              </label>
              <div className="relative overflow-hidden rounded-lg">
                <input
                  id="patient-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onFocus={() => handleFocus('name')}
                  onBlur={() => handleBlur('name')}
                  placeholder="Enter patient's full name"
                  className={`
                    w-full bg-spine-bg border px-4 py-3 text-sm text-spine-text
                    placeholder:text-spine-text-secondary/50 outline-none transition-all rounded-lg
                    focus:border-spine-primary focus:ring-1 focus:ring-spine-primary/30
                    ${touched.name && errors.name ? 'border-spine-danger' : 'border-spine-border'}
                  `}
                />
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: focused === 'name' ? 1 : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="absolute left-0 top-0 h-full w-[2px] bg-spine-primary origin-top"
                />
              </div>
              {touched.name && errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-spine-danger mt-1.5 font-mono"
                >
                  {errors.name}
                </motion.p>
              )}
            </div>

            {/* Age */}
            <div>
              <label htmlFor="patient-age" className="block text-xs font-mono text-spine-text-secondary tracking-widest mb-2">
                AGE
              </label>
              <div className="relative overflow-hidden rounded-lg">
                <input
                  id="patient-age"
                  type="number"
                  min="1"
                  max="120"
                  value={form.age}
                  onChange={(e) => handleChange('age', e.target.value)}
                  onFocus={() => handleFocus('age')}
                  onBlur={() => handleBlur('age')}
                  placeholder="Enter age (1–120)"
                  className={`
                    w-full bg-spine-bg border px-4 py-3 text-sm text-spine-text
                    placeholder:text-spine-text-secondary/50 outline-none transition-all rounded-lg
                    focus:border-spine-primary focus:ring-1 focus:ring-spine-primary/30
                    [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                    ${touched.age && errors.age ? 'border-spine-danger' : 'border-spine-border'}
                  `}
                />
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: focused === 'age' ? 1 : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="absolute left-0 top-0 h-full w-[2px] bg-spine-primary origin-top"
                />
              </div>
              {touched.age && errors.age && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-spine-danger mt-1.5 font-mono"
                >
                  {errors.age}
                </motion.p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="patient-gender" className="block text-xs font-mono text-spine-text-secondary tracking-widest mb-2">
                GENDER
              </label>
              <div className="relative overflow-hidden rounded-lg">
                <select
                  id="patient-gender"
                  value={form.gender}
                  onChange={(e) => handleChange('gender', e.target.value)}
                  onFocus={() => handleFocus('gender')}
                  onBlur={() => handleBlur('gender')}
                  className={`
                    w-full bg-spine-bg border px-4 py-3 text-sm text-spine-text
                    outline-none transition-all cursor-pointer rounded-lg
                    focus:border-spine-primary focus:ring-1 focus:ring-spine-primary/30
                    ${!form.gender ? 'text-spine-text-secondary/50' : ''}
                    ${touched.gender && errors.gender ? 'border-spine-danger' : 'border-spine-border'}
                  `}
                >
                  <option value="" disabled>Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: focused === 'gender' ? 1 : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="absolute left-0 top-0 h-full w-[2px] bg-spine-primary origin-top"
                />
              </div>
              {touched.gender && errors.gender && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-spine-danger mt-1.5 font-mono"
                >
                  {errors.gender}
                </motion.p>
              )}
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={!isValid}
              whileHover={isValid ? { scale: 1.01 } : {}}
              whileTap={isValid ? { scale: 0.99 } : {}}
              className={`
                w-full py-3.5 rounded-lg font-semibold text-sm tracking-wide transition-all
                flex items-center justify-center gap-2 cursor-pointer
                ${isValid
                  ? 'bg-spine-primary text-white hover:bg-spine-primary/90 shadow-lg shadow-spine-primary/20'
                  : 'bg-spine-border text-spine-text-secondary cursor-not-allowed'
                }
              `}
            >
              Continue
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
