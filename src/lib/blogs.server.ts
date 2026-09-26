import { db, isConfigured } from "./db.server";
import type { AdminBlog, PublicBlog } from "./blogs-types";
import type { BlogInput } from "./blog-schema";

export { isConfigured };

export async function getPublicBlogs(): Promise<PublicBlog[]> {
  if (!isConfigured()) return [];

  try {
    const rows = await db()`
      select id, created_at, title, slug, excerpt, body, category, read_time
      from public.blogs
      where status = 'published'
      order by created_at desc
    `;

    return rows.map((r) => ({
      id: r["id"] as string,
      createdAt: (r["created_at"] as Date).toISOString(),
      title: r["title"] as string,
      slug: r["slug"] as string,
      excerpt: r["excerpt"] as string,
      body: r["body"] as string,
      category: r["category"] as string,
      readTime: r["read_time"] as string,
    }));
  } catch (error) {
    console.error("[blogs] getPublicBlogs failed:", error);
    return [];
  }
}

export async function listAllBlogs(): Promise<AdminBlog[]> {
  if (!isConfigured()) return [];

  try {
    const rows = await db()`
      select id, created_at, title, slug, excerpt, body, category, read_time, status
      from public.blogs
      order by created_at desc
    `;

    return rows.map((r) => ({
      id: r["id"] as string,
      createdAt: (r["created_at"] as Date).toISOString(),
      title: r["title"] as string,
      slug: r["slug"] as string,
      excerpt: r["excerpt"] as string,
      body: r["body"] as string,
      category: r["category"] as string,
      readTime: r["read_time"] as string,
      status: r["status"] as "published" | "draft" | "hidden",
    }));
  } catch (error) {
    console.error("[blogs] listAllBlogs failed:", error);
    return [];
  }
}

export async function createBlog(input: BlogInput): Promise<string> {
  const database = db();
  const rows = await database`
    insert into public.blogs (title, slug, excerpt, body, category, read_time, status)
    values (${input.title}, ${input.slug}, ${input.excerpt}, ${input.body}, ${input.category}, ${input.readTime}, 'published')
    returning id
  `;
  return rows[0]?.["id"] as string;
}

export async function updateBlog(id: string, input: BlogInput): Promise<void> {
  const database = db();
  await database`
    update public.blogs
    set title = ${input.title},
        slug = ${input.slug},
        excerpt = ${input.excerpt},
        body = ${input.body},
        category = ${input.category},
        read_time = ${input.readTime}
    where id = ${id}
  `;
}

export async function setBlogStatus(id: string, status: "published" | "draft" | "hidden"): Promise<void> {
  const database = db();
  await database`
    update public.blogs
    set status = ${status}
    where id = ${id}
  `;
}

export async function deleteBlog(id: string): Promise<void> {
  const database = db();
  await database`
    delete from public.blogs
    where id = ${id}
  `;
}
