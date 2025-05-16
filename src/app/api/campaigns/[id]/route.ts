import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/client';

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { params } = context;
    const { id } = await params;

    const campaign = await prisma.campaign.findUnique({
      where: { id },
      include: {
        donations: {
          orderBy: { createdAt: 'desc' },
          take: 3,
        },
      },
    });

    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    const donationStats = await prisma.donation.aggregate({
      where: { campaignId: id },
      _sum: { amount: true },
      _count: true,
    });

    const totalDonated = Number(donationStats._sum.amount ?? 0);
    const donationCount = donationStats._count;
    const remainingAmount = Number(campaign.goalAmount) - totalDonated;

    return NextResponse.json({
      ...campaign,
      totalDonated,
      donationCount,
      remainingAmount,
      recentDonations: campaign.donations,
    });
  } catch (error) {
    console.error('[GET_CAMPAIGN_BY_ID_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
