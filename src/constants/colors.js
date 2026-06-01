// SpineAI Color Constants
export const colors = {
  background:    '#0D1117',
  surface:       '#161B22',
  surfaceLight:  '#1C2128',
  border:        '#30363D',
  primary:       '#2F81F7',
  primaryLight:  '#79C0FF',
  accent:        '#3FB950',
  danger:        '#F85149',
  warning:       '#D29922',
  textPrimary:   '#E6EDF3',
  textSecondary: '#8B949E',
};

export const getRiskColor = (score) => {
  if (score < 40) return colors.accent;
  if (score < 70) return colors.warning;
  return colors.danger;
};

export const getRiskLabel = (score) => {
  if (score < 40) return 'LOW';
  if (score < 70) return 'MODERATE';
  return 'HIGH';
};

export const getRiskTailwind = (score) => {
  if (score < 40) return 'risk-green';
  if (score < 70) return 'risk-yellow';
  return 'risk-red';
};

export const getRiskBgTailwind = (score) => {
  if (score < 40) return 'risk-bg-green';
  if (score < 70) return 'risk-bg-yellow';
  return 'risk-bg-red';
};
