export interface Campaign {
  id: string;
  category: string;
  beneficiary: string;
  amount: number;
  title: string;
  story: string;
  imageUrl: string;
}

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    category: 'animal',
    beneficiary: 'Safari Animal Rescue',
    amount: 5000,
    title: 'Save the Lost Cub',
    story:
      'A young lion cub was found orphaned... Help us provide medical care and rehabilitation. dsafhjka dhsf dshfjkhsda kjfkjsd fgdsakgf jdhsagf ajgsd ',
    imageUrl: '/images/lion-cub.png',
  },
  {
    id: '2',
    category: 'animal',
    beneficiary: 'Wildlife Protection Fund',
    amount: 7500,
    title: 'Protect Endangered Elephants',
    story:
      'Elephant populations are dwindling... Support our anti-poaching patrols.',
    imageUrl: '/images/elephants.png',
  },
  {
    id: '3',
    category: 'education',
    beneficiary: 'Bright Future Schools',
    amount: 12000,
    title: 'Build a Community Library',
    story: 'Rural students lack access to books... Help us build a library.',
    imageUrl: '/images/library.png',
  },
];
