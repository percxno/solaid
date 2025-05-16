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
} from './_components/steps';

const { useStepper } = defineStepper(
  { id: 'category' },
  { id: 'beneficiary' },
  { id: 'goal' },
  { id: 'story' },
  { id: 'title' },
  { id: 'media' }
);

export default function Fundraise() {
  const stepper = useStepper();

  return (
    <main className="main-container container items-center flex-col">
      <section className="flex flex-col mt-32 gap-10 justify-between bg-transparent w-full">
        <p className="font-light text-white/50 text-xs">/ FUNDRAISE</p>
        <h1 className="text-7xl w-full">{getStepTitle(stepper.current.id)}</h1>
        <h4 className="text-3xl mt-5 w-2/3 font-light text-white/80">
          {getStepSubtitle(stepper.current.id)}
        </h4>
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
