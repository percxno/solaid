'use client';
import * as React from 'react';
import { defineStepper } from '@stepperize/react';
import { useShallow } from 'zustand/shallow';

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
import { useRouter, useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();
  const router = useRouter();

  const { category, goal, story, title, mediaUrl, email, walletAddress } =
    useCreateCampaignStore(
      useShallow((s) => ({
        category: s.category,
        goal: s.goalAmount,
        story: s.story,
        title: s.title,
        mediaUrl: s.mediaUrl,
        email: s.email,
        walletAddress: s.walletAddress,
      }))
    );

  const isCategoryValid =
    stepper.current.id === 'category'
      ? CreateCampaignCategorySchema.safeParse({ category }).success
      : true;

  const isGoalValid =
    stepper.current.id === 'goal'
      ? CreateCampaignGoalSchema.safeParse({ goal }).success
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
      ? CreateCampaignVerifySchema.safeParse({ email, walletAddress }).success
      : true;

  const handleContinue = () => {
    if (stepper.current.id === 'category') {
      const res = CreateCampaignCategorySchema.safeParse({ category });
      if (!res.success) {
        alert(res.error.errors[0].message);
        return;
      }
    }

    if (stepper.current.id === 'goal') {
      const res = CreateCampaignGoalSchema.safeParse({ goal });
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
        walletAddress,
      });
      if (!res.success) {
        alert(res.error.errors[0].message);
        return;
      }
    }

    // Advance or reset
    if (stepper.isLast) {
      stepper.reset();
    } else {
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
              disabled={stepper.isFirst}
              className="text-base cursor-pointer rounded-[6px] h-12 px-10"
            >
              Back
            </Button>
          )}
          <Button
            onClick={handleContinue}
            disabled={
              stepper.current.id === 'category'
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
                          : false
            }
            className="text-base cursor-pointer rounded-[6px] h-12 px-10"
          >
            {stepper.isLast ? 'Finish' : 'Continue'}
          </Button>
        </div>
      </section>
    </main>
  );
}
