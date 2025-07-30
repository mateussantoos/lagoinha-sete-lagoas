import { NextResponse } from "next/server";
import { db } from "@/services/firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  orderBy,
} from "firebase/firestore";

// Função para LISTAR todos os usuários
export async function GET() {
  try {
    const q = query(collection(db, "users"), orderBy("name", "asc"));
    const usersSnapshot = await getDocs(q);
    const users = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return NextResponse.json(
      { error: "Erro ao buscar usuários" },
      { status: 500 }
    );
  }
}

// Função para SALVAR DADOS de um novo usuário no Firestore
// A criação da autenticação acontece no frontend
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { uid, name, email, role } = body;

    // Usa o UID da autenticação como ID do documento no Firestore
    await setDoc(doc(db, "users", uid), {
      name,
      email,
      role: role || "MEMBER",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ id: uid, ...body }, { status: 201 });
  } catch (error) {
    console.error("Erro ao salvar dados do usuário:", error);
    return NextResponse.json(
      { error: "Erro ao salvar dados do usuário" },
      { status: 500 }
    );
  }
}
