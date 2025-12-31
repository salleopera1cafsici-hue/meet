
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { UserProfile } from '../types';

interface MapDisplayProps {
  users: UserProfile[];
  onUserClick: (user: UserProfile) => void;
}

const MapDisplay: React.FC<MapDisplayProps> = ({ users, onUserClick }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Initialize Map
    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false
    }).setView([48.8566, 2.3522], 13); // Default Paris

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19
    }).addTo(map);

    mapInstanceRef.current = map;

    // Cleanup
    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Sync Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove old markers not in current user list
    Object.keys(markersRef.current).forEach(id => {
      if (!users.find(u => u.id === id)) {
        markersRef.current[id].remove();
        delete markersRef.current[id];
      }
    });

    // Add/Update markers
    users.forEach(user => {
      const { id, location, avatarUrl, isOnline, isFlashAvailable, themeColor } = user;
      
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="relative group cursor-pointer">
            <div class="w-12 h-12 rounded-full border-4 ${isFlashAvailable ? 'animate-pulse' : ''}" style="border-color: ${themeColor}; overflow: hidden;">
              <img src="${avatarUrl}" class="w-full h-full object-cover grayscale-${isOnline ? '0' : '1'}" />
            </div>
            ${isFlashAvailable ? '<div class="absolute -top-1 -right-1 bg-yellow-400 text-slate-900 rounded-full p-0.5 text-[8px] font-bold">FLASH</div>' : ''}
            <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-slate-900 ${isOnline ? 'bg-green-500' : 'bg-slate-500'}"></div>
          </div>
        `,
        iconSize: [48, 48],
        iconAnchor: [24, 48]
      });

      if (markersRef.current[id]) {
        markersRef.current[id].setLatLng([location.lat, location.lng]);
        markersRef.current[id].setIcon(customIcon);
      } else {
        const marker = L.marker([location.lat, location.lng], { icon: customIcon })
          .addTo(map)
          .on('click', () => onUserClick(user));
        markersRef.current[id] = marker;
      }
    });
  }, [users, onUserClick]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full" />
      
      {/* Search & Filter Bar */}
      <div className="absolute top-4 left-4 right-4 z-[400] flex gap-2">
        <div className="flex-1 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 p-3 flex items-center gap-3 shadow-xl">
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <input 
            type="text" 
            placeholder="Rechercher à proximité..." 
            className="bg-transparent border-none outline-none text-sm w-full"
          />
        </div>
        <button className="bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 p-3 flex items-center justify-center text-pink-500 shadow-xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
        </button>
      </div>

      {/* Map Controls */}
      <div className="absolute right-4 bottom-10 z-[400] flex flex-col gap-2">
        <button className="w-10 h-10 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white shadow-lg">+</button>
        <button className="w-10 h-10 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white shadow-lg">-</button>
        <button className="w-10 h-10 rounded-xl bg-pink-500 text-white flex items-center justify-center shadow-lg mt-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        </button>
      </div>
    </div>
  );
};

export default MapDisplay;
