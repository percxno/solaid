'use client';
import { Input } from '@/components/ui/input';
import { useCreateCampaignStore } from '@/stores/useCreateCampaignStore';
import { useShallow } from 'zustand/shallow';

export function TitleStep() {
  const { title, setTitle } = useCreateCampaignStore(
    useShallow((s) => ({ title: s.title, setTitle: s.setTitle }))
  );

  return (
    <div className="space-y-4 w-2/3">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g. Help fund school fees in India"
      />
    </div>
  );
}
