'use server';

import { z } from "zod";
import { revalidatePath } from "next/cache";
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

export async function fetchPublicBlogs(): Promise<PublicBlog[]> {
  return getPublicBlogs();
}

export async function checkAdminSession(): Promise<boolean> {
  return isAdmin();
}

export async function fetchAdminBlogs(): Promise<AdminBlog[]> {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  return listAllBlogs();
}

export type BlogActionResult = { ok: true } | { ok: false; error: string };

export async function createNewBlog(data: BlogInput): Promise<BlogActionResult> {
  if (!(await isAdmin())) return { ok: false, error: "Unauthorized" };
  try {
    await createBlog(data);
    revalidatePath("/blog");
    return { ok: true };
  } catch (error) {
    console.error("[blogs] createNewBlog failed:", error);
    return { ok: false, error: "Failed to create blog post." };
  }
}

export async function updateExistingBlog(id: string, data: BlogInput): Promise<BlogActionResult> {
  if (!(await isAdmin())) return { ok: false, error: "Unauthorized" };
  try {
    await updateBlog(id, data);
    revalidatePath("/blog");
    return { ok: true };
  } catch (error) {
    console.error("[blogs] updateExistingBlog failed:", error);
    return { ok: false, error: "Failed to update blog post." };
  }
}

export async function changeBlogStatus(id: string, status: "published" | "draft" | "hidden"): Promise<BlogActionResult> {
  if (!(await isAdmin())) return { ok: false, error: "Unauthorized" };
  try {
    await setBlogStatus(id, status);
    revalidatePath("/blog");
    return { ok: true };
  } catch (error) {
    console.error("[blogs] changeBlogStatus failed:", error);
    return { ok: false, error: "Failed to update blog status." };
  }
}

export async function removeBlog(id: string): Promise<BlogActionResult> {
  if (!(await isAdmin())) return { ok: false, error: "Unauthorized" };
  try {
    await deleteBlog(id);
    revalidatePath("/blog");
    return { ok: true };
  } catch (error) {
    console.error("[blogs] removeBlog failed:", error);
    return { ok: false, error: "Failed to delete blog post." };
  }
}
