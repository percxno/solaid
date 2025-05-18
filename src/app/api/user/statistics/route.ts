import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/client';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const walletAddress = searchParams.get('walletAddress');
    const email = searchParams.get('email');

    if (!walletAddress && !email) {
      return NextResponse.json(
        { error: 'Either wallet address or email is required' },
        { status: 400 }
      );
    }

    const donationStats = await prisma.donation.aggregate({
      where: {
        walletAddress: walletAddress || '',
      },
      _sum: { amount: true },
      _count: true,
    });

    const campaignsCreated = email
      ? await prisma.campaign.count({
          where: { email },
        })
      : 0;

    const donatedCampaignsCount = await prisma.donation.groupBy({
      by: ['campaignId'],
      where: {
        walletAddress: walletAddress || '',
      },
      _count: true,
    });

    const recentDonation = await prisma.donation.findFirst({
      where: {
        walletAddress: walletAddress || '',
      },
      include: {
        campaign: {
          select: {
            id: true,
            title: true,
            category: true,
            mediaUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const recentCampaign = email
      ? await prisma.campaign.findFirst({
          where: { email },
          orderBy: {
            createdAt: 'desc',
          },
        })
      : null;

    const totalDonated = Number(donationStats._sum.amount || 0);
    const totalDonationCount = donationStats._count;
    const uniqueCampaignsDonatedTo = donatedCampaignsCount.length;

    const userStats = {
      totalDonated,
      totalDonationCount,
      uniqueCampaignsDonatedTo,
      campaignsCreated,
      recentActivity: {
        recentDonation,
        recentCampaign,
      },
    };

    return NextResponse.json(userStats, { status: 200 });
  } catch (error) {
    console.error('[USER_STATISTICS_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to fetch user statistics' },
      { status: 500 }
    );
  }
}
