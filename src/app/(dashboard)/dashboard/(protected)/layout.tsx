import type { Metadata } from "next";
import { SessionNavBar } from "@/components/ui/sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard | Dash Media Solutions",
  description: "Admin dashboard for managing blogs and content.",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/dashboard/auth");
  }

  return (
    <div className="flex h-screen w-screen flex-row overflow-hidden bg-background">
      {/* Sidebar - Fixed on the left */}
      <SessionNavBar />
      
      {/* Main Content Area - Grows to fill space */}
      <main className="flex h-screen grow flex-col overflow-auto">
        <div className="container mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}