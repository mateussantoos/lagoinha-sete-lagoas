import { NextResponse } from "next/server";
import { db } from "@/services/firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";

// Função para LISTAR todos os líderes
export async function GET() {
  try {
    const q = query(collection(db, "leaders"), orderBy("name", "asc"));
    const leadersSnapshot = await getDocs(q);
    const leaders = leadersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(leaders);
  } catch (error) {
    console.error("Erro ao buscar líderes:", error);
    return NextResponse.json(
      { error: "Erro ao buscar líderes" },
      { status: 500 }
    );
  }
}

// Função para CRIAR um novo líder
export async function POST(request: Request) {
  try {
    const { name, phone } = await request.json();

    const docRef = await addDoc(collection(db, "leaders"), {
      name,
      phone,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ id: docRef.id, name, phone }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar líder:", error);
    return NextResponse.json({ error: "Erro ao criar líder" }, { status: 500 });
  }
}
