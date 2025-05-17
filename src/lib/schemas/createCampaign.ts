import { z } from 'zod';
import { categories } from '@/lib/categories';

const categoryNames = categories.map((c) => c.name) as [string, ...string[]];

export const CreateCampaignCategorySchema = z.object({
  category: z.enum(categoryNames, {
    errorMap: () => ({
      message: 'Please select one of the available categories.',
    }),
  }),
});

export const CreateCampaignSchema = CreateCampaignCategorySchema.extend({});

export type CreateCampaignCategoryInput = z.infer<
  typeof CreateCampaignCategorySchema
>;
export type CreateCampaignInput = z.infer<typeof CreateCampaignSchema>;
