import { useState } from 'react';
import { Bell, Globe, Wifi, WifiOff, Clock, Users, RefreshCw, Download } from 'lucide-react';
import { mockAlerts, multilingualAlertSample } from '../data/alerts';

const SEVERITY_CONFIG = {
  Severe:   { bg: 'bg-red-50',    border: 'border-red-200',    badge: 'bg-red-100 text-red-700 border border-red-200',    dot: 'bg-red-500', icon: '🔴', pulse: true },
  High:     { bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-100 text-orange-700 border border-orange-200', dot: 'bg-orange-500', icon: '🟠', pulse: false },
  Moderate: { bg: 'bg-amber-50',  border: 'border-amber-200',  badge: 'bg-amber-100 text-amber-700 border border-amber-200',  dot: 'bg-amber-500', icon: '🟡', pulse: false },
  Low:      { bg: 'bg-green-50',  border: 'border-green-200',  badge: 'bg-green-100 text-green-700 border border-green-200',  dot: 'bg-green-500', icon: '🟢', pulse: false },
};

const LANG_ORDER = ['English', 'Assamese', 'Bengali', 'Hindi'];

// Simulated queued offline reports
const QUEUED_REPORTS = [
  { id: 'Q-001', type: 'Field Report', location: 'Tawang Remote Community', queued: '4 min ago' },
  { id: 'Q-002', type: 'Alert ACK',    location: 'NH-10 Teesta Valley',     queued: '12 min ago' },
  { id: 'Q-003', type: 'Field Report', location: 'Lawngtlai Hill Village',  queued: '18 min ago' },
];

export default function Alerts() {
  const [activeLang, setActiveLang] = useState('English');
  const [offlineMode, setOfflineMode] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [filterSev, setFilterSev] = useState('All');
  const [filterCat, setFilterCat] = useState('All');

  const translation = multilingualAlertSample.translations[activeLang];

  const categories = ['All', ...new Set(mockAlerts.map(a => a.category))];
  const severities  = ['All', 'Severe', 'High', 'Moderate', 'Low'];

  const filtered = mockAlerts.filter(a => {
    const matchSev = filterSev === 'All' || a.severity === filterSev;
    const matchCat = filterCat === 'All' || a.category === filterCat;
    return matchSev && matchCat;
  });

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => { setSyncing(false); setOfflineMode(false); }, 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-brand-600 font-medium mb-2">
              <Bell className="w-4 h-4" /> Alert Center
            </div>
            <h1 className="text-3xl font-bold text-gray-900" style={{fontFamily:'Poppins,sans-serif'}}>
              Alerts & Notifications
            </h1>
            <p className="text-gray-500 mt-1">Real-time early warnings and multilingual notifications for NER communities.</p>
          </div>

          {/* Offline mode toggle */}
          <div className={`flex flex-col items-end gap-2`}>
            <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all ${
              offlineMode
                ? 'bg-gray-900 border-gray-700 text-white'
                : 'bg-white border-gray-200 text-gray-700'
            }`}>
              <div className="flex flex-col">
                <span className="text-xs font-semibold">{offlineMode ? '📴 Offline Mode' : '📶 Online Mode'}</span>
                <span className={`text-xs ${offlineMode ? 'text-gray-400' : 'text-green-500'}`}>
                  {offlineMode ? `${QUEUED_REPORTS.length} reports queued` : 'All systems connected'}
                </span>
              </div>
              <button
                onClick={() => setOfflineMode(!offlineMode)}
                className={`relative w-11 h-6 rounded-full transition-colors ${offlineMode ? 'bg-gray-600' : 'bg-brand-500'}`}
                aria-label="Toggle offline mode"
              >
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${offlineMode ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
            <span className="text-xs text-gray-400">Simulate Offline Mode</span>
          </div>
        </div>

        {/* Offline mode panel */}
        {offlineMode && (
          <div className="bg-gray-900 text-white rounded-2xl p-5 mb-6 animate-fade-in-up border border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <WifiOff className="w-5 h-5 text-gray-400" />
                <div>
                  <h3 className="font-semibold">Offline Mode Active</h3>
                  <p className="text-sm text-gray-400">Reports are being queued locally and will sync when connectivity returns.</p>
                </div>
              </div>
              <button
                onClick={handleSync}
                disabled={syncing}
                className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors disabled:opacity-60"
              >
                <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                {syncing ? 'Syncing…' : 'Sync Now'}
              </button>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Download className="w-3.5 h-3.5" /> Queued for Sync
              </div>
              {QUEUED_REPORTS.map(r => (
                <div key={r.id} className="flex items-center justify-between bg-gray-800 rounded-xl px-4 py-2.5 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 font-mono">{r.id}</span>
                    <span className="font-medium">{r.type}</span>
                    <span className="text-gray-400">{r.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{r.queued}</span>
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                  </div>
                </div>
              ))}
              {syncing && (
                <div className="flex items-center gap-2 text-sm text-brand-400 mt-2">
                  <div className="w-4 h-4 border-2 border-brand-400 border-t-transparent rounded-full animate-spin" />
                  Uploading queued reports to server…
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Alert List (2/3) */}
          <div className="lg:col-span-2">
            {/* Filters */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-4 flex flex-wrap gap-3 items-center">
              <Bell className="w-4 h-4 text-gray-400" />
              <div className="flex gap-2 flex-wrap">
                {severities.map(s => (
                  <button
                    key={s}
                    onClick={() => setFilterSev(s)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                      filterSev === s ? 'bg-brand-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 flex-wrap ml-auto">
                {categories.map(c => (
                  <button
                    key={c}
                    onClick={() => setFilterCat(c)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
                      filterCat === c ? 'border-brand-500 text-brand-600 bg-brand-50' : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filtered.map(alert => {
                const cfg = SEVERITY_CONFIG[alert.severity] || SEVERITY_CONFIG.Low;
                return (
                  <div key={alert.id} className={`rounded-2xl border p-5 ${cfg.bg} ${cfg.border} transition-all hover:shadow-sm`}>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-2.5 h-2.5 rounded-full ${cfg.dot} ${cfg.pulse ? 'animate-pulse' : ''} flex-shrink-0 mt-1`} />
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`risk-badge ${cfg.badge}`}>{alert.severity}</span>
                            <span className="text-xs text-gray-500 bg-white/60 px-2 py-0.5 rounded-full">{alert.category}</span>
                            <span className="text-xs font-mono text-gray-400">{alert.id}</span>
                          </div>
                          <h3 className="font-semibold text-gray-900 mt-1">{alert.location}</h3>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 flex-shrink-0">
                        <Clock className="w-3 h-3" /> {alert.timeAgo}
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 leading-relaxed mb-3">{alert.message}</p>

                    {alert.affectedPopulation > 0 && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Users className="w-3.5 h-3.5" />
                        ~{alert.affectedPopulation.toLocaleString()} people potentially affected
                      </div>
                    )}
                  </div>
                );
              })}

              {filtered.length === 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                  <Bell className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-400">No alerts match the current filters.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Multilingual + Offline badge */}
          <div className="flex flex-col gap-5">

            {/* Multilingual Alert Preview */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-4 h-4 text-brand-600" />
                <h3 className="font-semibold text-gray-900">Multilingual Alert Preview</h3>
              </div>
              <p className="text-xs text-gray-500 mb-4">Sample: Alert {multilingualAlertSample.alertId} in multiple languages</p>

              {/* Language tabs */}
              <div className="grid grid-cols-2 gap-1.5 mb-4">
                {LANG_ORDER.map(lang => {
                  const t = multilingualAlertSample.translations[lang];
                  return (
                    <button
                      key={lang}
                      onClick={() => setActiveLang(lang)}
                      className={`text-xs font-medium px-3 py-2 rounded-lg transition-colors ${
                        activeLang === lang ? 'bg-brand-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {t.flag} {t.label}
                    </button>
                  );
                })}
              </div>

              {/* Alert card */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="text-sm font-bold text-red-800 mb-2">{translation.title}</div>
                <p className="text-sm text-red-700 leading-relaxed">{translation.body}</p>
                <div className="mt-3 flex items-center gap-2">
                  <Bell className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-xs text-red-500">SMS + Push notification sent — {translation.label}</span>
                </div>
              </div>

              <div className="mt-3 p-3 bg-gray-50 rounded-xl text-xs text-gray-500">
                🌐 NER SafeSlope supports 4 languages: English, Assamese, Bengali, and Hindi. SMS-based delivery requires no internet.
              </div>
            </div>

            {/* Offline Mode Ready badge */}
            <div className={`rounded-2xl border p-5 transition-all ${
              offlineMode
                ? 'bg-gray-50 border-gray-200'
                : 'bg-gradient-to-br from-teal-50 to-brand-50 border-brand-100'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                {offlineMode
                  ? <WifiOff className="w-5 h-5 text-gray-500" />
                  : <Wifi className="w-5 h-5 text-brand-600" />
                }
                <div>
                  <div className="font-semibold text-gray-900 flex items-center gap-2">
                    Offline Mode Ready
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      offlineMode ? 'bg-gray-200 text-gray-600' : 'bg-green-100 text-green-700'
                    }`}>
                      {offlineMode ? 'Active' : 'Standby'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">Service Worker + IndexedDB caching</p>
                </div>
              </div>

              <ul className="space-y-2 text-sm text-gray-600 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-brand-500 mt-0.5">✓</span>
                  Field reports queued locally and synced on reconnect
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-500 mt-0.5">✓</span>
                  Last 24 hrs of alerts cached for offline viewing
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-500 mt-0.5">✓</span>
                  SMS fallback for critical alerts (no internet needed)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-500 mt-0.5">✓</span>
                  Auto-sync when connectivity is restored
                </li>
              </ul>

              <button
                onClick={() => setOfflineMode(!offlineMode)}
                className={`w-full text-sm font-medium py-2.5 rounded-xl border transition-all ${
                  offlineMode
                    ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    : 'bg-brand-600 text-white border-transparent hover:bg-brand-700'
                }`}
              >
                {offlineMode ? '📶 Switch to Online Mode' : '📴 Simulate Offline Mode'}
              </button>
            </div>

            {/* Stats summary */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-gray-900 mb-4 text-sm">Alert Statistics (Today)</h3>
              <div className="space-y-3">
                {[
                  { label: 'Severe Alerts', count: mockAlerts.filter(a=>a.severity==='Severe').length, color: 'text-red-600', bg: 'bg-red-50' },
                  { label: 'High Alerts',   count: mockAlerts.filter(a=>a.severity==='High').length,   color: 'text-orange-600', bg: 'bg-orange-50' },
                  { label: 'Moderate',      count: mockAlerts.filter(a=>a.severity==='Moderate').length, color: 'text-amber-600', bg: 'bg-amber-50' },
                  { label: 'Total People Notified', count: '12,400+', color: 'text-brand-600', bg: 'bg-brand-50' },
                ].map(s => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{s.label}</span>
                    <span className={`text-sm font-bold ${s.color} ${s.bg} px-3 py-0.5 rounded-full`}>{s.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
