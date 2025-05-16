import { useState } from 'react';

import { cn } from '@/lib/utils';
import { categories } from '@/lib/categories';

export function CategoryStep() {
  const [selected, setSelected] = useState('');
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 border border-muted rounded-lg divide-x divide-y overflow-hidden">
      {categories.map(({ name, icon: Icon }) => (
        <div
          key={name}
          className={cn(
            'aspect-square p-6 flex flex-col justify-between items-start cursor-pointer hover:bg-muted transition-colors',
            selected === name ? 'text-primary' : 'text-muted-foreground'
          )}
          onClick={() => setSelected(name)}
        >
          <Icon size={24} />
          <span className="text-base font-medium mt-auto">{name}</span>
        </div>
      ))}
    </div>
  );
}
