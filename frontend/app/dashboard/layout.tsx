"use client";

// Importando o hook useAuth
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [loading, user, router]);

  if (loading) return <p>Carregando...</p>;

  if (!user) return null;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen h-screen">
        <AppSidebar />
      </div>
      <main className="flex-1 h-full overflow-auto bg-black-100">
        {children}
      </main>
    </SidebarProvider>
  );
}
