'use client';
import * as React from 'react';
import { defineStepper } from '@stepperize/react';

import { Button } from '@/components/ui/button';
import { getStepTitle, getStepSubtitle } from './_utils';
import {
  CategoryStep,
  BeneficiaryStep,
  GoalStep,
  StoryStep,
  MediaStep,
  TitleStep,
  VerifyStep,
} from './_components/steps';

import { useCreateCampaignStore } from '@/stores/useCreateCampaignStore';
import { CreateCampaignCategorySchema } from '@/lib/schemas/createCampaign';
import { useShallow } from 'zustand/shallow';

const { useStepper } = defineStepper(
  { id: 'category' },
  // { id: 'beneficiary' },
  { id: 'goal' },
  { id: 'story' },
  { id: 'title' },
  { id: 'media' },
  { id: 'verify' }
);

export default function Fundraise() {
  const stepper = useStepper();
  const { category } = useCreateCampaignStore(
    useShallow((s) => ({
      category: s.category,
    }))
  );

  // only category step has extra validation
  const isCategoryValid =
    stepper.current.id === 'category'
      ? CreateCampaignCategorySchema.safeParse({ category }).success
      : true;

  const handleContinue = () => {
    if (stepper.current.id === 'category') {
      const result = CreateCampaignCategorySchema.safeParse({ category });
      if (!result.success) {
        // you could lift this error into a small piece of state
        // and render it inside CategoryStep (e.g. via a zustand flag),
        // or just use a toast/alert here:
        alert(result.error.errors[0].message);
        return;
      }
    }

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
          // beneficiary: () => <BeneficiaryStep />,
          goal: () => <GoalStep />,
          story: () => <StoryStep />,
          media: () => <MediaStep />,
          title: () => <TitleStep />,
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
            disabled={!isCategoryValid}
            className="text-base cursor-pointer rounded-[6px] h-12 px-10"
          >
            {stepper.isLast ? 'Finish' : 'Continue'}
          </Button>
        </div>
      </section>
    </main>
  );
}
