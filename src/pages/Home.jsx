import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2, MapPin, Zap, FileText, Activity, ChevronDown } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useCountUp } from '../hooks/useCountUp';

// ─── Stat Counter Card ───────────────────────────────────────────────────────
function StatCard({ value, label, icon: Icon, color, suffix = '' }) {
  const [ref, inView] = useInView();
  const { count } = useCountUp(value, 2200, inView);

  return (
    <div ref={ref} className="flex flex-col items-center text-center px-6 py-5">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1" style={{fontFamily:'Poppins,sans-serif'}}>
        {inView ? count : 0}{suffix}
      </div>
      <div className="text-sm text-gray-500 font-medium">{label}</div>
    </div>
  );
}

// ─── Step Card ────────────────────────────────────────────────────────────────
function StepCard({ step, icon: Icon, title, desc, delay }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`card-hover p-6 text-center transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Icon className="w-6 h-6 text-brand-600" />
      </div>
      <div className="text-xs font-bold text-brand-600 uppercase tracking-widest mb-2">Step {step}</div>
      <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

// ─── Feature Card ─────────────────────────────────────────────────────────────
function FeatureCard({ icon: Icon, title, desc, color }) {
  return (
    <div className="flex gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
        <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// ─── Problem Section (uses hooks at top level) ────────────────────────────────
function ProblemSection() {
  const [leftRef, leftInView] = useInView();
  const [rightRef, rightInView] = useInView();

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div ref={leftRef} className={`transition-all duration-700 ${leftInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <span className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-3 block">The Challenge</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{fontFamily:'Poppins,sans-serif'}}>Northeast India's Silent Crisis</h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              The NER is among India's most landslide-prone regions, receiving some of the world's highest annual rainfall. Steep terrain, fragile geology, and poor road connectivity create a perfect storm — when disaster strikes, communities are often cut off with no early warning.
            </p>
            <div className="space-y-4">
              <FeatureCard
                icon={MapPin} title="10,000+ Vulnerable Points"
                desc="Thousands of villages and road segments at risk across the 8 NER states, many with no monitoring infrastructure."
                color="bg-red-500"
              />
              <FeatureCard
                icon={Activity} title="Seasonal Flash Floods"
                desc="Monsoon season (June–September) brings extreme rainfall events that trigger cascading landslides within hours."
                color="bg-orange-500"
              />
              <FeatureCard
                icon={FileText} title="Connectivity Blackouts"
                desc="Road blockages isolate communities for days. Real-time road status and offline-capable reporting tools are essential."
                color="bg-brand-600"
              />
            </div>
          </div>

          <div ref={rightRef} className={`transition-all duration-700 delay-200 ${rightInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Annual Landslide Events', value: '2,400+', sub: 'across NER states', color: 'from-red-50 to-orange-50', border: 'border-red-100', text: 'text-red-700' },
                { label: 'Average Rainfall', value: '11,870mm', sub: 'Cherrapunji (world record zone)', color: 'from-blue-50 to-cyan-50', border: 'border-blue-100', text: 'text-blue-700' },
                { label: 'Lives at Risk', value: '4.2M+', sub: 'in high-vulnerability zones', color: 'from-amber-50 to-yellow-50', border: 'border-amber-100', text: 'text-amber-700' },
                { label: 'Road Blockages/Year', value: '800+', sub: 'cutting off supply routes', color: 'from-purple-50 to-indigo-50', border: 'border-purple-100', text: 'text-purple-700' },
              ].map((s, i) => (
                <div key={i} className={`bg-gradient-to-br ${s.color} border ${s.border} rounded-2xl p-5`}>
                  <div className={`text-3xl font-extrabold ${s.text} mb-1`} style={{fontFamily:'Poppins,sans-serif'}}>{s.value}</div>
                  <div className="font-semibold text-gray-700 text-sm mb-1">{s.label}</div>
                  <div className="text-xs text-gray-500">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── HowItWorks section ────────────────────────────────────────────────────────
function HowItWorks() {
  const [ref, inView] = useInView();
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-3 block">Platform Architecture</span>
          <h2 className="text-3xl font-bold text-gray-900 mb-3" style={{fontFamily:'Poppins,sans-serif'}}>How NER SafeSlope Works</h2>
          <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
            A four-stage pipeline that transforms raw sensor and satellite data into actionable, life-saving early warnings.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="hidden lg:block absolute top-[3.5rem] left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-brand-200 via-brand-300 to-brand-200 z-0" />
          <StepCard step={1} icon={Activity}  delay={0}   title="Data Collection"    desc="IoT sensors, rain gauges, satellite imagery, and citizen reports feed real-time environmental data into the platform." />
          <StepCard step={2} icon={BarChart2} delay={100} title="AI Prediction"      desc="A 5-factor ensemble ML model calculates risk probability for every monitored location every 15 minutes." />
          <StepCard step={3} icon={Zap}       delay={200} title="Alerting"           desc="When risk crosses a threshold, multilingual SMS, push, and audio alerts are dispatched to authorities and residents." />
          <StepCard step={4} icon={FileText}  delay={300} title="Response"           desc="DDMAs receive a prioritized action list. Field teams deploy with offline-capable mobile tools for on-ground reporting." />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-teal-50/40 to-indigo-50/30" />
        <div className="absolute top-24 right-0 w-[600px] h-[600px] bg-gradient-to-br from-brand-200/30 to-indigo-200/20 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-teal-100/40 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 border border-brand-100 rounded-full mb-6">
                <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-brand-700">Live Monitoring Active — NER Region</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-6" style={{fontFamily:'Poppins,sans-serif'}}>
                AI-Powered{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">
                  Landslide
                </span>{' '}
                Early Warning
              </h1>

              <p className="text-xl text-gray-500 leading-relaxed mb-8 max-w-xl">
                Real-time monitoring, predictive AI, and community-powered reporting to protect lives across India's North Eastern Region — where landslides strike without warning.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/dashboard" className="btn-primary flex items-center gap-2">
                  View Live Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/reporting" className="btn-outline flex items-center gap-2">
                  Report an Incident
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                  </div>
                  8 States Monitored
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  </div>
                  AI Risk Scoring
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  </div>
                  Multilingual Alerts
                </div>
              </div>
            </div>

            {/* Right: Mini dashboard preview */}
            <div className="relative animate-fade-in" style={{animationDelay:'200ms'}}>
              <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-brand-600 to-brand-700 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-white/80" />
                    <span className="text-white font-medium text-sm">Risk Dashboard — Live</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-white/90 text-xs">Live</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-px bg-gray-100 border-b border-gray-100">
                  {[
                    {label:'Severe', count:5, color:'bg-red-50 text-red-600'},
                    {label:'High', count:12, color:'bg-orange-50 text-orange-600'},
                    {label:'Moderate', count:8, color:'bg-amber-50 text-amber-600'},
                  ].map(s => (
                    <div key={s.label} className={`${s.color} p-3 text-center`}>
                      <div className="text-xl font-bold">{s.count}</div>
                      <div className="text-xs">{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="p-4 space-y-2.5">
                  {[
                    {location:'NH-10 Teesta Valley, Sikkim', level:'Severe', color:'bg-red-500'},
                    {location:'Champhai Border Road, Mizoram', level:'Severe', color:'bg-red-500'},
                    {location:'Cherrapunji Village, Meghalaya', level:'Severe', color:'bg-red-500'},
                    {location:'Aizawl West Quarter, Mizoram', level:'High', color:'bg-orange-400'},
                    {location:'Senapati Hill Community, Manipur', level:'High', color:'bg-orange-400'},
                  ].map((a, i) => (
                    <div key={i} className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-gray-50">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`w-2 h-2 ${a.color} rounded-full flex-shrink-0 ${a.level==='Severe'?'animate-pulse':''}`} />
                        <span className="text-xs text-gray-700 truncate">{a.location}</span>
                      </div>
                      <span className={`text-xs font-semibold flex-shrink-0 px-2 py-0.5 rounded-full ${
                        a.level==='Severe' ? 'badge-severe risk-badge' : 'badge-high risk-badge'
                      }`}>{a.level}</span>
                    </div>
                  ))}
                </div>

                <div className="px-4 pb-4">
                  <Link to="/dashboard" className="block w-full text-center py-2.5 bg-brand-50 text-brand-600 font-medium text-sm rounded-xl hover:bg-brand-100 transition-colors">
                    Open Full Dashboard →
                  </Link>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg border border-gray-100 p-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Active Alerts</div>
                  <div className="font-bold text-gray-900 text-lg">6 Today</div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400">
            <span className="text-xs">Scroll to explore</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────────────────── */}
      <section className="border-y border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-100">
            <StatCard value={128}  label="Active Sensors"      icon={Activity}  color="bg-brand-600" />
            <StatCard value={340}  label="Villages Monitored"  icon={MapPin}    color="bg-indigo-600" />
            <StatCard value={6}    label="Alerts Issued Today"  icon={Zap}       color="bg-red-500" />
            <StatCard value={98}   label="System Uptime"        icon={BarChart2} color="bg-green-600" suffix="%" />
          </div>
        </div>
      </section>

      {/* ── PROBLEM SECTION & HOW IT WORKS ───────────────────────────────── */}
      <ProblemSection />
      <HowItWorks />

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-r from-brand-600 to-brand-700">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4" style={{fontFamily:'Poppins,sans-serif'}}>Ready to explore the platform?</h2>
          <p className="text-brand-100 mb-8 text-lg">Start with the Live Risk Dashboard to see all 40+ monitored locations across the NER region.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/dashboard" className="inline-flex items-center gap-2 bg-white text-brand-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-brand-50 transition-colors shadow-sm">
              Open Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/reporting" className="inline-flex items-center gap-2 bg-brand-500/40 hover:bg-brand-500/60 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors border border-white/20">
              Report an Incident
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
