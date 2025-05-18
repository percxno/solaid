import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/client';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const campaigns = await prisma.campaign.findMany({
      where: {
        email: email,
      },
      include: {
        donations: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 5, 
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const campaignsWithStats = await Promise.all(
      campaigns.map(async (campaign) => {
        const donationStats = await prisma.donation.aggregate({
          where: { campaignId: campaign.id },
          _sum: { amount: true },
          _count: true,
        });

        const totalDonated = Number(donationStats._sum.amount || 0);
        const donationCount = donationStats._count;
        const percentComplete = Math.round(
          (totalDonated / Number(campaign.goalAmount)) * 100
        );
        const remainingAmount = Math.max(
          0,
          Number(campaign.goalAmount) - totalDonated
        );

        return {
          ...campaign,
          totalDonated,
          donationCount,
          percentComplete,
          remainingAmount,
        };
      })
    );

    return NextResponse.json(campaignsWithStats, { status: 200 });
  } catch (error) {
    console.error('[USER_CAMPAIGNS_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to fetch user campaigns' },
      { status: 500 }
    );
  }
}
