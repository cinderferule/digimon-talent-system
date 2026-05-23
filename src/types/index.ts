export interface Keystone {
  id: string;
  name: string;
  color: string;
  imageUrl?: string;
  order: number;
}

export interface Skill {
  id: string;
  keystoneId: string;
  name: string;
  description: string;
  pointCost: number;
  x: number;
  y: number;
  parentSkillId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserSkillSelection {
  id: string;
  userId: string;
  keystoneId: string;
  selectedSkillIds: string[];
  pointsSpent: number;
  pointsAvailable: number;
  isSaved: boolean;
  savedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  username: string;
  totalPoints: number;
  createdAt: string;
  updatedAt: string;
}

export interface PointTransaction {
  id: string;
  userId: string;
  points: number;
  reason: string;
  adminId: string;
  createdAt: string;
}
