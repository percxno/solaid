import { useState } from 'react';

import { cn } from '@/lib/utils';
import { FlickeringGrid } from '@/components/magicui/flickering-grid';

export function BeneficiaryStep() {
  const [selected, setSelected] = useState('');
  const options = [
    { label: 'Yourself', value: 'self', desc: 'Funds go to your account' },
    {
      label: 'Someone else',
      value: 'someone',
      desc: `You’ll invite a beneficiary`,
    },
  ];
  return (
    <div className="flex w-[400px]">
      {options.map((opt, index) => (
        <div
          key={opt.value}
          className={cn(
            'aspect-square cursor-pointer relative flex flex-col p-6 hover:text-primary transition-colors',
            'border',
            index === 0 && 'border-r-0',
            selected === opt.value ? 'text-primary' : 'text-white/50'
          )}
          onClick={() => setSelected(opt.value)}
        >
          <span className="text-lg font-light">{opt.label}</span>
          <div className="text-xs">{opt.desc}</div>
          <FlickeringGrid
            className={cn(
              'absolute top-0 left-0 w-full h-full hover:opacity-75 transition-opacity duration-200',
              selected === opt.value ? 'opacity-75' : 'opacity-0'
            )}
            squareSize={2}
            gridGap={2}
            color="#6B7280"
            maxOpacity={0.3}
            flickerChance={0.5}
          />
        </div>
      ))}
    </div>
  );
}
