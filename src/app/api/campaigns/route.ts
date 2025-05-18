import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      story,
      goalAmount,
      category,
      mediaUrl,
      email,
      campaignOwnerName,
      walletAddress,
    } = body;

    if (
      !title ||
      !story ||
      !goalAmount ||
      !category ||
      !email ||
      !walletAddress ||
      !campaignOwnerName
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const campaign = await prisma.campaign.create({
      data: {
        title,
        story,
        goalAmount,
        category,
        mediaUrl,
        email,
        walletAddress,
        campaignOwnerName,
      },
    });

    return NextResponse.json(campaign, { status: 201 });
  } catch (error) {
    console.error('[CAMPAIGN_CREATE_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get('email');
    const category = url.searchParams.get('category');

    const whereClause = email ? { email } : category ? { category } : undefined;

    const campaigns = await prisma.campaign.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(campaigns, { status: 200 });
  } catch (error) {
    console.error('[CAMPAIGN_FETCH_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to fetch campaigns' },
      { status: 500 }
    );
  }
}
