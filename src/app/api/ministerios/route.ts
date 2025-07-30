import { NextResponse } from "next/server";
import { db } from "@/services/firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";

// Função para LISTAR todos os ministérios
export async function GET() {
  try {
    const q = query(collection(db, "ministerios"), orderBy("name", "asc"));
    const ministeriosSnapshot = await getDocs(q);
    const ministerios = ministeriosSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(ministerios);
  } catch (error) {
    console.error("Erro ao buscar ministérios:", error);
    return NextResponse.json(
      { error: "Erro ao buscar ministérios" },
      { status: 500 }
    );
  }
}

// Função para CRIAR um novo ministério
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, leaderName, imageSrc } = body;

    const docRef = await addDoc(collection(db, "ministerios"), {
      name,
      description: description || null,
      leaderName: leaderName || null,
      imageSrc: imageSrc || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ id: docRef.id, ...body }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar ministério:", error);
    return NextResponse.json(
      { error: "Erro ao criar ministério" },
      { status: 500 }
    );
  }
}
