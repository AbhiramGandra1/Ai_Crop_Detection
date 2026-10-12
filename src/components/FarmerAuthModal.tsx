import React, { useState } from 'react';
import { Farmer } from '../types';
import { INITIAL_FARMERS, DEMO_PASSWORD } from '../data/initialFarmers';
import { User, Phone, MapPin, CheckCircle, Shield, KeyRound, Sparkles, X } from 'lucide-react';

interface FarmerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentFarmer: Farmer;
  onSelectFarmer: (farmer: Farmer) => void;
}

export const FarmerAuthModal: React.FC<FarmerAuthModalProps> = ({
  isOpen,
  onClose,
  currentFarmer,
  onSelectFarmer
}) => {
  const [activeTab, setActiveTab] = useState<'quick' | 'login' | 'signup'>('quick');
  const [phoneInput, setPhoneInput] = useState('9876543210');
  const [passwordInput, setPasswordInput] = useState('1234');
  const [errorMessage, setErrorMessage] = useState('');

  // Signup form state
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newAcres, setNewAcres] = useState('3.0');
  const [newLang, setNewLang] = useState<'en' | 'hi' | 'te' | 'ta' | 'mr' | 'pa'>('en');

  if (!isOpen) return null;

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (passwordInput !== DEMO_PASSWORD) {
      setErrorMessage(`Invalid credentials. Demo password is "${DEMO_PASSWORD}"`);
      return;
    }

    const matchedFarmer = INITIAL_FARMERS.find(f => f.phone === phoneInput) || INITIAL_FARMERS[0];
    onSelectFarmer(matchedFarmer);
    onClose();
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) {
      setErrorMessage('Please fill in Farmer Name and Mobile Number.');
      return;
    }

    const createdFarmer: Farmer = {
      farmer_id: Math.floor(1000 + Math.random() * 9000),
      name: newName.trim(),
      phone: newPhone.trim(),
      location: newLocation.trim() || 'Khammam, Telangana',
      farm_size_acres: parseFloat(newAcres) || 2.5,
      preferred_language: newLang,
      created_at: new Date().toISOString()
    };

    onSelectFarmer(createdFarmer);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header with Accenture purple accent */}
        <div className="p-5 border-b border-slate-800 bg-gradient-to-r from-purple-950/40 via-slate-900 to-emerald-950/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Farmer Identification Portal</h3>
              <p className="text-xs text-slate-400">Accenture AgriVision Digital Agriculture Pass</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-3 border-b border-slate-800 bg-slate-950/50 text-sm">
          <button
            onClick={() => { setActiveTab('quick'); setErrorMessage(''); }}
            className={`py-3 font-medium transition border-b-2 flex items-center justify-center gap-1.5 ${
              activeTab === 'quick'
                ? 'border-purple-500 text-purple-400 bg-purple-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Quick Select
          </button>
          <button
            onClick={() => { setActiveTab('login'); setErrorMessage(''); }}
            className={`py-3 font-medium transition border-b-2 flex items-center justify-center gap-1.5 ${
              activeTab === 'login'
                ? 'border-purple-500 text-purple-400 bg-purple-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <KeyRound className="w-4 h-4" /> Demo Login (1234)
          </button>
          <button
            onClick={() => { setActiveTab('signup'); setErrorMessage(''); }}
            className={`py-3 font-medium transition border-b-2 flex items-center justify-center gap-1.5 ${
              activeTab === 'signup'
                ? 'border-purple-500 text-purple-400 bg-purple-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" /> New Sign Up
          </button>
        </div>

        <div className="p-6">
          {errorMessage && (
            <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
              <span className="font-semibold">Notice:</span> {errorMessage}
            </div>
          )}

          {/* Quick Select Tab */}
          {activeTab === 'quick' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400 mb-2">
                Select an existing registered farmer profile to proceed with preloaded agronomic field conditions:
              </p>
              {INITIAL_FARMERS.map((farmer) => {
                const isCurrent = farmer.farmer_id === currentFarmer.farmer_id;
                return (
                  <button
                    key={farmer.farmer_id}
                    onClick={() => {
                      onSelectFarmer(farmer);
                      onClose();
                    }}
                    className={`w-full p-3.5 rounded-xl border text-left transition flex items-center justify-between group ${
                      isCurrent
                        ? 'border-purple-500 bg-purple-950/30'
                        : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                        {farmer.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-white flex items-center gap-2">
                          {farmer.name}
                          {isCurrent && (
                            <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">
                              Active
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                          <span>{farmer.location}</span>
                          <span>•</span>
                          <span>{farmer.farm_size_acres} Acres</span>
                        </div>
                      </div>
                    </div>
                    <CheckCircle className={`w-5 h-5 ${isCurrent ? 'text-purple-400' : 'text-slate-600 group-hover:text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          )}

          {/* Demo Login Tab */}
          {activeTab === 'login' && (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div className="p-3 rounded-lg bg-purple-950/30 border border-purple-800/40 text-xs text-purple-300">
                <span className="font-semibold">Demo Credentials:</span> Enter any phone number (e.g. <code className="bg-purple-900/40 px-1 py-0.5 rounded">9876543210</code>) and Password <code className="bg-purple-900/60 px-1.5 py-0.5 rounded font-mono font-bold text-white">1234</code>.
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Farmer Mobile Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Security PIN / Password</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter 1234"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 font-mono tracking-widest"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-purple-600/25 transition active:scale-[0.98]"
              >
                Sign In to AgriVision
              </button>
            </form>
          )}

          {/* Random / New Signup Tab */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Farmer Full Name</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Balram Verma"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="e.g. 9845123890"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Location / District</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. Guntur, AP"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Farm Land (Acres)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="100"
                    value={newAcres}
                    onChange={(e) => setNewAcres(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Regional Dialect</label>
                <select
                  value={newLang}
                  onChange={(e) => setNewLang(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="en">English (Official)</option>
                  <option value="hi">हिन्दी (Hindi)</option>
                  <option value="te">తెలుగు (Telugu)</option>
                  <option value="ta">தமிழ் (Tamil)</option>
                  <option value="mr">मराठी (Marathi)</option>
                  <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm shadow-lg shadow-emerald-600/25 transition active:scale-[0.98]"
              >
                Register & Initialize Farm Record
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
