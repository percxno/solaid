'use client';

import { useState } from 'react';
import DonateForm from './DonateForm';
import { DonationStats } from './DonationStats';

interface Campaign {
  id: string;
  title: string;
  story: string;
  goalAmount: number;
  category: string;
  mediaUrl: string;
  campaignOwnerName: string;
  walletAddress: string;
  totalDonated: number;
  donationCount: number;
  remainingAmount: number;
  recentDonations: Array<{
    id: string;
    amount: number;
    donorName: string;
    createdAt: string;
    campaignId: string;
  }>;
}

export default function DonateSection({
  initialCampaign,
}: {
  initialCampaign: Campaign;
}) {
  const [campaign, setCampaign] = useState<Campaign>(initialCampaign);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshCampaignData = async () => {
    try {
      setIsRefreshing(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/campaigns/${campaign.id}`
      );

      if (res.ok) {
        const updatedCampaign = await res.json();
        setCampaign(updatedCampaign);
      }
    } catch (error) {
      console.error('Failed to refresh campaign data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const percentFunded =
    Math.round((campaign.totalDonated / campaign.goalAmount) * 100) || 0;

  return (
    <div className="flex flex-col w-full">
      <p className="text-sm text-white/50 mb-6">{campaign.story}</p>
      <div className="mb-6 flex flex-col">
        <span className="text-lg font-semibold relative">
          {campaign.totalDonated.toString()} SOL raised
          {isRefreshing && (
            <span className="absolute top-0 -right-6 h-4 w-4">
              <span className="animate-ping absolute h-4 w-4 rounded-full bg-primary opacity-75"></span>
              <span className="relative rounded-full h-3 w-3 bg-primary"></span>
            </span>
          )}
        </span>
        <span className="text-xs text-white/50">
          {percentFunded}% of the {campaign.goalAmount.toString()} SOL goal
        </span>
      </div>

      <DonateForm
        campaignId={campaign.id}
        walletAddress={campaign.walletAddress}
        onDonationSuccess={refreshCampaignData}
      />
      <DonationStats campaignData={campaign} />
    </div>
  );
}
