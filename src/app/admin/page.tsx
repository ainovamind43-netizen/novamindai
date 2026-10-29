import type { Metadata } from "next";
import { AdminClient } from "@/components/site/AdminClient";
import { adminState } from "@/server/reviews";

export const metadata: Metadata = {
  title: "Admin Dashboard | NovaMind AI",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const state = await adminState();

  return <AdminClient initialState={state} />;
}
