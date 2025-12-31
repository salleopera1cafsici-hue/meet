
import React from 'react';
import { UserProfile } from '../types';
import { 
  X, 
  MapPin, 
  Calendar, 
  Camera, 
  Heart, 
  MessageCircle, 
  Navigation,
  ShieldCheck,
  Star
} from 'lucide-react';

interface ProfileViewProps {
  user: UserProfile;
  onClose: () => void;
  onMeet: () => void;
  isMe?: boolean;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onClose, onMeet, isMe }) => {
  return (
    <div className="absolute inset-0 z-[500] bg-slate-950/40 backdrop-blur-sm flex flex-col sm:items-center sm:justify-center p-0 sm:p-4 animate-in fade-in duration-300">
      <div 
        className="w-full h-full sm:w-[450px] sm:h-[80%] bg-slate-900 sm:rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-slate-800 relative animate-in slide-in-from-bottom-8"
        style={{ borderColor: `${user.themeColor}33` }}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-900/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-slate-800 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Top Cover / Gallery */}
        <div className="h-2/5 relative shrink-0">
          <img 
            src={user.photos[0] || user.avatarUrl} 
            alt={user.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
          
          <div className="absolute bottom-4 left-4 flex items-center gap-3">
            <div className="w-16 h-16 rounded-full border-4 border-slate-900 overflow-hidden bg-slate-800">
              <img src={user.avatarUrl} className="w-full h-full object-cover" alt="Avatar" />
            </div>
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                {user.name}, {user.age}
                {user.reputation >= 4.5 && <ShieldCheck size={18} className="text-blue-400" />}
              </h2>
              <p className="text-slate-400 text-sm flex items-center gap-1">
                <MapPin size={12} /> À 2.4km de vous
              </p>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth">
          {/* Status Badge */}
          <div className="flex gap-2">
             <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${user.isOnline ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-slate-700/50 text-slate-500 border border-slate-700/50'}`}>
               <span className={`w-1.5 h-1.5 rounded-full ${user.isOnline ? 'bg-green-500' : 'bg-slate-500'}`}></span>
               {user.isOnline ? 'En ligne' : 'Hors ligne'}
             </span>
             {user.isFlashAvailable && (
               <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 flex items-center gap-1">
                 <Calendar size={10} /> Dispo maintenant
               </span>
             )}
          </div>

          {/* Reputation Section */}
          <div className="bg-slate-800/50 rounded-2xl p-4 flex items-center justify-between border border-slate-700/50">
            <div>
              <p className="text-xs text-slate-400 mb-1">Score de Fiabilité</p>
              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.round(user.reputation) ? 'currentColor' : 'none'} />
                ))}
                <span className="text-sm font-bold ml-1 text-white">{user.reputation}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Vérifié par</p>
              <p className="text-xs font-semibold text-pink-500 uppercase">Guardian</p>
            </div>
          </div>

          {/* Bio / Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Caractéristiques</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/30">
                <p className="text-[10px] text-slate-500 uppercase">Silhouette</p>
                <p className="text-sm font-medium">{user.physicalTrait || 'Non spécifié'}</p>
              </div>
              <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/30">
                <p className="text-[10px] text-slate-500 uppercase">Teint</p>
                <p className="text-sm font-medium">{user.skinTone || 'Non spécifié'}</p>
              </div>
            </div>
          </div>

          {/* Catalogue / Portfolio */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Catalogue Personnel</h3>
              <Camera size={16} className="text-slate-500" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {user.photos.length > 0 ? user.photos.map((p, i) => (
                <img key={i} src={p} className="aspect-square object-cover rounded-xl border border-slate-700" alt="Portfolio" />
              )) : (
                <div className="col-span-3 py-10 flex flex-col items-center justify-center text-slate-600 bg-slate-800/20 rounded-2xl border-2 border-dashed border-slate-800">
                  <Camera size={32} strokeWidth={1} className="mb-2" />
                  <p className="text-xs italic">Aucune photo partagée</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        {!isMe && (
          <div className="p-6 bg-slate-900 border-t border-slate-800 flex gap-3">
            <button className="flex-1 h-14 rounded-2xl bg-slate-800 hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 font-bold">
              <MessageCircle size={20} />
              <span>Chat</span>
            </button>
            <button 
              onClick={onMeet}
              className="flex-[1.5] h-14 rounded-2xl bg-pink-500 hover:bg-pink-600 transition-all transform active:scale-95 flex items-center justify-center gap-2 font-bold shadow-lg shadow-pink-500/20"
            >
              <Navigation size={20} className="fill-current" />
              <span>MEET NOW</span>
            </button>
          </div>
        )}

        {isMe && (
          <div className="p-6 bg-slate-900 border-t border-slate-800">
            <button className="w-full h-14 rounded-2xl border-2 border-slate-700 hover:bg-slate-800 transition-colors font-bold">
              Modifier mon profil
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView;
