import { create } from 'zustand';

interface User {
  id: string;
  username: string;
  totalPoints: number;
}

interface Skill {
  id: string;
  name: string;
  description: string;
  keystoneId: string;
  costPoints: number;
  position: { x: number; y: number };
  parentSkillId?: string;
}

interface TalentTree {
  id: string;
  name: string;
  keystoneColor: string;
  keystoneImage?: string;
  skills: Skill[];
}

interface UserSelection {
  userId: string;
  keystoneId: string;
  selectedSkills: string[];
  pointsSpent: number;
  savedAt?: string;
}

interface Store {
  user: User | null;
  setUser: (user: User | null) => void;
  trees: TalentTree[];
  setTrees: (trees: TalentTree[]) => void;
  userSelections: Map<string, UserSelection>;
  setUserSelections: (selections: Map<string, UserSelection>) => void;
}

export const useStore = create<Store>((set) => (({
  user: null,
  setUser: (user) => set({ user }),
  trees: [],
  setTrees: (trees) => set({ trees }),
  userSelections: new Map(),
  setUserSelections: (userSelections) => set({ userSelections }),
})));
