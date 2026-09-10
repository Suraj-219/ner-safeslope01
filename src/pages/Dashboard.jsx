import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip as RTooltip, PieChart, Pie, Cell
} from 'recharts';
import {
  Filter, MapPin, Droplets, Wind, AlertTriangle,
  CheckCircle, XCircle, Clock, TrendingUp, ChevronRight, Activity
} from 'lucide-react';
import {
  locations, NER_STATES, RISK_LEVELS, CATEGORIES,
  getRiskColor, getRiskBgClass, getRoadStatusClass
} from '../data/locations';
import { forecastDataSets, forecastZones } from '../data/weather';
import { createLocationFromReport, loadReports } from '../data/reportStore';

// Fix leaflet bounds to NER region
function MapBounds({ filtered }) {
  const map = useMap();
  useEffect(() => {
    if (filtered.length === 0) {
      map.fitBounds([[22, 88], [29.5, 96.5]], { padding: [20, 20] });
      return;
    }
    map.fitBounds(filtered.map(location => [location.lat, location.lng]), { padding: [20, 20], maxZoom: 9 });
  }, [filtered, map]);
  return null;
}

function Skeleton({ className }) {
  return <div className={`skeleton ${className}`} />;
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [filterState, setFilterState] = useState('All States');
  const [filterRisk, setFilterRisk] = useState('All Levels');
  const [filterCat, setFilterCat] = useState('All Categories');
  const [selected, setSelected] = useState(null);
  const [forecastZone, setForecastZone] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [reports, setReports] = useState(loadReports);

  useEffect(() => {
    const refreshReports = () => setReports(loadReports());
    window.addEventListener('storage', refreshReports);
    return () => window.removeEventListener('storage', refreshReports);
  }, []);

  // Simulate loading
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const reportLocations = reports.map(createLocationFromReport);
  const allLocations = [...locations, ...reportLocations];
  const filtered = allLocations.filter(l => {
    const matchState = filterState === 'All States' || l.state === filterState;
    const matchRisk  = filterRisk  === 'All Levels' || l.riskLevel === filterRisk;
    const matchCat   = filterCat   === 'All Categories' || l.category === filterCat;
    const matchSearch = !searchQuery || l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.state.toLowerCase().includes(searchQuery.toLowerCase());
    return matchState && matchRisk && matchCat && matchSearch;
  });

  const riskDistribution = ['Low', 'Moderate', 'High', 'Severe'].map(name => ({
    name,
    value: filtered.filter(location => location.riskLevel === name).length,
    color: getRiskColor(name),
  }));
  const priorityLocations = [...filtered]
    .filter(location => location.riskLevel === 'Severe' || location.riskLevel === 'High')
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 5);

  const forecastData = forecastDataSets[forecastZone] || forecastDataSets[1];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Page header */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-brand-600" />
              Live Risk Dashboard
            </h1>
            <p className="text-sm text-gray-500">North Eastern Region — {filtered.length} locations visible</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Data refreshed 1 min ago
            </div>
            <span className="text-xs font-medium bg-amber-50 text-amber-600 border border-amber-100 px-3 py-1.5 rounded-full">
              ⚠ Demo Data
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* ── Filters ─────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-3 items-center">
            <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search location…"
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400 min-w-[160px]"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <select
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400"
              value={filterState}
              onChange={e => setFilterState(e.target.value)}
            >
              {NER_STATES.map(s => <option key={s}>{s}</option>)}
            </select>
            <select
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400"
              value={filterRisk}
              onChange={e => setFilterRisk(e.target.value)}
            >
              {RISK_LEVELS.map(r => <option key={r}>{r}</option>)}
            </select>
            <select
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400"
              value={filterCat}
              onChange={e => setFilterCat(e.target.value)}
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <button
              onClick={() => { setFilterState('All States'); setFilterRisk('All Levels'); setFilterCat('All Categories'); setSearchQuery(''); }}
              className="text-sm text-brand-600 hover:text-brand-800 font-medium px-3 py-2 hover:bg-brand-50 rounded-xl transition-colors"
            >
              Reset
            </button>

            {/* Risk legend */}
            <div className="ml-auto flex gap-3 flex-wrap">
              {['Low','Moderate','High','Severe'].map(r => (
                <span key={r} className="flex items-center gap-1.5 text-xs text-gray-600">
                  <span className="w-3 h-3 rounded-full" style={{background: getRiskColor(r)}} />
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Main grid ────────────────────────────────────────────────── */}
        <div className="grid xl:grid-cols-3 gap-6">

          {/* MAP (takes 2/3) */}
          <div className="xl:col-span-2">
            {loading ? (
              <Skeleton className="h-[520px] w-full rounded-2xl" />
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden" style={{height:'520px'}}>
                <MapContainer
                  center={[25.5, 92.5]}
                  zoom={6}
                  className="w-full h-full"
                  zoomControl={true}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <MapBounds filtered={filtered} />

                  {filtered.map(loc => (
                    <CircleMarker
                      key={loc.id}
                      center={[loc.lat, loc.lng]}
                      radius={loc.riskLevel === 'Severe' ? 14 : loc.riskLevel === 'High' ? 11 : 9}
                      pathOptions={{
                        fillColor: getRiskColor(loc.riskLevel),
                        color: '#fff',
                        weight: 2,
                        opacity: 1,
                        fillOpacity: loc.riskLevel === 'Severe' ? 0.9 : 0.75,
                      }}
                      eventHandlers={{ click: () => setSelected(loc) }}
                    >
                      <Tooltip direction="top" offset={[0, -8]} opacity={0.95}>
                        <div className="text-xs font-semibold">{loc.name}</div>
                        <div className="text-xs text-gray-500">{loc.state} • Risk: {loc.riskScore}</div>
                      </Tooltip>
                    </CircleMarker>
                  ))}
                </MapContainer>
              </div>
            )}

            {/* Selected location detail card */}
            {selected && (
              <div className="mt-4 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 animate-slide-in-right">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{selected.name}</h3>
                    <p className="text-sm text-gray-500">{selected.district}, {selected.state}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`risk-badge ${getRiskBgClass(selected.riskLevel)}`}>
                      {selected.riskLevel} Risk
                    </span>
                    <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100">×</button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                  <div className="bg-blue-50 rounded-xl p-3 text-center">
                    <Droplets className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                    <div className="text-lg font-bold text-blue-700">{selected.rainfall}mm</div>
                    <div className="text-xs text-blue-600">Rainfall (6hr)</div>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-3 text-center">
                    <Wind className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                    <div className="text-lg font-bold text-amber-700">{selected.soilMoisture}%</div>
                    <div className="text-xs text-amber-600">Soil Moisture</div>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-3 text-center">
                    <TrendingUp className="w-4 h-4 text-orange-500 mx-auto mb-1" />
                    <div className="text-lg font-bold text-orange-700">{selected.slopeAngle}°</div>
                    <div className="text-xs text-orange-600">Slope Angle</div>
                  </div>
                  <div className={`rounded-xl p-3 text-center ${
                    selected.roadStatus === 'Open' ? 'bg-green-50' :
                    selected.roadStatus === 'Restricted' ? 'bg-amber-50' : 'bg-red-50'
                  }`}>
                    {selected.roadStatus === 'Open' ? <CheckCircle className="w-4 h-4 text-green-500 mx-auto mb-1" /> :
                     selected.roadStatus === 'Restricted' ? <AlertTriangle className="w-4 h-4 text-amber-500 mx-auto mb-1" /> :
                     <XCircle className="w-4 h-4 text-red-500 mx-auto mb-1" />}
                    <div className={`text-sm font-bold ${
                      selected.roadStatus === 'Open' ? 'text-green-700' :
                      selected.roadStatus === 'Restricted' ? 'text-amber-700' : 'text-red-700'
                    }`}>{selected.roadStatus}</div>
                    <div className="text-xs text-gray-500">Road Status</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Updated {selected.lastUpdated}</span>
                  {selected.population > 0 && <span><MapPin className="w-3 h-3 inline mr-0.5" /> Pop: {selected.population.toLocaleString()}</span>}
                  <span>Elevation: {selected.elevation}m</span>
                  <span className={`risk-badge ${getRiskBgClass(selected.riskLevel)} text-xs`}>Score: {selected.riskScore}/100</span>
                </div>

                {/* Risk bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Risk Score</span>
                    <span className="font-semibold" style={{color: getRiskColor(selected.riskLevel)}}>{selected.riskScore}/100</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{width: `${selected.riskScore}%`, background: getRiskColor(selected.riskLevel)}}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SIDE PANEL */}
          <div className="flex flex-col gap-5">

            {/* Risk Distribution Donut */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                Risk Severity Distribution
              </h3>
              {loading ? <Skeleton className="h-40 w-full" /> : (
                <>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie data={riskDistribution} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                        {riskDistribution.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <RTooltip formatter={(v, name) => [`${v} locations`, name]} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {riskDistribution.map(r => (
                      <div key={r.name} className="flex items-center gap-2 text-xs">
                        <span className="w-3 h-3 rounded-full flex-shrink-0" style={{background: r.color}} />
                        <span className="text-gray-600">{r.name}: <strong>{r.value}</strong></span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* 72hr Forecast */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-brand-500" />
                  72-Hr Rainfall vs. Risk
                </h3>
              </div>
              <select
                className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 mb-3 focus:outline-none focus:ring-2 focus:ring-brand-200"
                value={forecastZone}
                onChange={e => setForecastZone(Number(e.target.value))}
              >
                {forecastZones.map(z => (
                  <option key={z.id} value={z.id}>{z.name}</option>
                ))}
              </select>
              {loading ? <Skeleton className="h-40 w-full" /> : (
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={forecastData} margin={{top:5,right:5,left:-20,bottom:0}}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="time" tick={{fontSize:9}} interval={2} />
                    <YAxis tick={{fontSize:9}} />
                    <RTooltip contentStyle={{fontSize:11, borderRadius:8, border:'1px solid #e2e8f0'}} />
                    <Line type="monotone" dataKey="rainfall" stroke="#3b82f6" strokeWidth={2} dot={false} name="Rainfall (mm)" />
                    <Line type="monotone" dataKey="risk" stroke="#ef4444" strokeWidth={2} dot={false} name="Risk Score" />
                    <Line type="monotone" dataKey="threshold" stroke="#f59e0b" strokeWidth={1} strokeDasharray="4 4" dot={false} name="Alert Threshold" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Top Priority Locations */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                Emergency Priority List
              </h3>
              <div className="space-y-2">
                {priorityLocations.map((loc, i) => (
                  <button
                    key={loc.id}
                    onClick={() => setSelected(loc)}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${
                      i === 0 ? 'bg-red-500' : i === 1 ? 'bg-red-400' : 'bg-orange-400'
                    }`}>{i + 1}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-gray-800 truncate">{loc.name}</div>
                      <div className="text-xs text-gray-400">{loc.state}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`risk-badge ${getRiskBgClass(loc.riskLevel)}`}>{loc.riskScore}</span>
                      <ChevronRight className="w-3 h-3 text-gray-300" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Road Status Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-500" />
                Road Connectivity Status
              </h3>
              <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {filtered.filter(l => l.category === 'Road' || l.roadStatus !== 'Open').slice(0, 12).map(loc => (
                  <div key={loc.id} className="flex items-center justify-between gap-2 text-xs py-2 border-b border-gray-50 last:border-0">
                    <div className="min-w-0">
                      <div className="font-medium text-gray-700 truncate">{loc.name}</div>
                      <div className="text-gray-400">{loc.state}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ${getRoadStatusClass(loc.roadStatus)}`}>
                      {loc.roadStatus}
                    </span>
                  </div>
                ))}
                {filtered.filter(l => l.category === 'Road' || l.roadStatus !== 'Open').length === 0 && (
                  <p className="text-xs text-gray-400 py-4 text-center">No road issues in this selection.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
