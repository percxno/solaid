import { useState, useId } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function GoalStep() {
  const id = useId();
  const [goal, setGoal] = useState('');
  return (
    <section>
      <div className="*:not-first:mt-2 w-1/3">
        <Label htmlFor={id}>Your Starting Goal</Label>
        <div className="relative">
          <Input
            id={id}
            className="peer ps-6 pe-12"
            type="number"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="Enter amount"
          />
          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
            $
          </span>
          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
            USD
          </span>
        </div>
      </div>
    </section>
  );
}
