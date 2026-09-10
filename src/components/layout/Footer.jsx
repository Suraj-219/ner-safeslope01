import { Link } from 'react-router-dom';
import { Shield, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-white text-sm" style={{fontFamily:'Poppins,sans-serif'}}>NER SafeSlope</div>
                <div className="text-xs text-brand-400">Early Warning Platform</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              AI-powered landslide early warning and monitoring system for India's North Eastern Region.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
              <span className="text-xs text-amber-400 font-medium">Prototype / Demo Build</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Platform</h4>
            <ul className="space-y-2 text-sm">
              {[
                {label:'Live Dashboard', path:'/dashboard'},
                {label:'Risk Analytics', path:'/analytics'},
                {label:'Field Reports',  path:'/reporting'},
                {label:'Alert Center',   path:'/alerts'},
                {label:'About',          path:'/about'},
              ].map(l => (
                <li key={l.path}>
                  <Link to={l.path} className="text-gray-400 hover:text-brand-400 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Agencies */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Relevant Authorities</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>National Disaster Management Authority (NDMA)</li>
              <li>State Disaster Management Authorities (SDMAs)</li>
              <li>District Disaster Management Authorities</li>
              <li>Geological Survey of India (GSI)</li>
              <li>India Meteorological Department (IMD)</li>
            </ul>
          </div>

          {/* Emergency contacts */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Emergency Contacts</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">NDMA Helpline</div>
                  <div className="text-gray-400">1070</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">National Emergency</div>
                  <div className="text-gray-400">112</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">Demo Contact</div>
                  <div className="text-gray-400">demo@nersafeslope.in</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 NER SafeSlope. Built for hackathon demonstration purposes only.</p>
          <p className="flex items-center gap-1">
            All data shown is simulated mock data.
            <span className="inline-flex items-center gap-1 ml-2 px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded border border-amber-500/20 font-medium">
              ⚠ Demo Data
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
