import { useState } from 'react';

export function BeneficiaryStep() {
  const [selected, setSelected] = useState('');
  const options = [
    { label: 'Yourself', value: 'self', desc: 'Funds go to your account' },
    {
      label: 'Someone else',
      value: 'someone',
      desc: 'You’ll invite a beneficiary',
    },
  ];
  return (
    <div className="space-y-4">
      {options.map((opt) => (
        <div
          key={opt.value}
          className={`border p-4 rounded-lg cursor-pointer transition-colors duration-200 ${
            selected === opt.value
              ? 'bg-muted border-primary text-primary'
              : 'hover:bg-muted/50'
          }`}
          onClick={() => setSelected(opt.value)}
        >
          <div className="font-medium">{opt.label}</div>
          <div className="text-sm text-muted-foreground">{opt.desc}</div>
        </div>
      ))}
    </div>
  );
}
