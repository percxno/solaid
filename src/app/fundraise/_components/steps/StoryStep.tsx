'use client';
import { Textarea } from '@/components/ui/textarea';
import { useCreateCampaignStore } from '@/stores/useCreateCampaignStore';
import { useShallow } from 'zustand/shallow';

export function StoryStep() {
  const { story, setStory } = useCreateCampaignStore(
    useShallow((s) => ({ story: s.story, setStory: s.setStory }))
  );

  return (
    <div className="space-y-4">
      <Textarea
        rows={18}
        value={story}
        onChange={(e) => setStory(e.target.value)}
        placeholder="Tell your story here..."
        className="min-h-[400px] text-base p-5"
      />
    </div>
  );
}
