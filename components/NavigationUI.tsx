
import React, { useState, useEffect } from 'react';
import { MeetRequest, UserProfile } from '../types';
import { 
  Navigation, 
  X, 
  ShieldAlert, 
  MapPin, 
  ArrowUp, 
  MessageCircle,
  Vibrate,
  CheckCircle2
} from 'lucide-react';

interface NavigationUIProps {
  meet: MeetRequest;
  users: UserProfile[];
  onClose: () => void;
}

const NavigationUI: React.FC<NavigationUIProps> = ({ meet, users, onClose }) => {
  const [distance, setDistance] = useState(2400); // meters
  const [eta, setEta] = useState(8); // minutes
  const [isArrived, setIsArrived] = useState(false);
  const targetUser = users.find(u => u.id === meet.toUserId || u.id === meet.fromUserId);

  // Simulation of movement
  useEffect(() => {
    const timer = setInterval(() => {
      setDistance(prev => {
        if (prev <= 50) {
          setIsArrived(true);
          return 0;
        }
        return prev - 50;
      });
      setEta(prev => Math.max(0, Math.ceil(distance / 300)));
    }, 2000);

    return () => clearInterval(timer);
  }, [distance]);

  if (!targetUser) return null;

  return (
    <div className="absolute inset-0 z-[700] bg-slate-900 flex flex-col">
      {/* Map Background (Simple Placeholder) */}
      <div className="flex-1 bg-slate-950 relative overflow-hidden flex items-center justify-center">
        {/* Animated Grid lines for map feel */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        {/* Connection Line */}
        <div className="absolute w-[2px] h-48 bg-pink-500/50 -rotate-45 animate-pulse"></div>

        {/* User Markers */}
        <div className="relative flex flex-col items-center gap-2 -translate-x-10 -translate-y-10">
          <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-800 flex items-center justify-center font-bold text-xs">Moi</div>
          <div className="text-[10px] font-bold text-white/50 uppercase">Position Actuelle</div>
        </div>

        <div className="relative flex flex-col items-center gap-2 translate-x-10 translate-y-10">
          <div className="w-14 h-14 rounded-full border-4 border-pink-500 overflow-hidden shadow-2xl shadow-pink-500/20">
            <img src={targetUser.avatarUrl} className="w-full h-full object-cover" alt="" />
          </div>
          <div className="text-xs font-bold text-pink-500 uppercase tracking-widest">{targetUser.name}</div>
        </div>

        {/* Proximity Vibration Indicator */}
        {distance <= 50 && distance > 0 && (
          <div className="absolute inset-0 flex items-center justify-center animate-ping pointer-events-none">
            <div className="w-64 h-64 border-4 border-pink-500 rounded-full opacity-20"></div>
          </div>
        )}
      </div>

      {/* Navigation Info Panel */}
      <div className="bg-slate-900 border-t border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Navigation className="rotate-45" />
            </div>
            <div>
              <p className="text-2xl font-black">{distance}m</p>
              <p className="text-slate-400 text-sm font-medium">Arrivée dans {eta} min</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400"
          >
            <X size={20} />
          </button>
        </div>

        {/* Instruction */}
        <div className="bg-slate-800/50 rounded-2xl p-4 flex items-center gap-4 border border-slate-700/50">
          <div className="p-3 bg-pink-500/10 rounded-xl text-pink-500">
            <ArrowUp size={24} strokeWidth={3} />
          </div>
          <div>
            <p className="font-bold text-lg">Continuez tout droit</p>
            <p className="text-sm text-slate-500">Vers la position de {targetUser.name}</p>
          </div>
        </div>

        {/* Proximity Mode / Guardian */}
        <div className="grid grid-cols-2 gap-3">
          <button className="h-14 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm">
            <ShieldAlert size={18} />
            <span>ALERTE GUARDIAN</span>
          </button>
          
          {isArrived ? (
            <button className="h-14 bg-green-500 text-white rounded-2xl flex items-center justify-center gap-2 font-bold text-sm shadow-lg shadow-green-500/20 animate-bounce">
              <CheckCircle2 size={18} />
              <span>JE SUIS ICI !</span>
            </button>
          ) : (
            <button className="h-14 bg-slate-800 text-white rounded-2xl flex items-center justify-center gap-2 font-bold text-sm border border-slate-700">
              <MessageCircle size={18} />
              <span>MESSAGE</span>
            </button>
          )}
        </div>

        {distance <= 50 && distance > 0 && (
          <div className="bg-pink-500 p-3 rounded-xl flex items-center justify-center gap-2 text-white font-bold animate-pulse">
            <Vibrate size={20} />
            <span>ICEBREAKER ACTIVÉ : PROXIMITÉ !</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationUI;
