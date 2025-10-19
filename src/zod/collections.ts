import z from "zod";
import { globalelatedAccountSchema } from "./accounts";

export const collectionsTableSchema = z.object({
    id: z.string(),
    slug: z.string(),
    bannerImage: z.string(),
    coverImage: z.string(),
    title: z.string(),
    description: z.string(),
    isPrivate: z.boolean(),
    createdBy: globalelatedAccountSchema,
    cardsCount : z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
  });
  