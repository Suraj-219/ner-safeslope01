import { initialReports } from './reports';

const STORAGE_KEY = 'ner-safeslope-reports';

export function loadReports() {
  if (typeof window === 'undefined') return initialReports;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return initialReports;
    const reports = JSON.parse(stored);
    return Array.isArray(reports) ? reports : initialReports;
  } catch {
    return initialReports;
  }
}

export function saveReports(reports) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
}

export function createLocationFromReport(report, index) {
  const riskScore = report.incidentType === 'Road Block' ? 82 : 68;
  const riskLevel = riskScore >= 80 ? 'Severe' : 'High';
  const [locationName, state = 'NER'] = report.location.split(', ');

  return {
    id: `report-${report.id || index}`,
    name: `${locationName} (Field Report)`,
    state,
    district: 'Field Report',
    lat: Number(report.lat) || 25.5,
    lng: Number(report.lng) || 92.5,
    category: report.incidentType === 'Road Block' ? 'Road' : 'Infrastructure',
    riskScore,
    riskLevel,
    rainfall: 0,
    soilMoisture: 0,
    slopeAngle: 0,
    roadStatus: report.incidentType === 'Road Block' ? 'Blocked' : 'Restricted',
    lastUpdated: report.timeAgo || 'Just now',
    population: 0,
    elevation: 0,
    reportId: report.id,
  };
}
