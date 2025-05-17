import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { categoryIconMap } from '@/lib/categories';
import DonateSection from './_components/DonateSection';

interface Params {
  id: string;
}

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

export const revalidate = 10;

export default async function DonatePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;

  // Fetch campaign data from API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/campaigns/${id}`,
    { next: { revalidate: 10 } }
  );

  if (!res.ok) {
    if (res.status === 404) return notFound();
    throw new Error(`Failed to fetch campaign: ${res.statusText}`);
  }

  const campaign: Campaign = await res.json();

  if (!campaign) return notFound();

  const Icon = categoryIconMap[campaign.category];

  return (
    <main className="main-container container items-center flex-col">
      <section className="flex flex-col mt-32 gap-10 justify-between bg-transparent w-full">
        <p className="flex gap-2 items-center font-light text-white/50 text-xs">
          <Link
            href={`/campaigns/${campaign.category}`}
            className="hover:underline flex gap-2 items-center"
          >
            / {campaign.category.toUpperCase()}{' '}
            <span>
              <Icon size={12} />{' '}
            </span>{' '}
          </Link>
          - {campaign.id}
        </p>
        <h4 className="text-3xl mt-5 w-2/3 font-semibold text-white/80">
          {campaign.title}
        </h4>
        <p className="text-sm text-white/50">
          Organized by{' '}
          <span className="font-medium">{campaign.campaignOwnerName}</span>
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-20">
        <div className="relative w-full h-96">
          <Image
            src={campaign.mediaUrl || '/placeholder.jpg'}
            alt={campaign.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Client component for handling donations and refreshing data */}
        <DonateSection initialCampaign={campaign} />
      </div>
    </main>
  );
}
