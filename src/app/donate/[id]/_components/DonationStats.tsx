import { ArrowUpRightIcon, HeartIcon, StarIcon } from 'lucide-react';
import Link from 'next/link';

const mockStats = {
  totalDonors: 721,
  recent: [
    { name: 'Noelle Jamieson', amount: 5, label: 'Recent donation' },
    { name: 'Anonymous', amount: 525, label: 'Top donation' },
    { name: 'Nicole Hughes', amount: 20, label: 'First donation' },
  ],
};

export function DonationStats() {
  return (
    <div className="mt-8 p-6 bg-white/5 rounded-lg w-full max-w-md">
      {/* total count */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-full">
          <ArrowUpRightIcon size={20} className="text-purple-600" />
        </div>
        <h3 className="text-lg font-semibold text-purple-600">
          {mockStats.totalDonors} people just donated
        </h3>
      </div>

      {/* recent donations */}
      <ul className="space-y-4">
        {mockStats.recent.map((d, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="p-2 bg-white/10 rounded-full">
              <HeartIcon size={18} className="text-black" />
            </div>
            <div>
              <p className="font-medium text-white">{d.name}</p>
              <p className="text-sm text-white/70">
                ${d.amount.toLocaleString()}{' '}
                <Link href="#" className="underline">
                  {d.label}
                </Link>
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* action buttons */}
      <div className="mt-6 flex gap-3">
        <button className="flex-1 py-2 border border-white/30 rounded-lg">
          See all
        </button>
        <button className="flex-1 py-2 border border-white/30 rounded-lg flex items-center justify-center gap-2">
          <StarIcon size={16} className="text-white" />
          See top
        </button>
      </div>
    </div>
  );
}
