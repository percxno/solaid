import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { mockCampaigns } from '@/lib/mock';
import { categoryIconMap } from '@/lib/categories';
import DonateForm from './_components/DonateForm';
import { DonationStats } from './_components/DonationStats';

interface Params {
  id: string;
}

export const revalidate = 60;

export async function generateStaticParams() {
  return mockCampaigns.map((c) => ({
    id: c.id.toString(),
  }));
}

export default async function DonatePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const campaign = mockCampaigns.find((c) => c.id.toString() === id);
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
          <span className="font-medium">{campaign.beneficiary}</span>
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-20">
        <div className="relative w-full h-96">
          <Image
            src={campaign.imageUrl}
            alt={campaign.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-col w-full">
          <p className="text-sm text-white/50 mb-6">{campaign.story}</p>
          <div className="mb-6 flex flex-col">
            <span className="text-lg font-semibold">1,005 SOL raised</span>
            <span className="text-xs text-white/50">
              10% of the 10,000 SOL goal
            </span>
          </div>

          <DonateForm campaignId={Number(campaign.id)} />
          <DonationStats />
        </div>
      </div>
    </main>
  );
}
