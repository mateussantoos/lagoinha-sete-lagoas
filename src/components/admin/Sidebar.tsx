"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Mic,
  ShoppingCart,
  BookOpen,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import logoBranca from "@/assets/svg/lagoinha-logoBranca.svg";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/gcs", label: "GCs", icon: Users },
  { href: "/dashboard/eventos", label: "Eventos", icon: Calendar },
  { href: "/dashboard/ministerios", label: "Ministérios", icon: Mic },
  { href: "/dashboard/bookstore", label: "Bookstore", icon: ShoppingCart },
  { href: "/dashboard/carisma", label: "Carisma", icon: BookOpen },
  { href: "/dashboard/usuarios", label: "Usuários", icon: Users },
];

interface SidebarProps {
  user: {
    name: string;
    email: string;
  };
}

export const Sidebar = ({ user }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout");
    router.push("/login");
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-neutral-900 text-white flex flex-col h-screen">
      <div className="h-20 flex items-center justify-center border-b border-neutral-800">
        <Image src={logoBranca} alt="Logo Lagoinha" className="h-10 w-auto" />
      </div>

      <nav className="flex-grow p-4">
        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 my-1 rounded-lg transition-colors ${
                  pathname === item.href
                    ? "bg-primary text-black font-bold"
                    : "hover:bg-neutral-800"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-neutral-800">
        <p className="text-sm font-semibold truncate">{user.name}</p>
        <p className="text-xs text-neutral-400 truncate">{user.email}</p>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 mt-4 rounded-lg text-left text-red-400 hover:bg-red-900/50 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
};
