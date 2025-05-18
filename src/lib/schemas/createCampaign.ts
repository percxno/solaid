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

export const CreateCampaignStorySchema = z.object({
  story: z
    .string()
    .min(20, 'Story must be at least 20 characters long')
    .max(5000, 'Story is too long'),
});

export const CreateCampaignTitleSchema = z.object({
  title: z
    .string()
    .min(10, 'Title must be at least 10 characters')
    .max(100, 'Title can’t exceed 100 characters'),
});

export const CreateCampaignMediaSchema = z.object({
  mediaUrl: z
    .string()
    .url('Uploaded media must be a valid URL')
    .nullable()
    .optional(),
});

export const CreateCampaignVerifySchema = z.object({
  email: z.string().email('Please sign in with a valid email'),
  walletAddress: z
    .string()
    .min(1, 'Please connect your wallet before continuing'),
});

export const CreateCampaignSchema = CreateCampaignCategorySchema.merge(
  CreateCampaignGoalSchema
)
  .merge(CreateCampaignStorySchema)
  .merge(CreateCampaignTitleSchema)
  .merge(CreateCampaignMediaSchema)
  .merge(CreateCampaignVerifySchema)
  .extend({});

export type CreateCampaignInput = z.infer<typeof CreateCampaignSchema>;
export type CreateCampaignCategoryInput = z.infer<
  typeof CreateCampaignCategorySchema
>;
export type CreateCampaignGoalInput = z.infer<typeof CreateCampaignGoalSchema>;
export type CreateCampaignStoryInput = z.infer<
  typeof CreateCampaignStorySchema
>;
export type CreateCampaignTitleInput = z.infer<
  typeof CreateCampaignTitleSchema
>;
export type CreateCampaignMediaInput = z.infer<
  typeof CreateCampaignMediaSchema
>;

export type CreateCampaignVerifyInput = z.infer<
  typeof CreateCampaignVerifySchema
>;
