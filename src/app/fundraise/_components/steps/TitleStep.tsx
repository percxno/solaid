import { useState } from 'react';
import { Input } from '@/components/ui/input';

export function TitleStep() {
  const [title, setTitle] = useState('');
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
