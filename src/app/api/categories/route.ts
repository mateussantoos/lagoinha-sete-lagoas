import { NextResponse } from "next/server";
import { db } from "@/services/firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";

// Função para LISTAR todas as categorias
export async function GET() {
  try {
    const q = query(
      collection(db, "productCategories"),
      orderBy("name", "asc")
    );
    const categoriesSnapshot = await getDocs(q);
    const categories = categoriesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return NextResponse.json(
      { error: "Erro ao buscar categorias" },
      { status: 500 }
    );
  }
}

// Função para CRIAR uma nova categoria
export async function POST(request: Request) {
  try {
    const { name, description } = await request.json();

    const docRef = await addDoc(collection(db, "productCategories"), {
      name,
      description: description || null,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { id: docRef.id, name, description },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    return NextResponse.json(
      { error: "Erro ao criar categoria" },
      { status: 500 }
    );
  }
}
