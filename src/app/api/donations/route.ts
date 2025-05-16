import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      amount,
      walletAddress,
      campaignId,
      email = null,
      message = null,
    } = body;

    if (!amount || !walletAddress || !campaignId) {
      return NextResponse.json(
        { error: 'Missing required fields: amount, walletAddress, campaignId' },
        { status: 400 }
      );
    }

    const donation = await prisma.donation.create({
      data: {
        amount,
        walletAddress,
        campaignId,
        email,
        message,
      },
    });

    return NextResponse.json(donation, { status: 201 });
  } catch (error) {
    console.error('[DONATION_POST_ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
