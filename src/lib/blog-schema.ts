import { z } from "zod";

export const blogInputSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters.")
    .max(150, "Title cannot exceed 150 characters."),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters.")
    .max(150, "Slug cannot exceed 150 characters.")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens."),
  excerpt: z
    .string()
    .min(10, "Excerpt must be at least 10 characters.")
    .max(300, "Excerpt cannot exceed 300 characters."),
  body: z
    .string()
    .min(20, "Body must be at least 20 characters."),
  category: z
    .string()
    .min(2, "Category is required.")
    .max(50, "Category cannot exceed 50 characters."),
  readTime: z
    .string()
    .min(2, "Read time is required.")
    .max(20, "Read time cannot exceed 20 characters."),
});

export type BlogInput = z.infer<typeof blogInputSchema>;
