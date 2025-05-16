import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

export function StoryStep() {
  const [story, setStory] = useState('');
  return (
    <div className="space-y-4">
      <Textarea
        rows={18}
        value={story}
        onChange={(e) => setStory(e.target.value)}
        placeholder="Tell your story here..."
        className="min-h-[400px] text-base"
      />
    </div>
  );
}
