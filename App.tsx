
import React, { useState, useEffect, useCallback } from 'react';
import { UserProfile, UserRole, MeetRequest } from './types';
import { mockService } from './services/mockService';
import { SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASS } from './constants';
import MapDisplay from './components/MapDisplay';
import AuthView from './components/AuthView';
import ProfileView from './components/ProfileView';
import AdminPanel from './components/AdminPanel';
import NavigationUI from './components/NavigationUI';
import { 
  Map as MapIcon, 
  User, 
  Settings, 
  MessageSquare, 
  Bell, 
  ShieldAlert,
  Zap
} from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [view, setView] = useState<'auth' | 'map' | 'profile' | 'admin' | 'chat' | 'navigation'>('auth');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [activeMeet, setActiveMeet] = useState<MeetRequest | null>(null);
  const [notifications, setNotifications] = useState<MeetRequest[]>([]);
  const [users, setUsers] = useState<UserProfile[]>(mockService.getUsers());

  // Handle Auth
  const handleLogin = (email: string, pass: string) => {
    if (email === SUPER_ADMIN_EMAIL && pass === SUPER_ADMIN_PASS) {
      const admin: UserProfile = {
        id: 'admin-0',
        email,
        name: 'Super Admin',
        age: 99,
        gender: 'O',
        role: UserRole.SUPER_ADMIN,
        avatarUrl: 'https://picsum.photos/seed/admin/200',
        photos: [],
        themeColor: '#0f172a',
        isOnline: true,
        isFlashAvailable: false,
        reputation: 5.0,
        location: { lat: 48.8566, lng: 2.3522 }
      };
      setCurrentUser(admin);
      setView('map');
    } else {
      // Mock basic user login
      const user: UserProfile = {
        id: 'user-' + Date.now(),
        email,
        name: email.split('@')[0],
        age: 25,
        gender: 'M',
        role: UserRole.USER,
        avatarUrl: 'https://picsum.photos/seed/user/200',
        photos: [],
        themeColor: '#ec4899',
        isOnline: true,
        isFlashAvailable: false,
        reputation: 0,
        location: { lat: 48.8584, lng: 2.2945 } // Eiffel Tower
      };
      setCurrentUser(user);
      setView('map');
    }
  };

  // Mock Notification Polling
  useEffect(() => {
    if (!currentUser) return;
    const interval = setInterval(() => {
      // Logic to check for new meet requests targeting us
    }, 5000);
    return () => clearInterval(interval);
  }, [currentUser]);

  const handleMeetRequest = (targetUser: UserProfile) => {
    if (!currentUser) return;
    const meet = mockService.createMeetRequest(currentUser.id, targetUser.id);
    alert(`Meet request sent to ${targetUser.name}!`);
    // In a real app, this would send a push via FCM
  };

  const handleAcceptMeet = (meet: MeetRequest) => {
    const updated = mockService.acceptMeet(meet.id);
    if (updated) {
      setActiveMeet(updated);
      setView('navigation');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setView('auth');
  };

  if (view === 'auth') return <AuthView onLogin={handleLogin} />;

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-900 overflow-hidden relative">
      {/* Header */}
      <header className="h-16 border-b border-slate-800 flex items-center justify-between px-4 z-50 bg-slate-900/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-pink-500 flex items-center justify-center font-bold text-lg">M</div>
          <span className="font-bold text-xl tracking-tighter">MEETME</span>
        </div>
        
        <div className="flex items-center gap-4">
          {currentUser?.role === UserRole.SUPER_ADMIN && (
            <button 
              onClick={() => setView('admin')}
              className={`p-2 rounded-full transition-colors ${view === 'admin' ? 'bg-pink-500 text-white' : 'hover:bg-slate-800 text-slate-400'}`}
            >
              <ShieldAlert size={20} />
            </button>
          )}
          <button className="p-2 rounded-full hover:bg-slate-800 text-slate-400 relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
            <img 
              src={currentUser?.avatarUrl} 
              alt="Avatar" 
              className="w-8 h-8 rounded-full object-cover border-2 border-slate-700" 
            />
            <div className="hidden sm:block">
              <p className="text-xs font-semibold leading-none">{currentUser?.name}</p>
              <p className="text-[10px] text-slate-500 leading-none mt-1 uppercase tracking-wider">{currentUser?.role}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main View Area */}
      <main className="flex-1 relative">
        {view === 'map' && (
          <MapDisplay 
            users={users} 
            onUserClick={(u) => {
              setSelectedUser(u);
              setView('profile');
            }} 
          />
        )}
        
        {view === 'profile' && selectedUser && (
          <ProfileView 
            user={selectedUser} 
            onClose={() => setView('map')} 
            onMeet={() => handleMeetRequest(selectedUser)}
            isMe={currentUser?.id === selectedUser.id}
          />
        )}

        {view === 'admin' && currentUser?.role === UserRole.SUPER_ADMIN && (
          <AdminPanel 
            onClose={() => setView('map')} 
          />
        )}

        {view === 'navigation' && activeMeet && (
          <NavigationUI 
            meet={activeMeet} 
            onClose={() => setView('map')} 
            users={users}
          />
        )}
      </main>

      {/* Navigation Dock */}
      <nav className="h-20 bg-slate-900 border-t border-slate-800 flex items-center justify-around px-2 sm:px-12 z-50">
        <button onClick={() => setView('map')} className={`flex flex-col items-center gap-1 transition-colors ${view === 'map' ? 'text-pink-500' : 'text-slate-500'}`}>
          <MapIcon size={24} />
          <span className="text-[10px] font-medium uppercase">Explorer</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-500 opacity-50 cursor-not-allowed">
          <MessageSquare size={24} />
          <span className="text-[10px] font-medium uppercase">Chats</span>
        </button>
        <div className="relative -mt-10">
          <button className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-violet-500 shadow-lg shadow-pink-500/20 flex items-center justify-center text-white border-4 border-slate-900 transition-transform hover:scale-105 active:scale-95">
            <Zap size={28} fill="currentColor" />
          </button>
        </div>
        <button onClick={() => { setSelectedUser(currentUser); setView('profile'); }} className={`flex flex-col items-center gap-1 transition-colors ${view === 'profile' && selectedUser?.id === currentUser?.id ? 'text-pink-500' : 'text-slate-500'}`}>
          <User size={24} />
          <span className="text-[10px] font-medium uppercase">Profil</span>
        </button>
        <button onClick={logout} className="flex flex-col items-center gap-1 text-slate-500 hover:text-red-400">
          <Settings size={24} />
          <span className="text-[10px] font-medium uppercase">Quitter</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
