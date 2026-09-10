// Mock 72-hour rainfall and risk forecast data for various NER locations

export const forecastZones = [
  { id: 1, name: 'Cherrapunji Village', state: 'Meghalaya' },
  { id: 2, name: 'NH-10 Teesta Valley', state: 'Sikkim' },
  { id: 3, name: 'Champhai Border Road', state: 'Mizoram' },
  { id: 4, name: 'Aizawl West Quarter', state: 'Mizoram' },
  { id: 5, name: 'Haflong Road Cut', state: 'Assam' },
  { id: 6, name: 'Senapati Hill Community', state: 'Manipur' },
  { id: 7, name: 'Gangtok East Slope', state: 'Sikkim' },
];

// Generate 72-hour forecast data (hourly -> grouped into 6-hr blocks = 12 points)
export const generateForecastData = (baseRainfall, baseRisk) => {
  const times = [
    'Now', '+6h', '+12h', '+18h', '+24h', '+30h',
    '+36h', '+42h', '+48h', '+55h', '+60h', '+66h', '+72h'
  ];

  let rainfall = baseRainfall;
  let risk = baseRisk;

  return times.map((time, i) => {
    // Simulate weather pattern with some randomness
    const rainfallVariance = (Math.sin(i * 0.8) * 25) + (Math.random() * 15 - 7);
    const newRainfall = Math.max(0, Math.min(200, rainfall + rainfallVariance));
    const newRisk = Math.max(15, Math.min(98, risk + (newRainfall - rainfall) * 0.3 + (Math.random() * 6 - 3)));

    rainfall = newRainfall;
    risk = newRisk;

    return {
      time,
      rainfall: Math.round(newRainfall),
      risk: Math.round(newRisk),
      threshold: 70, // Alert threshold line
    };
  });
};

export const forecastDataSets = {
  1: generateForecastData(198, 85),
  2: generateForecastData(162, 93),
  3: generateForecastData(148, 91),
  4: generateForecastData(102, 79),
  5: generateForecastData(124, 88),
  6: generateForecastData(94,  73),
  7: generateForecastData(98,  76),
};

// Predictive analytics data per zone
export const analyticsData = {
  1: { riskProb: 87, factors: { rainfall: 92, soilSaturation: 88, slopeInstability: 72, historicalFreq: 78, vegetation: 45 } },
  2: { riskProb: 94, factors: { rainfall: 96, soilSaturation: 95, slopeInstability: 88, historicalFreq: 85, vegetation: 30 } },
  3: { riskProb: 91, factors: { rainfall: 94, soilSaturation: 90, slopeInstability: 82, historicalFreq: 70, vegetation: 40 } },
  4: { riskProb: 79, factors: { rainfall: 82, soilSaturation: 81, slopeInstability: 68, historicalFreq: 65, vegetation: 55 } },
  5: { riskProb: 88, factors: { rainfall: 90, soilSaturation: 87, slopeInstability: 78, historicalFreq: 74, vegetation: 42 } },
  6: { riskProb: 73, factors: { rainfall: 78, soilSaturation: 76, slopeInstability: 62, historicalFreq: 58, vegetation: 60 } },
  7: { riskProb: 76, factors: { rainfall: 80, soilSaturation: 79, slopeInstability: 65, historicalFreq: 62, vegetation: 50 } },
};
