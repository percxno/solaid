'use client';
import * as React from 'react';
import { defineStepper } from '@stepperize/react';
import { useShallow } from 'zustand/shallow';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { getStepTitle, getStepSubtitle } from './_utils';
import {
  CategoryStep,
  GoalStep,
  StoryStep,
  TitleStep,
  MediaStep,
  VerifyStep,
} from './_components/steps';

import { useCreateCampaignStore } from '@/stores/useCreateCampaignStore';
import {
  CreateCampaignCategorySchema,
  CreateCampaignGoalSchema,
  CreateCampaignStorySchema,
  CreateCampaignTitleSchema,
  CreateCampaignMediaSchema,
  CreateCampaignVerifySchema,
} from '@/lib/schemas/createCampaign';
import { useEffect } from 'react';

const { useStepper } = defineStepper(
  { id: 'category' },
  { id: 'goal' },
  { id: 'story' },
  { id: 'title' },
  { id: 'media' },
  { id: 'verify' }
);

export default function Fundraise() {
  const stepper = useStepper();
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    category,
    goalAmount,
    story,
    title,
    mediaUrl,
    email,
    campaignOwnerName,
    walletAddress,
    setCategory,
    setGoalAmount,
    setStory,
    setTitle,
    setMediaUrl,
    setEmail,
    setCampaignOwnerName,
    setWalletAddress,
  } = useCreateCampaignStore(
    useShallow((s) => ({
      category: s.category,
      goalAmount: s.goalAmount,
      story: s.story,
      title: s.title,
      mediaUrl: s.mediaUrl,
      email: s.email,
      campaignOwnerName: s.campaignOwnerName,
      walletAddress: s.walletAddress,
      setCategory: s.setCategory,
      setGoalAmount: s.setGoalAmount,
      setStory: s.setStory,
      setTitle: s.setTitle,
      setMediaUrl: s.setMediaUrl,
      setEmail: s.setEmail,
      setCampaignOwnerName: s.setCampaignOwnerName,
      setWalletAddress: s.setWalletAddress,
    }))
  );

  const isCategoryValid =
    stepper.current.id === 'category'
      ? CreateCampaignCategorySchema.safeParse({ category }).success
      : true;

  const isGoalValid =
    stepper.current.id === 'goal'
      ? CreateCampaignGoalSchema.safeParse({ goal: goalAmount }).success
      : true;

  const isStoryValid =
    stepper.current.id === 'story'
      ? CreateCampaignStorySchema.safeParse({ story }).success
      : true;

  const isTitleValid =
    stepper.current.id === 'title'
      ? CreateCampaignTitleSchema.safeParse({ title }).success
      : true;

  const isMediaValid =
    stepper.current.id === 'media'
      ? CreateCampaignMediaSchema.safeParse({ mediaUrl }).success
      : true;

  const isVerifyValid =
    stepper.current.id === 'verify'
      ? CreateCampaignVerifySchema.safeParse({
          email,
          campaignOwnerName,
          walletAddress,
        }).success
      : true;

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleContinue = async () => {
    if (stepper.current.id === 'category') {
      const res = CreateCampaignCategorySchema.safeParse({ category });
      if (!res.success) {
        alert(res.error.errors[0].message);
        return;
      }
    }

    if (stepper.current.id === 'goal') {
      const res = CreateCampaignGoalSchema.safeParse({ goal: goalAmount });
      if (!res.success) {
        alert(res.error.errors[0].message);
        return;
      }
    }

    if (stepper.current.id === 'story') {
      const res = CreateCampaignStorySchema.safeParse({ story });
      if (!res.success) {
        alert(res.error.errors[0].message);
        return;
      }
    }

    if (stepper.current.id === 'title') {
      const res = CreateCampaignTitleSchema.safeParse({ title });
      if (!res.success) {
        alert(res.error.errors[0].message);
        return;
      }
    }

    if (stepper.current.id === 'media') {
      const res = CreateCampaignMediaSchema.safeParse({ mediaUrl });
      if (!res.success) {
        alert(res.error.errors[0].message);
        return;
      }
    }

    if (stepper.current.id === 'verify') {
      const res = CreateCampaignVerifySchema.safeParse({
        email,
        campaignOwnerName,
        walletAddress,
      });
      if (!res.success) {
        alert(res.error.errors[0].message);
        return;
      }

      setIsSubmitting(true);
      try {
        const payload = {
          category: category.toLowerCase(),
          goalAmount,
          story,
          title,
          mediaUrl,
          email,
          campaignOwnerName,
          walletAddress,
        };
        const response = await fetch('/api/campaigns', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'Failed to create campaign');
        }

        setCategory('');
        setGoalAmount(0);
        setStory('');
        setTitle('');
        setMediaUrl('');
        setEmail('');
        setCampaignOwnerName('');
        setWalletAddress('');

        stepper.reset();
        router.push('/dashboard');
        return;
      } catch (err: any) {
        console.error(err);
        alert('Error: ' + err.message);
      } finally {
        setIsSubmitting(false);
      }
    }

    if (!stepper.isLast) {
      stepper.next();
    }
  };

  useEffect(() => {
    const step = searchParams.get('step');
    if (
      step &&
      ['category', 'goal', 'story', 'title', 'media', 'verify'].includes(step)
    ) {
      stepper.goTo(step as any);
      router.replace('/fundraise', { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="main-container container items-center flex-col">
      <section className="flex flex-col mt-32 gap-10 justify-between bg-transparent w-full">
        <p className="font-light text-white/50 text-xs">
          {`/ FUNDRAISE - ${stepper.current.id.toUpperCase()}`}
        </p>
        <h1 className="text-7xl w-full">{getStepTitle(stepper.current.id)}</h1>
        <h4 className="text-3xl mt-5 w-2/3 font-light text-white/80">
          {getStepSubtitle(stepper.current.id)}
        </h4>
      </section>

      <section className="w-full mt-16">
        {stepper.switch({
          category: () => <CategoryStep />,
          goal: () => <GoalStep />,
          story: () => <StoryStep />,
          title: () => <TitleStep />,
          media: () => <MediaStep />,
          verify: () => <VerifyStep />,
        })}

        <div className="flex mt-16 pt-10 justify-end gap-5 border-t">
          {!stepper.isFirst && (
            <Button
              variant="outline"
              onClick={stepper.prev}
              disabled={stepper.isFirst || isSubmitting}
              className="text-base cursor-pointer rounded-[6px] h-12 px-10"
            >
              Back
            </Button>
          )}
          <Button
            onClick={handleContinue}
            disabled={
              isSubmitting ||
              (stepper.current.id === 'category'
                ? !isCategoryValid
                : stepper.current.id === 'goal'
                  ? !isGoalValid
                  : stepper.current.id === 'story'
                    ? !isStoryValid
                    : stepper.current.id === 'title'
                      ? !isTitleValid
                      : stepper.current.id === 'media'
                        ? !isMediaValid
                        : stepper.current.id === 'verify'
                          ? !isVerifyValid
                          : false)
            }
            className="text-base cursor-pointer rounded-[6px] h-12 px-10"
          >
            {isSubmitting
              ? 'Submitting…'
              : stepper.isLast
                ? 'Finish'
                : 'Continue'}
          </Button>
        </div>
      </section>
    </main>
  );
}
