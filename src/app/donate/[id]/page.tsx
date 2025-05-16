import { notFound } from 'next/navigation';
import Image from 'next/image';
import { mockCampaigns } from '@/lib/mock';
import DonateForm from './_components/DonateForm';

interface Params {
  id: string;
}

export const revalidate = 60;

export async function generateStaticParams() {
  return mockCampaigns.map((c) => ({
    id: c.id.toString(),
  }));
}

export default function DonatePage({ params }: { params: Params }) {
  const campaign = mockCampaigns.find((c) => c.id.toString() === params.id);
  if (!campaign) return notFound();

  return (
    <main className="main-container container mx-auto py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: hero image */}
        <div className="relative w-full h-96">
          <Image
            src={campaign.imageUrl}
            alt={campaign.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="text-4xl font-bold mb-4">{campaign.title}</h1>
          <p className="text-sm text-white/80 mb-2">
            Organized by{' '}
            <span className="font-medium">{campaign.beneficiary}</span>
          </p>
          <p className="text-sm text-white/80 mb-6">{campaign.story}</p>
          <div className="mb-6">
            <span className="text-lg font-semibold">
              ${campaign.amount.toLocaleString()}
            </span>{' '}
            needed
          </div>

          <DonateForm campaignId={Number(campaign.id)} />
        </div>
      </div>
    </main>
  );
}
