'use client';

import React, { useId, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function DonateForm({ campaignId }: { campaignId: number }) {
  const id = useId();
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) return;
    setLoading(true);
    try {
      // TODO: call your real donation API here
      console.log('Donating', amount, 'to campaign', campaignId);
      // on success: show a thank-you message or redirect…
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="*:not-first:mt-2 w-2/3">
        <Label htmlFor={id}> Donation Amount (SOL)</Label>
        <div className="relative">
          <Input
            id={id}
            className="peer ps-6 pe-12"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount"
          />
          <span className="text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50">
            SOL
          </span>
        </div>
      </div>
      <div className="flex justify-end gap-5">
        <Button
          variant="outline"
          className="flex-1 mt-5 text-base cursor-pointer rounded-[6px] h-12 px-10"
        >
          Share
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className={cn(
            'flex-1',
            'bg-[#1A1A1A] text-white hover:bg-white hover:text-black transition-colors duration-200',
            'text-base mt-5 rounded-[6px] h-12 px-10 cursor-pointer'
          )}
        >
          {loading ? 'Processing…' : 'Donate Now'}
        </Button>
      </div>
    </form>
  );
}
