//* Importando ícones do lucide-react
import { LogOut, CreditCard } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export function AppSidebar() {
  const { logout } = useAuth();

  return (
    <Sidebar className="w-64 h-screen shadow-md bg-white">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>ERP Modulo Financeiro</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Item único "Conta de Pagamento" */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/dashboard/conta"
                    className="flex items-center space-x-2"
                  >
                    <CreditCard />
                    <span>Conta de Pagamento</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Botão de Logout no Footer */}
      <SidebarFooter className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="flex items-center space-x-2 text-red-600 hover:text-red-800"
        >
          <LogOut />
          <span>Logout</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
