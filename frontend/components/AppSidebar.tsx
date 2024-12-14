//* Importando ícones do lucide-react
import { LogOut, User, Truck, Car } from "lucide-react";
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
          <SidebarGroupLabel>Transportadora KJF</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Item único "Motoristas" */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/dashboard/motoristas"
                    className="flex items-center space-x-2"
                  >
                    <Truck />
                    <span>Motoristas</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Item único "Veiculos" */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/dashboard/veiculos"
                    className="flex items-center space-x-2"
                  >
                    <Car />
                    <span>Veiculos</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Item único Clientes */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/dashboard/clientes"
                    className="flex items-center space-x-2"
                  >
                    <User />
                    <span>Clientes</span>
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
