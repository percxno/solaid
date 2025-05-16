import { Button } from '@/components/ui/button';
import { ArrowUpRightIcon, HeartIcon, StarIcon } from 'lucide-react';

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
    <div className="mt-8 p-6 bg-white/5 rounded-lg w-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-white/10 rounded-full">
          <ArrowUpRightIcon size={20} />
        </div>
        <h3 className="text-lg font-semibold">
          {mockStats.totalDonors} people just donated
        </h3>
      </div>

      <ul className="space-y-4">
        {mockStats.recent.map((d, i) => (
          <li key={i} className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-full">
              <HeartIcon size={18} className="text-black" />
            </div>
            <div>
              <p className="font-medium text-white">{d.name}</p>
              <p className="text-sm text-white/70">
                ${d.amount.toLocaleString()}{' '}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex gap-3">
        <Button
          variant="outline"
          className="w-1/2 mt-5 text-base cursor-pointer rounded-[6px] h-12 px-10 bg-transparent"
        >
          See all
        </Button>
        <Button
          variant="outline"
          className="w-1/2 mt-5 text-base cursor-pointer rounded-[6px] h-12 px-10 bg-transparent"
        >
          <StarIcon size={16} className="text-white" />
          See top
        </Button>
      </div>
    </div>
  );
}
