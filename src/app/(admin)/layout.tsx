import { Sidebar } from "@/components/admin/Sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

// Tipagem para os dados do usuário dentro do token
interface UserPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // --- LÓGICA DE PROTEÇÃO DE ROTA ---
  const tokenCookie = (await cookies()).get("auth_token");
  let userPayload: UserPayload | null = null;

  if (!tokenCookie) {
    redirect("/login");
  }

  try {
    const decoded = jwt.verify(tokenCookie.value, process.env.JWT_SECRET!);
    userPayload = decoded as UserPayload;
  } catch (error) {
    console.error("Token inválido ou expirado:", error);
    redirect("/login");
  }

  if (!userPayload) {
    redirect("/login");
  }

  return (
    <div className="flex bg-stone-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100">
      <Sidebar user={userPayload} />
      <main className="flex-grow p-8 overflow-auto h-screen">{children}</main>
    </div>
  );
}
