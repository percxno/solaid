import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

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
  campaignOwnerName: string;
  setCampaignOwnerName: (campaignOwnerName: string) => void;
  walletAddress: string;
  setWalletAddress: (walletAddress: string) => void;
}

export const useCreateCampaignStore = create<ICreateCampaignStore>()(
  devtools(
    persist(
      (set) => ({
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
        campaignOwnerName: '',
        setCampaignOwnerName: (campaignOwnerName: string) =>
          set({ campaignOwnerName }),
        walletAddress: '',
        setWalletAddress: (walletAddress: string) => set({ walletAddress }),
      }),
      {
        name: 'create-campaign-store',
      }
    )
  )
);
