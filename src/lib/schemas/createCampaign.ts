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

export const CreateCampaignGoalSchema = z.object({
  goal: z.coerce
    .number({ invalid_type_error: 'Goal must be a number' })
    .positive({ message: 'Goal must be greater than zero' }),
});

export const CreateCampaignSchema = CreateCampaignCategorySchema.merge(
  CreateCampaignGoalSchema
).extend({});

export type CreateCampaignCategoryInput = z.infer<
  typeof CreateCampaignCategorySchema
>;
export type CreateCampaignGoalInput = z.infer<typeof CreateCampaignGoalSchema>;
export type CreateCampaignInput = z.infer<typeof CreateCampaignSchema>;
