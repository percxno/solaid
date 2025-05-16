'use client';

import * as React from 'react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { defineStepper } from '@stepperize/react';
import {
  PawPrintIcon,
  BriefcaseIcon,
  UsersIcon,
  PaintbrushIcon,
  BookOpenIcon,
  AlertTriangleIcon,
  LeafIcon,
  CalendarIcon,
  StarIcon,
  HomeIcon,
  AmbulanceIcon,
  FeatherIcon,
  HandshakeIcon,
  VolleyballIcon,
  CakeSliceIcon,
} from 'lucide-react';

const { useStepper } = defineStepper(
  {
    id: 'category',
  },
  {
    id: 'beneficiary',
  },
  { id: 'goal' },
  { id: 'story' },
  {
    id: 'title',
  },
  {
    id: 'media',
  }
);

export default function Fundraise() {
  const stepper = useStepper();

  return (
    <main className="min-h-screen w-full px-6 md:px-12 pt-32 pb-20 bg-background text-white">
      <section className="space-y-4 text-center md:text-left max-w-4xl mx-auto">
        <p className="text-xs uppercase text-muted-foreground tracking-widest">
          / FUNDRAISE
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold">
          {getStepTitle(stepper.current.id)}
        </h1>
        <p className="text-lg text-muted-foreground">
          {getStepSubtitle(stepper.current.id)}
        </p>
      </section>

      <section className="w-full max-w-4xl mx-auto mt-16 space-y-10">
        {stepper.switch({
          category: () => <CategoryStep />,
          beneficiary: () => <BeneficiaryStep />,
          goal: () => <GoalStep />,
          story: () => <StoryStep />,
          media: () => <MediaStep />,
          title: () => <TitleStep />,
        })}

        <div className="flex justify-between pt-8">
          <Button
            variant="outline"
            onClick={stepper.prev}
            disabled={stepper.isFirst}
            className="cursor-pointer"
          >
            Back
          </Button>
          <Button
            onClick={stepper.isLast ? stepper.reset : stepper.next}
            className="cursor-pointer"
          >
            {stepper.isLast ? 'Finish' : 'Continue'}
          </Button>
        </div>
      </section>
    </main>
  );
}

function getStepTitle(id: string) {
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

function getStepSubtitle(id: string) {
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

const categories = [
  { name: 'Animal', icon: PawPrintIcon },
  { name: 'Business', icon: BriefcaseIcon },
  { name: 'Community', icon: UsersIcon },
  { name: 'Creative', icon: PaintbrushIcon },
  { name: 'Education', icon: BookOpenIcon },
  { name: 'Emergency', icon: AlertTriangleIcon },
  { name: 'Environment', icon: LeafIcon },
  { name: 'Event', icon: CalendarIcon },
  { name: 'Faith', icon: StarIcon },
  { name: 'Family', icon: HomeIcon },
  { name: 'Medical', icon: AmbulanceIcon },
  { name: 'Memorial', icon: FeatherIcon },
  { name: 'Nonprofit', icon: HandshakeIcon },
  { name: 'Sports', icon: VolleyballIcon },
  { name: 'Wishes', icon: CakeSliceIcon },
];

function CategoryStep() {
  const [selected, setSelected] = useState('');
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 border border-muted rounded-lg divide-x divide-y overflow-hidden">
      {categories.map(({ name, icon: Icon }) => (
        <div
          key={name}
          className={cn(
            'aspect-square p-6 flex flex-col justify-between items-start cursor-pointer hover:bg-muted transition-colors',
            selected === name ? 'text-primary' : 'text-muted-foreground'
          )}
          onClick={() => setSelected(name)}
        >
          <Icon size={24} />
          <span className="text-base font-medium mt-auto">{name}</span>
        </div>
      ))}
    </div>
  );
}

function BeneficiaryStep() {
  const [selected, setSelected] = useState('');
  const options = [
    { label: 'Yourself', value: 'self', desc: 'Funds go to your account' },
    {
      label: 'Someone else',
      value: 'someone',
      desc: 'You’ll invite a beneficiary',
    },
    //   { label: 'Charity', value: 'charity', desc: 'Funds go to a nonprofit' },
  ];
  return (
    <div className="space-y-4">
      {options.map((opt) => (
        <div
          key={opt.value}
          className={`border p-4 rounded-lg cursor-pointer transition-colors duration-200 ${
            selected === opt.value
              ? 'bg-muted border-primary text-primary'
              : 'hover:bg-muted/50'
          }`}
          onClick={() => setSelected(opt.value)}
        >
          <div className="font-medium">{opt.label}</div>
          <div className="text-sm text-muted-foreground">{opt.desc}</div>
        </div>
      ))}
    </div>
  );
}

function GoalStep() {
  const [goal, setGoal] = useState('');
  return (
    <div className="space-y-4">
      <Input
        type="number"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Your Starting Goal"
      />
    </div>
  );
}

function StoryStep() {
  const [story, setStory] = useState('');
  return (
    <div className="space-y-4">
      <Textarea
        rows={18}
        value={story}
        onChange={(e) => setStory(e.target.value)}
        placeholder="Tell your story here..."
        className="min-h-[400px] text-base"
      />
    </div>
  );
}

function TitleStep() {
  const [title, setTitle] = useState('');
  return (
    <div className="space-y-4">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g. Help fund school fees in India"
      />
    </div>
  );
}

function MediaStep() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  return (
    <div className="space-y-4">
      <div className="w-full border border-dashed rounded-lg p-6 bg-muted flex flex-col items-center justify-center text-center text-muted-foreground">
        {preview ? (
          <div className="w-full max-h-[300px] overflow-hidden rounded-md">
            {file?.type.startsWith('video') ? (
              <video
                src={preview}
                controls
                className="w-full h-auto rounded-md"
              />
            ) : (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-auto rounded-md object-cover"
              />
            )}
          </div>
        ) : (
          <>
            <p className="mb-2">Upload a cover photo</p>
            <p className="text-xs">
              Recommended: Bright, clear images to help people connect
            </p>
          </>
        )}
      </div>

      <Input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="cursor-pointer bg-background"
      />
      {file && (
        <p className="text-sm text-muted-foreground truncate">
          Selected: {file.name}
        </p>
      )}
      <p className="text-sm text-muted-foreground">
        You can skip this step and add media later.
      </p>
    </div>
  );
}
