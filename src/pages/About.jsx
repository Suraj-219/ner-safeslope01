import { Users, Shield, Building2, MapPin, Phone, Mail, ChevronRight, Heart } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const userTypes = [
  {
    icon: Building2,
    title: 'District Disaster Management Authorities (DDMAs)',
    desc: 'Real-time risk dashboards, alert management, and emergency response coordination tools for district-level officials.',
    features: ['Live risk maps', 'Priority action lists', 'Multi-district coordination', 'Resource dispatch tracking'],
    color: 'from-brand-50 to-teal-50',
    border: 'border-brand-100',
    iconBg: 'bg-brand-100',
    iconColor: 'text-brand-700',
  },
  {
    icon: Shield,
    title: 'State Disaster Management Authorities (SDMAs)',
    desc: 'State-level aggregated view for Assam, Meghalaya, Mizoram, Manipur, Nagaland, Tripura, Arunachal Pradesh, and Sikkim.',
    features: ['State-wide overview', 'Inter-district alerts', 'Policy dashboards', 'Historical event analytics'],
    color: 'from-indigo-50 to-purple-50',
    border: 'border-indigo-100',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-700',
  },
  {
    icon: MapPin,
    title: 'Local Panchayats & Village Bodies',
    desc: 'Simplified alerting and offline-capable reporting tools designed for low-bandwidth rural environments.',
    features: ['SMS-based alerts', 'Offline mode', 'Multilingual UI', 'Citizen reporting portal'],
    color: 'from-green-50 to-emerald-50',
    border: 'border-green-100',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-700',
  },
  {
    icon: Users,
    title: 'Citizens & Communities',
    desc: 'Any resident can submit a geo-tagged field report from their phone. Community-sourced data strengthens the AI model.',
    features: ['Incident reporting', 'Nearby alert notifications', 'Safety guidelines', 'Evacuation route access'],
    color: 'from-amber-50 to-orange-50',
    border: 'border-amber-100',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
  },
];

const partners = [
  'National Disaster Management Authority (NDMA)',
  'Geological Survey of India (GSI)',
  'India Meteorological Department (IMD)',
  'Indian Space Research Organisation (ISRO)',
  'North Eastern Council (NEC)',
  'Ministry of Home Affairs (NDRF)',
];

export default function About() {
  const [ref1, inView1] = useInView();
  const [ref2, inView2] = useInView();

  return (
    <div className="min-h-screen bg-gray-50 pt-16">

      {/* Hero */}
      <section className="bg-gradient-to-r from-brand-600 to-brand-800 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm mb-6">
            <Heart className="w-4 h-4 text-red-300" />
            Built for the communities of Northeast India
          </div>
          <h1 className="text-4xl font-extrabold mb-6" style={{fontFamily:'Poppins,sans-serif'}}>
            About NER SafeSlope
          </h1>
          <p className="text-xl text-brand-100 max-w-3xl mx-auto leading-relaxed">
            A hackathon prototype demonstrating how AI, real-time monitoring, and community-powered reporting can transform disaster preparedness in India's most vulnerable region.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/30 rounded-xl px-4 py-2.5 text-amber-200 text-sm font-medium">
            ⚠ This is a prototype/demo build. All data shown is simulated.
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Intended Users */}
        <section className="mb-20">
          <div ref={ref1} className={`text-center mb-12 transition-all duration-700 ${inView1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-sm font-bold text-brand-600 uppercase tracking-widest block mb-2">Who It Serves</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{fontFamily:'Poppins,sans-serif'}}>Intended Users</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              NER SafeSlope is designed for a multi-stakeholder ecosystem — from national disaster authorities to individual citizens in remote villages.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {userTypes.map((u, i) => {
              const Ico = u.icon;
              return (
                <div key={i} className={`bg-gradient-to-br ${u.color} border ${u.border} rounded-2xl p-5 hover:shadow-md transition-all duration-300`}>
                  <div className={`w-11 h-11 ${u.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                    <Ico className={`w-5 h-5 ${u.iconColor}`} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-2">{u.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">{u.desc}</p>
                  <ul className="space-y-1.5">
                    {u.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-xs text-gray-700">
                        <ChevronRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Technology */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* <div>
              <span className="text-sm font-bold text-brand-600 uppercase tracking-widest block mb-2">Technology Stack</span>
              <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{fontFamily:'Poppins,sans-serif'}}>How It's Built</h2>
              <div className="space-y-4">
                {[
                  { label: 'Frontend', value: 'React + Vite + Tailwind CSS', note: 'Fast, responsive, mobile-first' },
                  { label: 'Maps & GIS', value: 'Leaflet.js + React-Leaflet', note: 'OpenStreetMap tile layers, circle markers, popups' },
                  { label: 'Charts', value: 'Recharts', note: 'Line, donut, radar, bar charts with real-time data' },
                  { label: 'AI Model (Simulated)', value: '5-Factor Ensemble Model', note: 'XGBoost + RF — rainfall, soil, slope, history, vegetation' },
                  { label: 'Data', value: 'Mock/Simulated JSON', note: '40+ locations, 8 states, realistic sensor values' },
                  { label: 'Alerts', value: 'SMS + Push (Simulated)', note: 'Multilingual: English, Assamese, Bengali, Hindi' },
                  { label: 'Offline', value: 'Service Worker + IndexedDB', note: 'Queue-and-sync architecture for connectivity blackouts' },
                ].map(t => (
                  <div key={t.label} className="flex gap-4 items-start">
                    <div className="w-28 text-xs font-bold text-gray-400 uppercase tracking-wide pt-0.5 flex-shrink-0">{t.label}</div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{t.value}</div>
                      <div className="text-xs text-gray-500">{t.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}

            <div className="lg:col-span-2 max-w-2xl w-full mx-auto">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Relevant Partner Agencies</h3>
                <div className="space-y-2">
                  {partners.map(p => (
                    <div key={p} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <Shield className="w-4 h-4 text-brand-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact / Escalation */}
        <section ref={ref2} className={`transition-all duration-700 ${inView2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-r from-brand-600 to-brand-800 rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6" style={{fontFamily:'Poppins,sans-serif'}}>Escalation & Contact</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { icon: Phone, label: 'NDMA Helpline', value: '1070', sub: '24/7 Disaster Response' },
                { icon: Phone, label: 'National Emergency', value: '112', sub: 'Police / Fire / Ambulance' },
                { icon: Mail, label: 'Demo Enquiries', value: 'demo@nersafeslope.in', sub: 'Prototype feedback welcome' },
              ].map(c => {
                const Ico = c.icon;
                return (
                  <div key={c.label} className="bg-white/10 border border-white/20 rounded-2xl p-5">
                    <Ico className="w-5 h-5 text-brand-200 mb-3" />
                    <div className="text-xs text-brand-200 font-medium mb-1">{c.label}</div>
                    <div className="text-lg font-bold text-white mb-1">{c.value}</div>
                    <div className="text-xs text-brand-100/70">{c.sub}</div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 p-4 bg-amber-400/20 border border-amber-400/30 rounded-2xl">
              <p className="text-sm text-amber-200">
                <strong>Disclaimer:</strong> NER SafeSlope is a hackathon/demo prototype. All data, alerts, sensor readings, and predictions shown are simulated and do not represent real-world conditions. Do not rely on this system for actual emergency decisions.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
