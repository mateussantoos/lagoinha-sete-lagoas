import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { Sidebar } from "@/components/admin/Sidebar";
import { db } from "@/services/firebase";
import { doc, getDoc } from "firebase/firestore";

interface FirebaseJwtPayload {
  user_id: string;
  email: string;
}

export interface UserData {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "MEMBER";
}

async function getUserDataFromFirestore(uid: string): Promise<UserData | null> {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      console.error(
        `Documento de usuário não encontrado no Firestore para UID: ${uid}`
      );
      return null;
    }

    const data = userDoc.data();
    return {
      id: userDoc.id,
      name: data.name,
      email: data.email,
      role: data.role,
    };
  } catch (error) {
    console.error("Erro ao buscar dados do usuário no Firestore:", error);
    return null;
  }
}

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesStore = await cookies();
  const tokenCookie = cookiesStore.get("auth_token");

  if (!tokenCookie?.value) {
    redirect("/login");
  }

  let user: UserData | null = null;

  try {
    const decodedToken: FirebaseJwtPayload = jwtDecode(tokenCookie.value);
    const uid = decodedToken.user_id;

    if (!uid) {
      throw new Error("UID não encontrado no token.");
    }

    user = await getUserDataFromFirestore(uid);

    if (!user) {
      console.error("Usuário autenticado mas sem registro no banco de dados.");
      redirect("/login");
    }

    if (user.role !== "ADMIN") {
      console.warn(
        `Tentativa de acesso negada para o usuário: ${user.email} (Role: ${user.role})`
      );
      redirect("/login");
    }
  } catch (error) {
    console.error(
      "Token inválido ou expirado. Redirecionando para login.",
      error
    );
    const cookiesStore = await cookies();
    cookiesStore.set("auth_token", "", { expires: new Date(0), path: "/" });
    redirect("/login");
  }

  return (
    <div className="flex bg-stone-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100">
      <Sidebar user={user} />
      <main className="flex-grow p-8 overflow-auto h-screen">{children}</main>
    </div>
  );
}
