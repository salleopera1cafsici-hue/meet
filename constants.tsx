
import React from 'react';

export const SUPER_ADMIN_EMAIL = "m.wilfriedkonan@gmail.com";
export const SUPER_ADMIN_PASS = "+225GueuSarah";

export const COLORS = {
  primary: '#ec4899', // Pink-500
  secondary: '#8b5cf6', // Violet-500
  accent: '#06b6d4', // Cyan-500
  background: '#0f172a',
  surface: '#1e293b'
};

export const MOCK_USERS: any[] = [
  {
    id: '1',
    name: 'Sarah',
    age: 24,
    gender: 'F',
    role: 'USER',
    avatarUrl: 'https://picsum.photos/seed/sarah/200',
    photos: ['https://picsum.photos/seed/sarah1/400', 'https://picsum.photos/seed/sarah2/400'],
    themeColor: '#ec4899',
    isOnline: true,
    isFlashAvailable: true,
    reputation: 4.8,
    location: { lat: 48.8566, lng: 2.3522 } // Paris
  },
  {
    id: '2',
    name: 'Marc',
    age: 28,
    gender: 'M',
    role: 'PREMIUM',
    avatarUrl: 'https://picsum.photos/seed/marc/200',
    photos: ['https://picsum.photos/seed/marc1/400'],
    themeColor: '#3b82f6',
    isOnline: true,
    isFlashAvailable: false,
    reputation: 4.5,
    location: { lat: 48.8606, lng: 2.3376 }
  },
  {
    id: '3',
    name: 'Yasmine',
    age: 22,
    gender: 'F',
    role: 'USER',
    avatarUrl: 'https://picsum.photos/seed/yas/200',
    photos: [],
    themeColor: '#8b5cf6',
    isOnline: false,
    isFlashAvailable: false,
    reputation: 5.0,
    location: { lat: 48.8534, lng: 2.3488 }
  }
];
