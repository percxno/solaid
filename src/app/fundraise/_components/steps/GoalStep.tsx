import { useState } from 'react';
import { Input } from '@/components/ui/input';

export function GoalStep() {
  const [goal, setGoal] = useState('');
  return (
    <div className="space-y-4">
      <Input
        type="number"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Your Starting Goal"
      />
    </div>
  );
}
