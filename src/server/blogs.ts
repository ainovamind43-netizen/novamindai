import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { isAdmin } from "../lib/admin-session.server";
import {
  createBlog,
  deleteBlog,
  getPublicBlogs,
  listAllBlogs,
  setBlogStatus,
  updateBlog,
} from "../lib/blogs.server";
import { blogInputSchema, type BlogInput } from "../lib/blog-schema";
import type { AdminBlog, PublicBlog } from "../lib/blogs-types";

export const fetchPublicBlogs = createServerFn({ method: "GET" }).handler(
  async (): Promise<PublicBlog[]> => getPublicBlogs(),
);

export const checkAdminSession = createServerFn({ method: "POST" }).handler(
  async (): Promise<boolean> => {
    return isAdmin();
  },
);

export const fetchAdminBlogs = createServerFn({ method: "GET" }).handler(
  async (): Promise<AdminBlog[]> => {
    if (!isAdmin()) throw new Error("Unauthorized");
    return listAllBlogs();
  },
);

export type BlogActionResult = { ok: true } | { ok: false; error: string };

export const createNewBlog = createServerFn({ method: "POST" })
  .validator(blogInputSchema)
  .handler(async ({ data }): Promise<BlogActionResult> => {
    if (!isAdmin()) return { ok: false, error: "Unauthorized" };
    try {
      await createBlog(data);
      return { ok: true };
    } catch (error) {
      console.error("[blogs] createNewBlog failed:", error);
      return { ok: false, error: "Failed to create blog post." };
    }
  });

export const updateExistingBlog = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.string().uuid(),
      data: blogInputSchema,
    }),
  )
  .handler(async ({ data }): Promise<BlogActionResult> => {
    if (!isAdmin()) return { ok: false, error: "Unauthorized" };
    try {
      await updateBlog(data.id, data.data);
      return { ok: true };
    } catch (error) {
      console.error("[blogs] updateExistingBlog failed:", error);
      return { ok: false, error: "Failed to update blog post." };
    }
  });

export const changeBlogStatus = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.string().uuid(),
      status: z.enum(["published", "draft", "hidden"]),
    }),
  )
  .handler(async ({ data }): Promise<BlogActionResult> => {
    if (!isAdmin()) return { ok: false, error: "Unauthorized" };
    try {
      await setBlogStatus(data.id, data.status);
      return { ok: true };
    } catch (error) {
      console.error("[blogs] changeBlogStatus failed:", error);
      return { ok: false, error: "Failed to update blog status." };
    }
  });

export const removeBlog = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }): Promise<BlogActionResult> => {
    if (!isAdmin()) return { ok: false, error: "Unauthorized" };
    try {
      await deleteBlog(data.id);
      return { ok: true };
    } catch (error) {
      console.error("[blogs] removeBlog failed:", error);
      return { ok: false, error: "Failed to delete blog post." };
    }
  });
