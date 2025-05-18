import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/client';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const walletAddress = searchParams.get('walletAddress');

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    const donations = await prisma.donation.findMany({
      where: {
        walletAddress: walletAddress,
      },
      include: {
        campaign: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const campaignMap = new Map();

    donations.forEach((donation) => {
      const campaignId = donation.campaignId;

      if (!campaignMap.has(campaignId)) {
        campaignMap.set(campaignId, {
          campaign: donation.campaign,
          donations: [donation],
          totalDonated: Number(donation.amount),
        });
      } else {
        const existingData = campaignMap.get(campaignId);
        existingData.donations.push(donation);
        existingData.totalDonated += Number(donation.amount);
        campaignMap.set(campaignId, existingData);
      }
    });

    const donatedCampaigns = Array.from(campaignMap.values());

    return NextResponse.json(donatedCampaigns, { status: 200 });
  } catch (error) {
    console.error('[USER_DONATIONS_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to fetch user donations' },
      { status: 500 }
    );
  }
}
