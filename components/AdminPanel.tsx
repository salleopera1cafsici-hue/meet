
import React, { useState } from 'react';
import { mockService } from '../services/mockService';
import { UserRole, UserProfile } from '../types';
import { X, Trash2, ShieldCheck, UserPlus, Search, RefreshCw } from 'lucide-react';

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [users, setUsers] = useState<UserProfile[]>(mockService.getUsers());
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      mockService.deleteUser(id);
      setUsers(mockService.getUsers());
    }
  };

  const handlePromote = (id: string, role: UserRole) => {
    mockService.promoteUser(id, role);
    setUsers(mockService.getUsers());
    alert(`Rôle mis à jour avec succès!`);
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="absolute inset-0 z-[600] bg-slate-900 flex flex-col animate-in fade-in duration-300">
      <header className="p-6 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShieldCheck className="text-pink-500" /> Administration
          </h1>
          <p className="text-slate-400 text-sm">Gestion globale des utilisateurs MEETME</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400"><X /></button>
      </header>

      <div className="p-6 flex flex-col gap-6 flex-1 overflow-hidden">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Utilisateurs', val: users.length, color: 'text-blue-400' },
            { label: 'Online', val: users.filter(u => u.isOnline).length, color: 'text-green-400' },
            { label: 'Signalements', val: 0, color: 'text-red-400' },
            { label: 'Premium', val: users.filter(u => u.role === UserRole.PREMIUM).length, color: 'text-pink-400' },
          ].map((stat, i) => (
            <div key={i} className="bg-slate-800/50 p-4 rounded-2xl border border-slate-800">
              <p className="text-[10px] text-slate-500 uppercase font-bold">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.val}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex gap-4">
          <div className="flex-1 bg-slate-800 rounded-xl px-4 flex items-center gap-2 border border-slate-700">
            <Search size={18} className="text-slate-500" />
            <input 
              type="text" 
              placeholder="Chercher un utilisateur..." 
              className="bg-transparent border-none outline-none py-3 w-full text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="px-4 bg-slate-800 rounded-xl border border-slate-700 text-slate-400 hover:text-white transition-colors">
            <RefreshCw size={18} />
          </button>
        </div>

        {/* Table */}
        <div className="flex-1 bg-slate-800/30 rounded-2xl border border-slate-800 overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-800 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4">Utilisateur</th>
                  <th className="px-6 py-4">Statut</th>
                  <th className="px-6 py-4">Rôle</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-sm">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={user.avatarUrl} className="w-8 h-8 rounded-full border border-slate-700" alt="" />
                        <div>
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${user.isOnline ? 'bg-green-500/10 text-green-500' : 'bg-slate-700 text-slate-400'}`}>
                        {user.isOnline ? 'ONLINE' : 'OFFLINE'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-400">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handlePromote(user.id, UserRole.PREMIUM)}
                        className="p-2 text-slate-400 hover:text-pink-500 hover:bg-pink-500/10 rounded-lg transition-all"
                        title="Promouvoir Premium"
                      >
                        <UserPlus size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredUsers.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 p-20">
              <Search size={48} strokeWidth={1} className="mb-4 opacity-20" />
              <p>Aucun utilisateur trouvé</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
