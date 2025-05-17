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
  MediaStep,
  TitleStep,
  VerifyStep,
} from './_components/steps';

import { useCreateCampaignStore } from '@/stores/useCreateCampaignStore';
import {
  CreateCampaignCategorySchema,
  CreateCampaignGoalSchema,
  CreateCampaignStorySchema,
} from '@/lib/schemas/createCampaign';

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
  const { category, goal, story } = useCreateCampaignStore(
    useShallow((s) => ({
      category: s.category,
      goal: s.goalAmount,
      story: s.story,
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

  const handleContinue = () => {
    if (stepper.current.id === 'category') {
      const result = CreateCampaignCategorySchema.safeParse({ category });
      if (!result.success) {
        alert(result.error.errors[0].message);
        return;
      }
    }

    if (stepper.current.id === 'goal') {
      const result = CreateCampaignGoalSchema.safeParse({ goal });
      if (!result.success) {
        alert(result.error.errors[0].message);
        return;
      }
    }

    // Story validation
    if (stepper.current.id === 'story') {
      const result = CreateCampaignStorySchema.safeParse({ story });
      if (!result.success) {
        alert(result.error.errors[0].message);
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
