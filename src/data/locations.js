// Mock location data for NER region villages, roads, and infrastructure
// All coordinates are approximate real-world positions for the NER states

export const NER_STATES = [
  'All States', 'Assam', 'Meghalaya', 'Mizoram', 'Manipur',
  'Nagaland', 'Tripura', 'Arunachal Pradesh', 'Sikkim'
];

export const RISK_LEVELS = ['All Levels', 'Low', 'Moderate', 'High', 'Severe'];
export const CATEGORIES = ['All Categories', 'Village', 'Road', 'Infrastructure'];

export const locations = [
  // Assam
  { id: 1,  name: 'Guwahati North', state: 'Assam', district: 'Kamrup', lat: 26.22, lng: 91.75, category: 'Village', riskScore: 28, riskLevel: 'Low',      rainfall: 12, soilMoisture: 42, slopeAngle: 18, roadStatus: 'Open',       lastUpdated: '2 min ago', population: 4200, elevation: 55   },
  { id: 2,  name: 'Silchar Hill Zone', state: 'Assam', district: 'Cachar', lat: 24.83, lng: 92.79, category: 'Village', riskScore: 71, riskLevel: 'High',     rainfall: 87, soilMoisture: 78, slopeAngle: 42, roadStatus: 'Restricted', lastUpdated: '5 min ago', population: 1800, elevation: 310  },
  { id: 3,  name: 'Haflong Road Cut', state: 'Assam', district: 'Dima Hasao', lat: 25.17, lng: 93.02, category: 'Road', riskScore: 88, riskLevel: 'Severe', rainfall: 124, soilMoisture: 91, slopeAngle: 55, roadStatus: 'Blocked',    lastUpdated: '1 min ago', population: 0,    elevation: 680  },
  { id: 4,  name: 'Diphu Settlement', state: 'Assam', district: 'Karbi Anglong', lat: 25.84, lng: 93.43, category: 'Village', riskScore: 52, riskLevel: 'Moderate', rainfall: 48, soilMoisture: 65, slopeAngle: 31, roadStatus: 'Open', lastUpdated: '8 min ago', population: 3100, elevation: 420 },
  { id: 5,  name: 'Bomdila Bridge', state: 'Assam', district: 'Sonitpur', lat: 26.71, lng: 92.34, category: 'Infrastructure', riskScore: 38, riskLevel: 'Low', rainfall: 22, soilMoisture: 50, slopeAngle: 12, roadStatus: 'Open', lastUpdated: '3 min ago', population: 0, elevation: 180 },

  // Meghalaya
  { id: 6,  name: 'Cherrapunji Village', state: 'Meghalaya', district: 'East Khasi Hills', lat: 25.27, lng: 91.72, category: 'Village', riskScore: 85, riskLevel: 'Severe', rainfall: 198, soilMoisture: 94, slopeAngle: 48, roadStatus: 'Restricted', lastUpdated: '1 min ago', population: 2200, elevation: 1290 },
  { id: 7,  name: 'Shillong East Ridge', state: 'Meghalaya', district: 'East Khasi Hills', lat: 25.58, lng: 91.93, category: 'Village', riskScore: 61, riskLevel: 'High', rainfall: 72, soilMoisture: 74, slopeAngle: 37, roadStatus: 'Open', lastUpdated: '4 min ago', population: 5600, elevation: 1490 },
  { id: 8,  name: 'Nongpoh-Jorabat Highway', state: 'Meghalaya', district: 'Ri Bhoi', lat: 25.89, lng: 91.88, category: 'Road', riskScore: 74, riskLevel: 'High', rainfall: 91, soilMoisture: 82, slopeAngle: 44, roadStatus: 'Restricted', lastUpdated: '2 min ago', population: 0, elevation: 520 },
  { id: 9,  name: 'Tura Foothill Community', state: 'Meghalaya', district: 'West Garo Hills', lat: 25.51, lng: 90.22, category: 'Village', riskScore: 44, riskLevel: 'Moderate', rainfall: 38, soilMoisture: 60, slopeAngle: 27, roadStatus: 'Open', lastUpdated: '10 min ago', population: 1900, elevation: 290 },
  { id: 10, name: 'Jowai Slope Village', state: 'Meghalaya', district: 'Jaintia Hills', lat: 25.44, lng: 92.20, category: 'Village', riskScore: 68, riskLevel: 'High', rainfall: 82, soilMoisture: 76, slopeAngle: 40, roadStatus: 'Open', lastUpdated: '6 min ago', population: 1400, elevation: 1050 },

  // Mizoram
  { id: 11, name: 'Aizawl West Quarter', state: 'Mizoram', district: 'Aizawl', lat: 23.72, lng: 92.72, category: 'Village', riskScore: 79, riskLevel: 'High', rainfall: 102, soilMoisture: 86, slopeAngle: 51, roadStatus: 'Restricted', lastUpdated: '3 min ago', population: 3800, elevation: 1130 },
  { id: 12, name: 'Champhai Border Road', state: 'Mizoram', district: 'Champhai', lat: 23.45, lng: 93.33, category: 'Road', riskScore: 91, riskLevel: 'Severe', rainfall: 148, soilMoisture: 95, slopeAngle: 58, roadStatus: 'Blocked', lastUpdated: '1 min ago', population: 0, elevation: 1470 },
  { id: 13, name: 'Lunglei Hill Village', state: 'Mizoram', district: 'Lunglei', lat: 22.89, lng: 92.73, category: 'Village', riskScore: 55, riskLevel: 'Moderate', rainfall: 58, soilMoisture: 68, slopeAngle: 33, roadStatus: 'Open', lastUpdated: '7 min ago', population: 2100, elevation: 840 },
  { id: 14, name: 'Kolasib Retaining Wall', state: 'Mizoram', district: 'Kolasib', lat: 24.22, lng: 92.68, category: 'Infrastructure', riskScore: 67, riskLevel: 'High', rainfall: 76, soilMoisture: 79, slopeAngle: 45, roadStatus: 'Open', lastUpdated: '5 min ago', population: 0, elevation: 450 },

  // Manipur
  { id: 15, name: 'Imphal Valley North', state: 'Manipur', district: 'Imphal West', lat: 24.82, lng: 93.94, category: 'Village', riskScore: 32, riskLevel: 'Low', rainfall: 18, soilMoisture: 44, slopeAngle: 8, roadStatus: 'Open', lastUpdated: '12 min ago', population: 6200, elevation: 790 },
  { id: 16, name: 'Senapati Hill Community', state: 'Manipur', district: 'Senapati', lat: 25.27, lng: 94.00, category: 'Village', riskScore: 73, riskLevel: 'High', rainfall: 94, soilMoisture: 83, slopeAngle: 46, roadStatus: 'Restricted', lastUpdated: '3 min ago', population: 1700, elevation: 1380 },
  { id: 17, name: 'NH-2 Landslide Zone', state: 'Manipur', district: 'Kangpokpi', lat: 25.12, lng: 93.97, category: 'Road', riskScore: 89, riskLevel: 'Severe', rainfall: 136, soilMoisture: 92, slopeAngle: 54, roadStatus: 'Blocked', lastUpdated: '2 min ago', population: 0, elevation: 1120 },
  { id: 18, name: 'Ukhrul Remote Village', state: 'Manipur', district: 'Ukhrul', lat: 25.11, lng: 94.36, category: 'Village', riskScore: 58, riskLevel: 'Moderate', rainfall: 62, soilMoisture: 70, slopeAngle: 38, roadStatus: 'Open', lastUpdated: '9 min ago', population: 980, elevation: 1720 },
  { id: 19, name: 'Churachandpur Bridge', state: 'Manipur', district: 'Churachandpur', lat: 24.34, lng: 93.68, category: 'Infrastructure', riskScore: 46, riskLevel: 'Moderate', rainfall: 42, soilMoisture: 58, slopeAngle: 22, roadStatus: 'Open', lastUpdated: '6 min ago', population: 0, elevation: 920 },

  // Nagaland
  { id: 20, name: 'Kohima Ridge Settlement', state: 'Nagaland', district: 'Kohima', lat: 25.67, lng: 94.11, category: 'Village', riskScore: 62, riskLevel: 'High', rainfall: 74, soilMoisture: 77, slopeAngle: 43, roadStatus: 'Open', lastUpdated: '4 min ago', population: 3400, elevation: 1445 },
  { id: 21, name: 'Dimapur Plains Road', state: 'Nagaland', district: 'Dimapur', lat: 25.91, lng: 93.73, category: 'Road', riskScore: 24, riskLevel: 'Low', rainfall: 8, soilMoisture: 35, slopeAngle: 6, roadStatus: 'Open', lastUpdated: '15 min ago', population: 0, elevation: 230 },
  { id: 22, name: 'Mokokchung Hilltop', state: 'Nagaland', district: 'Mokokchung', lat: 26.33, lng: 94.52, category: 'Village', riskScore: 70, riskLevel: 'High', rainfall: 88, soilMoisture: 80, slopeAngle: 47, roadStatus: 'Restricted', lastUpdated: '5 min ago', population: 2600, elevation: 1320 },
  { id: 23, name: 'Phek Village Cluster', state: 'Nagaland', district: 'Phek', lat: 25.67, lng: 94.46, category: 'Village', riskScore: 41, riskLevel: 'Moderate', rainfall: 34, soilMoisture: 55, slopeAngle: 28, roadStatus: 'Open', lastUpdated: '8 min ago', population: 1200, elevation: 1080 },

  // Tripura
  { id: 24, name: 'Agartala Foothills', state: 'Tripura', district: 'West Tripura', lat: 23.84, lng: 91.28, category: 'Village', riskScore: 36, riskLevel: 'Low', rainfall: 24, soilMoisture: 48, slopeAngle: 14, roadStatus: 'Open', lastUpdated: '10 min ago', population: 5100, elevation: 42 },
  { id: 25, name: 'Dhalai Hill Road', state: 'Tripura', district: 'Dhalai', lat: 24.08, lng: 91.82, category: 'Road', riskScore: 83, riskLevel: 'Severe', rainfall: 118, soilMoisture: 88, slopeAngle: 52, roadStatus: 'Blocked', lastUpdated: '1 min ago', population: 0, elevation: 680 },
  { id: 26, name: 'Kailashahar Village', state: 'Tripura', district: 'Unakoti', lat: 24.33, lng: 92.00, category: 'Village', riskScore: 57, riskLevel: 'Moderate', rainfall: 61, soilMoisture: 69, slopeAngle: 35, roadStatus: 'Open', lastUpdated: '7 min ago', population: 1800, elevation: 310 },

  // Arunachal Pradesh
  { id: 27, name: 'Itanagar Hillside', state: 'Arunachal Pradesh', district: 'Papum Pare', lat: 27.09, lng: 93.62, category: 'Village', riskScore: 66, riskLevel: 'High', rainfall: 79, soilMoisture: 75, slopeAngle: 41, roadStatus: 'Open', lastUpdated: '4 min ago', population: 4800, elevation: 310 },
  { id: 28, name: 'Siang River Road', state: 'Arunachal Pradesh', district: 'East Siang', lat: 28.22, lng: 95.33, category: 'Road', riskScore: 78, riskLevel: 'High', rainfall: 97, soilMoisture: 84, slopeAngle: 49, roadStatus: 'Restricted', lastUpdated: '2 min ago', population: 0, elevation: 480 },
  { id: 29, name: 'Tawang Remote Community', state: 'Arunachal Pradesh', district: 'Tawang', lat: 27.59, lng: 91.87, category: 'Village', riskScore: 49, riskLevel: 'Moderate', rainfall: 44, soilMoisture: 62, slopeAngle: 29, roadStatus: 'Open', lastUpdated: '11 min ago', population: 890, elevation: 3320 },
  { id: 30, name: 'Bomdila Hill Station', state: 'Arunachal Pradesh', district: 'West Kameng', lat: 27.26, lng: 92.42, category: 'Village', riskScore: 53, riskLevel: 'Moderate', rainfall: 52, soilMoisture: 66, slopeAngle: 32, roadStatus: 'Open', lastUpdated: '9 min ago', population: 2300, elevation: 2530 },
  { id: 31, name: 'Ziro Valley Infrastructure', state: 'Arunachal Pradesh', district: 'Lower Subansiri', lat: 27.55, lng: 93.83, category: 'Infrastructure', riskScore: 30, riskLevel: 'Low', rainfall: 14, soilMoisture: 46, slopeAngle: 11, roadStatus: 'Open', lastUpdated: '14 min ago', population: 0, elevation: 1560 },

  // Sikkim
  { id: 32, name: 'Gangtok East Slope', state: 'Sikkim', district: 'East Sikkim', lat: 27.33, lng: 88.62, category: 'Village', riskScore: 76, riskLevel: 'High', rainfall: 98, soilMoisture: 85, slopeAngle: 48, roadStatus: 'Restricted', lastUpdated: '3 min ago', population: 3200, elevation: 1620 },
  { id: 33, name: 'NH-10 Teesta Valley', state: 'Sikkim', district: 'South Sikkim', lat: 27.18, lng: 88.49, category: 'Road', riskScore: 93, riskLevel: 'Severe', rainfall: 162, soilMoisture: 96, slopeAngle: 60, roadStatus: 'Blocked', lastUpdated: '1 min ago', population: 0, elevation: 520 },
  { id: 34, name: 'Namchi Hill Village', state: 'Sikkim', district: 'South Sikkim', lat: 27.17, lng: 88.36, category: 'Village', riskScore: 60, riskLevel: 'High', rainfall: 71, soilMoisture: 74, slopeAngle: 40, roadStatus: 'Open', lastUpdated: '5 min ago', population: 1600, elevation: 1430 },
  { id: 35, name: 'Mangan Retaining Wall', state: 'Sikkim', district: 'North Sikkim', lat: 27.51, lng: 88.53, category: 'Infrastructure', riskScore: 82, riskLevel: 'Severe', rainfall: 114, soilMoisture: 90, slopeAngle: 53, roadStatus: 'Restricted', lastUpdated: '2 min ago', population: 0, elevation: 970 },

  // Extra locations for density
  { id: 36, name: 'Bongaigaon Slope', state: 'Assam', district: 'Bongaigaon', lat: 26.48, lng: 90.56, category: 'Village', riskScore: 43, riskLevel: 'Moderate', rainfall: 37, soilMoisture: 58, slopeAngle: 24, roadStatus: 'Open', lastUpdated: '8 min ago', population: 2700, elevation: 48 },
  { id: 37, name: 'Meghalaya Highway KM 42', state: 'Meghalaya', district: 'East Jaintia Hills', lat: 25.28, lng: 92.54, category: 'Road', riskScore: 86, riskLevel: 'Severe', rainfall: 128, soilMoisture: 93, slopeAngle: 56, roadStatus: 'Blocked', lastUpdated: '1 min ago', population: 0, elevation: 780 },
  { id: 38, name: 'Lawngtlai Hill Village', state: 'Mizoram', district: 'Lawngtlai', lat: 22.53, lng: 92.90, category: 'Village', riskScore: 47, riskLevel: 'Moderate', rainfall: 43, soilMoisture: 61, slopeAngle: 30, roadStatus: 'Open', lastUpdated: '10 min ago', population: 1100, elevation: 560 },
  { id: 39, name: 'Mon District Road', state: 'Nagaland', district: 'Mon', lat: 26.74, lng: 95.00, category: 'Road', riskScore: 69, riskLevel: 'High', rainfall: 84, soilMoisture: 78, slopeAngle: 43, roadStatus: 'Restricted', lastUpdated: '4 min ago', population: 0, elevation: 440 },
  { id: 40, name: 'Sabroom Lowland Village', state: 'Tripura', district: 'South Tripura', lat: 23.09, lng: 91.61, category: 'Village', riskScore: 22, riskLevel: 'Low', rainfall: 6, soilMoisture: 38, slopeAngle: 5, roadStatus: 'Open', lastUpdated: '18 min ago', population: 3900, elevation: 28 },
];

export const getRiskColor = (level) => {
  switch(level) {
    case 'Low':      return '#22c55e';
    case 'Moderate': return '#f59e0b';
    case 'High':     return '#f97316';
    case 'Severe':   return '#ef4444';
    default:         return '#94a3b8';
  }
};

export const getRiskBgClass = (level) => {
  switch(level) {
    case 'Low':      return 'badge-low';
    case 'Moderate': return 'badge-moderate';
    case 'High':     return 'badge-high';
    case 'Severe':   return 'badge-severe';
    default:         return 'bg-gray-100 text-gray-600';
  }
};

export const getRoadStatusClass = (status) => {
  switch(status) {
    case 'Open':       return 'bg-green-100 text-green-700';
    case 'Restricted': return 'bg-amber-100 text-amber-700';
    case 'Blocked':    return 'bg-red-100 text-red-700';
    default:           return 'bg-gray-100 text-gray-600';
  }
};

export const topPriorityLocations = locations
  .filter(l => l.riskLevel === 'Severe' || l.riskLevel === 'High')
  .sort((a, b) => b.riskScore - a.riskScore)
  .slice(0, 5);
