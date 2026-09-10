import { useState } from 'react';
import {
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar, Tooltip as RTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell
} from 'recharts';
import { Brain, Info, TrendingUp } from 'lucide-react';
import { forecastZones, analyticsData } from '../data/weather';
import { getRiskColor } from '../data/locations';

// SVG Gauge Component
function RiskGauge({ value }) {
  const normalized = Math.min(Math.max(value, 0), 100);
  const angle = -135 + (normalized / 100) * 270;
  const r = 60;
  const cx = 90, cy = 90;

  const getColor = (v) => {
    if (v < 30) return '#22c55e';
    if (v < 60) return '#f59e0b';
    if (v < 80) return '#f97316';
    return '#ef4444';
  };

  // Arc path helper
  const polarToCartesian = (cx, cy, r, deg) => {
    const rad = (deg - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const describeArc = (cx, cy, r, startAngle, endAngle) => {
    const s = polarToCartesian(cx, cy, r, startAngle);
    const e = polarToCartesian(cx, cy, r, endAngle);
    const large = endAngle - startAngle <= 180 ? '0' : '1';
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
  };

  const needleEnd = polarToCartesian(cx, cy, r - 10, angle);
  const color = getColor(normalized);

  return (
    <svg viewBox="0 0 180 110" className="w-full max-w-[220px] mx-auto">
      {/* Background arc */}
      <path d={describeArc(cx, cy, r, -135, 135)} fill="none" stroke="#e2e8f0" strokeWidth="16" strokeLinecap="round" />
      {/* Value arc */}
      <path
        d={describeArc(cx, cy, r, -135, -135 + (normalized / 100) * 270)}
        fill="none" stroke={color} strokeWidth="16" strokeLinecap="round"
      />
      {/* Zone markers */}
      {[0, 30, 60, 80, 100].map((pct, i) => {
        const a = -135 + (pct / 100) * 270;
        const pt = polarToCartesian(cx, cy, r + 14, a);
        return (
          <text key={i} x={pt.x} y={pt.y} textAnchor="middle" dominantBaseline="middle"
            fontSize="8" fill="#94a3b8">{pct}</text>
        );
      })}
      {/* Needle */}
      <line x1={cx} y1={cy} x2={needleEnd.x} y2={needleEnd.y} stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="5" fill={color} />
      {/* Value text */}
      <text x={cx} y={cy + 22} textAnchor="middle" fontSize="22" fontWeight="bold" fill={color}>{normalized}%</text>
      <text x={cx} y={cy + 35} textAnchor="middle" fontSize="8" fill="#6b7280">Risk Probability</text>
    </svg>
  );
}

export default function Analytics() {
  const [selectedZone, setSelectedZone] = useState(1);
  const data = analyticsData[selectedZone] || analyticsData[1];
  const zone = forecastZones.find(z => z.id === selectedZone);

  const radarData = [
    { factor: 'Rainfall',      value: data.factors.rainfall },
    { factor: 'Soil Saturation', value: data.factors.soilSaturation },
    { factor: 'Slope',         value: data.factors.slopeInstability },
    { factor: 'History',       value: data.factors.historicalFreq },
    { factor: 'Vegetation',    value: data.factors.vegetation },
  ];

  const barData = Object.entries(data.factors).map(([key, val]) => ({
    name: {
      rainfall: 'Rainfall',
      soilSaturation: 'Soil Sat.',
      slopeInstability: 'Slope',
      historicalFreq: 'History',
      vegetation: 'Vegetation',
    }[key] || key,
    value: val,
    fill: val >= 80 ? '#ef4444' : val >= 60 ? '#f97316' : val >= 40 ? '#f59e0b' : '#22c55e',
  }));

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-brand-600 font-medium mb-2">
            <Brain className="w-4 h-4" /> AI Predictive Engine
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{fontFamily:'Poppins,sans-serif'}}>
            Predictive Analytics Panel
          </h1>
          <p className="text-gray-500">Ensemble model risk predictions with contributing factor breakdown — simulated demo data.</p>
        </div>

        {/* Zone Selector */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Select Monitoring Zone</label>
          <div className="flex flex-wrap gap-3">
            {forecastZones.map(z => (
              <button
                key={z.id}
                onClick={() => setSelectedZone(z.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedZone === z.id
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {z.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Gauge + Explainability */}
          <div className="flex flex-col gap-5">
            {/* Gauge */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
              <h3 className="font-semibold text-gray-900 mb-1">{zone?.name}</h3>
              <p className="text-xs text-gray-400 mb-4">{zone?.state}</p>
              <RiskGauge value={data.riskProb} />
              <div className="mt-4 text-center">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm ${
                  data.riskProb >= 80 ? 'bg-red-50 text-red-700' :
                  data.riskProb >= 60 ? 'bg-orange-50 text-orange-700' :
                  data.riskProb >= 40 ? 'bg-amber-50 text-amber-700' :
                  'bg-green-50 text-green-700'
                }`}>
                  {data.riskProb >= 80 ? '🔴 Severe Risk' :
                   data.riskProb >= 60 ? '🟠 High Risk' :
                   data.riskProb >= 40 ? '🟡 Moderate Risk' : '🟢 Low Risk'}
                </div>
              </div>
            </div>

            {/* Model explainability */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-indigo-600" />
                <h4 className="font-semibold text-indigo-900 text-sm">Model Explainability</h4>
              </div>
              <div className="space-y-2 text-sm text-indigo-700">
                <p><strong>Model Type:</strong> 5-Factor Ensemble (XGBoost + Random Forest)</p>
                <p><strong>Input Frequency:</strong> Every 15 minutes via sensor feeds</p>
                <p><strong>Training Data:</strong> 12 years of NER event history (simulated)</p>
                <p><strong>Accuracy (demo):</strong> 87.3% precision on test set</p>
                <p><strong>Explainer:</strong> SHAP values used for factor attribution</p>
              </div>
              <div className="mt-3 p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 font-medium">
                ⚠ All predictions shown are simulated for demo purposes
              </div>
            </div>
          </div>

          {/* Radar Chart */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 mb-1">Contributing Factors</h3>
            <p className="text-xs text-gray-400 mb-4">Radar chart — 5-factor risk contribution (%)</p>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="factor" tick={{fontSize:11, fill:'#6b7280'}} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{fontSize:9, fill:'#94a3b8'}} />
                <Radar name="Risk Factor" dataKey="value" stroke="#0d9488" fill="#0d9488" fillOpacity={0.25} strokeWidth={2} />
                <RTooltip formatter={(v) => [`${v}%`]} contentStyle={{fontSize:11, borderRadius:8}} />
              </RadarChart>
            </ResponsiveContainer>

            <div className="mt-4 grid grid-cols-1 gap-2">
              {radarData.map(f => (
                <div key={f.factor} className="flex items-center gap-3">
                  <span className="text-xs text-gray-600 w-28 flex-shrink-0">{f.factor}</span>
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${f.value}%`,
                        background: f.value >= 80 ? '#ef4444' : f.value >= 60 ? '#f97316' : f.value >= 40 ? '#f59e0b' : '#22c55e'
                      }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-gray-700 w-8 text-right">{f.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar Chart breakdown */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 mb-1">Factor Breakdown</h3>
            <p className="text-xs text-gray-400 mb-4">Bar chart — contribution strength</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData} margin={{top:5,right:5,left:-25,bottom:5}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{fontSize:10}} />
                <YAxis domain={[0,100]} tick={{fontSize:9}} />
                <RTooltip formatter={(v) => [`${v}%`]} contentStyle={{fontSize:11, borderRadius:8}} />
                <Bar dataKey="value" radius={[6,6,0,0]}>
                  {barData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            {/* Dominant factor callout */}
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-red-500" />
                Primary Risk Driver
              </h4>
              {(() => {
                const max = barData.reduce((a, b) => a.value > b.value ? a : b);
                return (
                  <p className="text-sm text-gray-600">
                    <strong className="text-red-600">{max.name}</strong> is the dominant contributing factor at{' '}
                    <strong>{max.value}%</strong>, indicating immediate attention needed.
                  </p>
                );
              })()}
            </div>

            {/* All zones comparison */}
            <div className="mt-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">All Zones — Risk Score</h4>
              <div className="space-y-1.5">
                {forecastZones.map(z => {
                  const d = analyticsData[z.id];
                  return (
                    <button
                      key={z.id}
                      onClick={() => setSelectedZone(z.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors ${
                        selectedZone === z.id ? 'bg-brand-50 text-brand-700' : 'hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full flex-shrink-0" style={{background: getRiskColor(
                        d.riskProb >= 80 ? 'Severe' : d.riskProb >= 60 ? 'High' : d.riskProb >= 40 ? 'Moderate' : 'Low'
                      )}} />
                      <span className="flex-1 text-left truncate">{z.name}</span>
                      <span className="font-semibold">{d.riskProb}%</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
