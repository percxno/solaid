'use client';

import { useState } from 'react';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { XIcon } from 'lucide-react';
import { FlickeringGrid } from '@/components/magicui/flickering-grid';

interface DonationModalProps {
  amount: number;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (donorName: string, message: string) => void;
}

export default function DonationModal({
  amount,
  isOpen,
  onClose,
  onConfirm,
}: DonationModalProps) {
  const [donorName, setDonorName] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(donorName || 'Anonymous', message);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-black border border-white/20 rounded-lg w-full max-w-md z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <FlickeringGrid
            squareSize={2}
            gridGap={2}
            color="#FFFFFF"
            maxOpacity={0.2}
            flickerChance={0.5}
          />
        </div>

        <div className="p-6 relative z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
          >
            <XIcon size={18} />
          </button>

          <h3 className="text-2xl font-semibold mb-4">
            Complete Your Donation
          </h3>
          <p className="text-white/70 mb-6">
            You are about to donate{' '}
            <span className="font-bold text-primary">{amount} SOL</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label
                htmlFor="donorName"
                className="text-white/80 text-sm font-light"
              >
                Your Name (optional)
              </Label>
              <Input
                id="donorName"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="Anonymous"
                className="mt-1.5 bg-white/5 border-white/10 focus:border-white/30 transition-colors"
              />
            </div>

            <div>
              <Label
                htmlFor="message"
                className="text-white/80 text-sm font-light"
              >
                Message (optional)
              </Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add a message of support..."
                className="mt-1.5 h-24 bg-white/5 border-white/10 focus:border-white/30 transition-colors resize-none"
              />
            </div>

            <div className="flex gap-4 mt-8 pt-4 border-t border-white/10">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border border-white/20 hover:border-white bg-transparent text-white/80 hover:text-white h-12 transition-colors cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className={cn(
                  'flex-1',
                  'bg-[#1A1A1A] text-white hover:bg-white hover:text-black transition-colors duration-200',
                  'h-12 font-medium relative overflow-hidden cursor-pointer'
                )}
              >
                <span className="relative z-10">Confirm Donation</span>
                <FlickeringGrid
                  className="absolute inset-0 opacity-0 hover:opacity-75 transition-opacity duration-200"
                  squareSize={2}
                  gridGap={2}
                  color="#6B7280"
                  maxOpacity={0.3}
                  flickerChance={0.5}
                />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
