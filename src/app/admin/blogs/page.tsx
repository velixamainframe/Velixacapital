import type { Metadata } from "next";
import { BlogsAdminClient } from "@/components/admin/blogs-admin";

export const metadata: Metadata = {
  title: { absolute: "Blogs — Velixa Admin" },
  description: "Manage blog posts.",
  robots: { index: false, follow: false },
};

export default function AdminBlogsPage() {
  return <BlogsAdminClient />;
}
