
export enum UserRole {
  USER = 'USER',
  PREMIUM = 'PREMIUM',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

export enum PhysicalTrait {
  FIT = 'Athlétique',
  AVERAGE = 'Normal',
  CURVY = 'Courbes',
  SLIM = 'Mince'
}

export enum SkinTone {
  FAIR = 'Clair',
  MEDIUM = 'Hâlé',
  DARK = 'Sombre',
  DEEP = 'Ébène'
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  age: number;
  gender: 'M' | 'F' | 'O';
  physicalTrait?: PhysicalTrait;
  skinTone?: SkinTone;
  role: UserRole;
  avatarUrl: string;
  photos: string[];
  themeColor: string;
  isOnline: boolean;
  isFlashAvailable: boolean; // "Flash" status for 1 hour
  reputation: number; // 0-5 stars
  location: {
    lat: number;
    lng: number;
  };
}

export interface MeetRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  timestamp: number;
}

export interface AppState {
  currentUser: UserProfile | null;
  users: UserProfile[];
  activeMeet: MeetRequest | null;
  view: 'auth' | 'map' | 'profile' | 'admin' | 'chat' | 'navigation';
  selectedUser: UserProfile | null;
}
