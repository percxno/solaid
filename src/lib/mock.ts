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
    beneficiary: 'Karen Hart',
    amount: 10000,
    title:
      'Support Gunnar’s Parathyroid Tumor Surgery',
    story:
      'Gunnar had dental surgery recently and it was discovered that he had high calcium levels. Upon further testing and a malignancy panel, it was discovered he’d need surgery to remove a parathyroid tumor. He had surgery here in Little Rock on Monday, May 12, 2025, to remove his parathyroid tumor. Unfortunately, the tumor was large and vascular, so the surgeon is concerned that it could be malignant. We should get his biopsy results back next Monday. Due to the size of the parathyroid tumor, the surgeon was not able to perform surgery on Monday to also remove Gunnar’s bladder stones. He has a large amount of bladder stones that will be removed in an upcoming surgery in the near future. These bladder stones are the result of his parathyroid tumor producing too much calcium for his body. After having his parathyroid gland removed, Gunnar will go in for frequent monitoring to see what his calcium levels are at. We can’t let his calcium get too low or he will need an IV of calcium. He went in yesterday to have two calcium checks, and he will go back on Friday to have his levels checked twice again.  ',
    imageUrl: '/images/dog.webp',
  },
  {
    id: '2',
    category: 'community',
    beneficiary: 'Michelle Vanallsburg',
    amount: 7500,
    title: 'Legal Fees for Librarian',
    story:
      'Ms. Beachler has been a dedicated and loyal school staff member for 37 years, devoted to providing all students with outstanding educational opportunities. She has dedicated her career as a librarian to providing high quality literature for every single student. Although she is highly respected by students, colleagues, and the community, she has been the target of harmful and false allegations. A local individual associated with Moms for Liberty has publicly called her derogatory names, including “smut peddler” and “groomer,” in an apparent attempt to tarnish her reputation and undermine her career. Additionally, the individual has spread disinformation repeatedly telling the community that Ms. Beachler gives pornography to young children. All of these false accusations have been devastating to Ms. Beachler and her family.',
    imageUrl: '/images/library.webp',
  },
  // {
  //   id: '3',
  //   category: 'animal',
  //   beneficiary: 'Safari Animal Rescue',
  //   amount: 5000,
  //   title: 'Save the Lost Cub',
  //   story:
  //     'A young lion cub was found orphaned... Help us provide medical care and rehabilitation. dsafhjka dhsf dshfjkhsda kjfkjsd fgdsakgf jdhsagf ajgsd ',
  //   imageUrl: '/images/lion-cub.png',
  // },
  // {
  //   id: '4',
  //   category: 'animal',
  //   beneficiary: 'Wildlife Protection Fund',
  //   amount: 7500,
  //   title: 'Protect Endangered Elephants',
  //   story:
  //     'Elephant populations are dwindling... Support our anti-poaching patrols.',
  //   imageUrl: '/images/elephants.png',
  // },
  // {
  //   id: '5',
  //   category: 'animal',
  //   beneficiary: 'Safari Animal Rescue',
  //   amount: 5000,
  //   title: 'Save the Lost Cub',
  //   story:
  //     'A young lion cub was found orphaned... Help us provide medical care and rehabilitation. dsafhjka dhsf dshfjkhsda kjfkjsd fgdsakgf jdhsagf ajgsd ',
  //   imageUrl: '/images/lion-cub.png',
  // },
  // {
  //   id: '6',
  //   category: 'animal',
  //   beneficiary: 'Wildlife Protection Fund',
  //   amount: 7500,
  //   title: 'Protect Endangered Elephants',
  //   story:
  //     'Elephant populations are dwindling... Support our anti-poaching patrols.',
  //   imageUrl: '/images/elephants.png',
  // },
  // {
  //   id: '7',
  //   category: 'animal',
  //   beneficiary: 'Safari Animal Rescue',
  //   amount: 5000,
  //   title: 'Save the Lost Cub',
  //   story:
  //     'A young lion cub was found orphaned... Help us provide medical care and rehabilitation. dsafhjka dhsf dshfjkhsda kjfkjsd fgdsakgf jdhsagf ajgsd ',
  //   imageUrl: '/images/lion-cub.png',
  // },
  // {
  //   id: '8',
  //   category: 'animal',
  //   beneficiary: 'Wildlife Protection Fund',
  //   amount: 7500,
  //   title: 'Protect Endangered Elephants',
  //   story:
  //     'Elephant populations are dwindling... Support our anti-poaching patrols.',
  //   imageUrl: '/images/elephants.png',
  // },
  {
    id: '9',
    category: 'education',
    beneficiary: 'Bright Future Schools',
    amount: 12000,
    title: 'Build a Community Library',
    story: 'Rural students lack access to books... Help us build a library.',
    imageUrl: '/images/library.png',
  },
];
