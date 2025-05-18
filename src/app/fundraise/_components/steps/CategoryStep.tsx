import { CheckIcon } from 'lucide-react';
import { useShallow } from 'zustand/shallow';

import { useCreateCampaignStore } from '@/stores/useCreateCampaignStore';
import { AnimatedSubscribeButton } from '@/components/magicui/animated-subscribe-button';
import { FlickeringGrid } from '@/components/magicui/flickering-grid';
import { categories } from '@/lib/categories';

export function CategoryStep() {
  const { category, setCategory } = useCreateCampaignStore(
    useShallow((state) => ({
      category: state.category,
      setCategory: state.setCategory,
    }))
  );

  return (
    <section className="flex flex-wrap gap-5">
      {categories.map(({ name, icon: Icon }) =>
        category === name ? (
          <AnimatedSubscribeButton
            className={`bg-transparent p-0 h-12
          border cursor-pointer
           text-white/50 hover:text-primary transition-colors duration-200
          `}
            key={name}
            onClick={() => setCategory(name)}
          >
            <span
              className="relative bg-transparent
          flex items-center gap-2
          px-10 py-2
          font-light
          "
            >
              {name} <Icon size={16} />
              <FlickeringGrid
                className="absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-75 transition-opacity duration-200"
                squareSize={2}
                gridGap={2}
                color="#6B7280"
                maxOpacity={0.3}
                flickerChance={0.5}
              />
            </span>
            <span
              className="bg-muted text-primary
          flex items-center gap-2 h-full
          px-10 py-2
          font-light
          border border-primary
          "
            >
              {name} <CheckIcon size={16} />
            </span>
          </AnimatedSubscribeButton>
        ) : (
          <AnimatedSubscribeButton
            className={`bg-transparent p-0 h-12
          border cursor-pointer
           text-white/50 hover:text-primary transition-colors duration-200
          `}
            key={name}
            onClick={() => setCategory(name)}
          >
            <span
              className="relative bg-transparent
          flex items-center gap-2
          px-10 py-2
          font-light
          "
            >
              {name} <Icon size={16} />
              <FlickeringGrid
                className="absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-75 transition-opacity duration-200"
                squareSize={2}
                gridGap={2}
                color="#6B7280"
                maxOpacity={0.3}
                flickerChance={0.5}
              />
            </span>
            <span
              className="relative bg-transparent
          flex items-center gap-2
          px-10 py-2
          font-light
          "
            >
              {name} <Icon size={16} />
              <FlickeringGrid
                className="absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-75 transition-opacity duration-200"
                squareSize={2}
                gridGap={2}
                color="#6B7280"
                maxOpacity={0.3}
                flickerChance={0.5}
              />
            </span>
          </AnimatedSubscribeButton>
        )
      )}
    </section>
  );
}
