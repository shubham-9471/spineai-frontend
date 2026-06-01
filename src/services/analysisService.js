import axios from 'axios';

const API_BASE = 'http://localhost:8000';

/**
 * Send a single MRI image to the backend for analysis.
 * @param {File} imageFile - The image file to analyze
 * @returns {Promise<Object>} Analysis result
 */
export const analyzeImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await axios.post(`${API_BASE}/analyze`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 60000,
  });

  return {
    prediction: response.data.prediction,
    riskScore: response.data.risk_score,
    confidenceStatus: response.data.confidence_status,
    heatmapBase64: response.data.heatmap_image || null,
  };
};

/**
 * Analyze multiple images sequentially.
 * @param {File[]} imageFiles - Array of image files
 * @returns {Promise<Object[]>} Array of analysis results
 */
export const analyzeAllImages = async (imageFiles) => {
  const results = [];
  for (const file of imageFiles) {
    const result = await analyzeImage(file);
    results.push(result);
  }
  return results;
};
