
import { UserProfile, MeetRequest, UserRole } from '../types';
import { MOCK_USERS } from '../constants';

class MockService {
  private users: UserProfile[] = [...MOCK_USERS];
  private meets: MeetRequest[] = [];

  getUsers(): UserProfile[] {
    return this.users;
  }

  updateUserLocation(userId: string, lat: number, lng: number) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.location = { lat, lng };
    }
  }

  createMeetRequest(fromId: string, toId: string): MeetRequest {
    const meet: MeetRequest = {
      id: Math.random().toString(36).substr(2, 9),
      fromUserId: fromId,
      toUserId: toId,
      status: 'pending',
      timestamp: Date.now()
    };
    this.meets.push(meet);
    return meet;
  }

  acceptMeet(meetId: string): MeetRequest | null {
    const meet = this.meets.find(m => m.id === meetId);
    if (meet) {
      meet.status = 'accepted';
      return meet;
    }
    return null;
  }

  deleteUser(userId: string) {
    this.users = this.users.filter(u => u.id !== userId);
  }

  promoteUser(userId: string, role: UserRole) {
    const user = this.users.find(u => u.id === userId);
    if (user) user.role = role;
  }
}

export const mockService = new MockService();
