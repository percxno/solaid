import { create } from 'zustand';

export interface ICreateCampaignStore {
  category: string;
  setCategory: (category: string) => void;
  goalAmount: number;
  setGoalAmount: (goalAmount: number) => void;
  story: string;
  setStory: (story: string) => void;
  title: string;
  setTitle: (title: string) => void;
  mediaUrl: string;
  setMediaUrl: (mediaUrl: string) => void;
  email: string;
  setEmail: (email: string) => void;
  walletAddress: string;
  setWalletAddress: (walletAddress: string) => void;
}

export const useCreateCampaignStore = create<ICreateCampaignStore>((set) => ({
  category: '',
  setCategory: (category: string) => set({ category }),
  goalAmount: 0,
  setGoalAmount: (goalAmount: number) => set({ goalAmount }),
  story: '',
  setStory: (story: string) => set({ story }),
  title: '',
  setTitle: (title: string) => set({ title }),
  mediaUrl: '',
  setMediaUrl: (mediaUrl: string) => set({ mediaUrl }),
  email: '',
  setEmail: (email: string) => set({ email }),
  walletAddress: '',
  setWalletAddress: (walletAddress: string) => set({ walletAddress }),
}));
