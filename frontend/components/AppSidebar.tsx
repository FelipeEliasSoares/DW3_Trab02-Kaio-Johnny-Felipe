import { LogOut, Users, Truck, Car, ClipboardList } from "lucide-react"; // Ícones atualizados
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
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const { logout } = useAuth();
  const pathname = usePathname();

  // Classe para seção ativa
  const getActiveClass = (path: string) =>
    pathname === path
      ? "bg-gray-200 text-blue-600 rounded-md"
      : "hover:bg-gray-100";

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
                    className={`flex items-center space-x-2 p-2 ${getActiveClass(
                      "/dashboard/motoristas"
                    )}`}
                  >
                    <Truck />
                    <span>Motoristas</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Item único "Veículos" */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/dashboard/veiculos"
                    className={`flex items-center space-x-2 p-2 ${getActiveClass(
                      "/dashboard/veiculos"
                    )}`}
                  >
                    <Car />
                    <span>Veículos</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Item único Clientes */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/dashboard/clientes"
                    className={`flex items-center space-x-2 p-2 ${getActiveClass(
                      "/dashboard/clientes"
                    )}`}
                  >
                    <Users />
                    <span>Clientes</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Item único "Motoristas Veículos" */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/dashboard/motoristas-veiculos"
                    className={`flex items-center space-x-2 p-2 ${getActiveClass(
                      "/dashboard/motoristas-veiculos"
                    )}`}
                  >
                    <ClipboardList />
                    <span>Motoristas Veículos</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Item único "Entregas" */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <Link
                    href="/dashboard/entregas"
                    className={`flex items-center space-x-2 p-2 ${getActiveClass(
                      "/dashboard/entregas"
                    )}`}
                    >
                    <ClipboardList />
                    <span>Entregas</span>
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
