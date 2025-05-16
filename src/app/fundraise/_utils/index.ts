export function getStepTitle(id: string) {
  switch (id) {
    case 'category':
      return "What best describes why you're fundraising?";
    case 'beneficiary':
      return 'Who are you fundraising for?';
    case 'goal':
      return 'Set a fundraising goal';
    case 'story':
      return 'Tell your story';
    case 'title':
      return 'Title';
    case 'media':
      return 'Add media';
    default:
      return '';
  }
}

export function getStepSubtitle(id: string) {
  switch (id) {
    case 'category':
      return 'Pick a category that helps donors understand your cause.';
    case 'beneficiary':
      return 'Let people know who the funds are for.';
    case 'goal':
      return 'Set a clear and reasonable goal amount for your fundraiser.';
    case 'story':
      return 'Write your campaign story to inspire others to donate.';
    case 'title':
      return 'Give your fundraiser a title';
    case 'media':
      return 'Cover media helps tell your story. If you find a better photo later, you can always change it';
    default:
      return '';
  }
}
