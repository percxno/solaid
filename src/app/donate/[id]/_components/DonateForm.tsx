'use client';

import React, { useId, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import DonationModal from './DonationModal';

export default function DonateForm({
  campaignId,
  walletAddress,
  onDonationSuccess,
}: {
  campaignId: string;
  walletAddress: string;
  onDonationSuccess?: () => void;
}) {
  const id = useId();

  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Separate Solana transaction and API call
  const sendSolanaTransaction = async (): Promise<string> => {
    if (!publicKey) {
      throw new Error('Wallet not connected');
    }

    try {
      const recipientPubKey = new PublicKey(walletAddress);

      const transaction = new Transaction();
      const sendSolInstruction = SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: recipientPubKey,
        lamports: amount * LAMPORTS_PER_SOL,
      });

      transaction.add(sendSolInstruction);

      const signature = await sendTransaction(transaction, connection);
      console.log(`Transaction signature: ${signature}`);

      // TODO: Confirm if the transaction is successful

      return signature;
    } catch (error) {
      console.error('Transaction failed', error);
      throw error;
    }
  };

  // Record donation in the database after successful transaction
  const recordDonation = async (
    transactionId: string,
    donorName: string,
    message: string
  ) => {
    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campaignId,
          amount,
          walletAddress: publicKey?.toString(),
          transactionId,
          donorName,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to record donation');
      }

      return await response.json();
    } catch (error) {
      console.error('API error:', error);
      throw error;
    }
  };

  const handleDonateClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) return;

    setIsModalOpen(true);
  };

  const handleModalConfirm = async (donorName: string, message: string) => {
    setIsModalOpen(false);
    setLoading(true);

    try {
      const transactionId = await sendSolanaTransaction();

      await recordDonation(transactionId, donorName, message);

      if (onDonationSuccess) {
        onDonationSuccess();
      }
    } catch (err) {
      console.error('Donation process failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleDonateClick} className="flex flex-col gap-4">
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
            disabled={loading || !publicKey}
            className={cn(
              'flex-1',
              'bg-[#1A1A1A] text-white hover:bg-white hover:text-black transition-colors duration-200',
              'text-base mt-5 rounded-[6px] h-12 px-10 cursor-pointer'
            )}
          >
            {loading
              ? 'Processing…'
              : publicKey
                ? 'Donate Now'
                : 'Connect Wallet'}
          </Button>
        </div>
      </form>

      <DonationModal
        amount={amount}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleModalConfirm}
      />
    </>
  );
}
