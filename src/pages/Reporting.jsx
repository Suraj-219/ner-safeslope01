import { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { toast, Toaster } from 'react-hot-toast';
import { Upload, MapPin, User, FileText, CheckCircle, Clock, AlertCircle, X } from 'lucide-react';
import { INCIDENT_TYPES, ROLES, LOCATION_OPTIONS } from '../data/reports';
import { locations } from '../data/locations';
import { loadReports, saveReports } from '../data/reportStore';

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LocationPicker({ onSelect }) {
  useMapEvents({
    click(e) { onSelect(e.latlng); }
  });
  return null;
}

const STATUS_CONFIG = {
  Active:       { color: 'bg-red-100 text-red-700 border-red-200',    icon: AlertCircle,   iconColor: 'text-red-500' },
  'Under Review': { color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Clock,     iconColor: 'text-amber-500' },
  Verified:     { color: 'bg-green-100 text-green-700 border-green-200',  icon: CheckCircle, iconColor: 'text-green-500' },
};

function ReportCard({ report, onRemove }) {
  const cfg = STATUS_CONFIG[report.status] || STATUS_CONFIG.Active;
  return (
    <div className="card-hover animate-fade-in-up">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-gray-400">{report.id}</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${cfg.color}`}>
              {report.status}
            </span>
          </div>
          <h4 className="font-semibold text-gray-900 text-sm">{report.incidentType}</h4>
          <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3" /> {report.location}
          </p>
        </div>
        {onRemove && (
          <button onClick={() => onRemove(report.id)} className="text-gray-300 hover:text-gray-500 p-1 ml-2 flex-shrink-0">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2">{report.description}</p>
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <User className="w-3 h-3" /> {report.name} • {report.role}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" /> {report.timeAgo}
        </span>
      </div>
      {report.hasPhoto && (
        <div className="mt-2 flex items-center gap-1.5 text-xs text-brand-600">
          <Upload className="w-3 h-3" /> Photo attached
        </div>
      )}
    </div>
  );
}

export default function Reporting() {
  const [reports, setReports] = useState(loadReports);
  const [form, setForm] = useState({
    name: '', role: 'Citizen', location: '', lat: null, lng: null,
    incidentType: 'Crack Detected', description: '', photo: null,
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [markerPos, setMarkerPos] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef();

  const updateReports = (nextReports) => {
    setReports(nextReports);
    saveReports(nextReports);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm(f => ({...f, photo: file}));
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleMapClick = (latlng) => {
    setMarkerPos(latlng);
    setForm(f => ({...f, lat: latlng.lat.toFixed(4), lng: latlng.lng.toFixed(4)}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error('Please enter your name'); return; }
    if (!form.location.trim()) { toast.error('Please select a location'); return; }
    if (!form.description.trim()) { toast.error('Please describe the incident'); return; }

    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000)); // Simulate API call

    const newReport = {
      id: `RPT-${String(reports.length + 1).padStart(3, '0')}`,
      name: form.name,
      role: form.role,
      location: form.location,
      lat: form.lat || 25.5,
      lng: form.lng || 92.5,
      incidentType: form.incidentType,
      description: form.description,
      timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
      timeAgo: 'Just now',
      status: 'Under Review',
      hasPhoto: !!form.photo,
    };

    updateReports([newReport, ...reports]);
    setForm({ name: '', role: 'Citizen', location: '', lat: null, lng: null, incidentType: 'Crack Detected', description: '', photo: null });
    setPhotoPreview(null);
    setMarkerPos(null);
    setSubmitting(false);

    toast.success('✅ Report submitted! It will be reviewed by authorities.', {
      duration: 5000,
      style: { background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0' }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-brand-600 font-medium mb-2">
            <FileText className="w-4 h-4" /> Field Reporting
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{fontFamily:'Poppins,sans-serif'}}>
            Submit a Field Report
          </h1>
          <p className="text-gray-500">Report ground-level observations for cracks, slope movement, road blocks, and other incidents. Reports feed directly into the dashboard.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h2 className="font-semibold text-gray-900 text-lg border-b border-gray-100 pb-3">Incident Details</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Ranjit Phukan"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400"
                    value={form.name}
                    onChange={e => setForm(f => ({...f, name: e.target.value}))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Role *</label>
                  <select
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400"
                    value={form.role}
                    onChange={e => setForm(f => ({...f, role: e.target.value}))}
                  >
                    {ROLES.map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Location *</label>
                  <select
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400"
                    value={form.location}
                    onChange={e => {
                      const location = e.target.value;
                      const match = locations.find(l => `${l.name}, ${l.state}` === location);
                      setForm(f => ({
                        ...f,
                        location,
                        lat: match ? match.lat : f.lat,
                        lng: match ? match.lng : f.lng,
                      }));
                      if (match) setMarkerPos({ lat: match.lat, lng: match.lng });
                    }}
                  >
                    <option value="">— Select a location —</option>
                    {LOCATION_OPTIONS.map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Incident Type *</label>
                  <select
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400"
                    value={form.incidentType}
                    onChange={e => setForm(f => ({...f, incidentType: e.target.value}))}
                  >
                    {INCIDENT_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              {/* Map pin picker */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <MapPin className="w-3.5 h-3.5 inline mr-1 text-brand-600" />
                  Pin Location on Map <span className="text-gray-400 font-normal">(click to drop pin)</span>
                </label>
                <div className="rounded-xl overflow-hidden border border-gray-200" style={{height:'200px'}}>
                  <MapContainer center={[25.5, 92.5]} zoom={5} className="w-full h-full">
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; OpenStreetMap contributors'
                    />
                    <LocationPicker onSelect={handleMapClick} />
                    {markerPos && <Marker position={markerPos} />}
                  </MapContainer>
                </div>
                {markerPos && (
                  <p className="text-xs text-brand-600 mt-1.5 font-medium">
                    📍 Pin set: {markerPos.lat.toFixed(4)}, {markerPos.lng.toFixed(4)}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description *</label>
                <textarea
                  rows={4}
                  placeholder="Describe what you observed — visible cracks, debris, road status, water flow, etc."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400 resize-none"
                  value={form.description}
                  onChange={e => setForm(f => ({...f, description: e.target.value}))}
                />
              </div>

              {/* Photo upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <Upload className="w-3.5 h-3.5 inline mr-1 text-brand-600" />
                  Photo / Video Upload <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <div
                  className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-brand-300 hover:bg-brand-50/40 transition-colors"
                  onClick={() => fileRef.current?.click()}
                >
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="max-h-40 mx-auto rounded-lg object-cover" />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-400">Click to upload photo or video</p>
                      <p className="text-xs text-gray-300 mt-1">JPG, PNG, MP4 up to 50MB</p>
                    </>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*,video/*" className="hidden" onChange={handlePhotoChange} />
                {photoPreview && (
                  <button type="button" onClick={() => { setPhotoPreview(null); setForm(f => ({...f, photo: null})); }}
                    className="text-xs text-red-500 hover:text-red-700 mt-1.5">
                    Remove photo
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Submit Report
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Recent Reports */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-500" />
                Recent Field Reports
                <span className="ml-auto text-xs font-normal text-gray-400">{reports.length} total</span>
              </h2>
              <div className="space-y-3 max-h-[calc(100vh-8rem)] overflow-y-auto pr-1">
                {reports.map(r => (
                  <ReportCard key={r.id} report={r} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
