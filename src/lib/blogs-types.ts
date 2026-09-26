export interface PublicBlog {
  id: string;
  createdAt: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: string;
  readTime: string;
}

export interface AdminBlog extends PublicBlog {
  status: "published" | "draft" | "hidden";
}
