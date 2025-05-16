'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function DonateForm({ campaignId }: { campaignId: number }) {
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
      <label className="font-medium">
        Donation Amount (USD)
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full mt-1 p-3 rounded-lg bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter amount"
          required
        />
      </label>
      <Button type="submit" disabled={loading} className="w-full h-12">
        {loading ? 'Processing…' : 'Donate Now'}
      </Button>
    </form>
  );
}
