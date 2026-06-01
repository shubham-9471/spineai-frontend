import { Routes, Route, Navigate } from 'react-router-dom';
import SplashPage from './pages/SplashPage';
import PatientDetailsPage from './pages/PatientDetailsPage';
import UploadPage from './pages/UploadPage';
import ResultsPage from './pages/ResultsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/patient-details" element={<PatientDetailsPage />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
