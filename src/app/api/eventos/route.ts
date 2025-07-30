import { NextResponse } from "next/server";
import { db } from "@/services/firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";

// Função para LISTAR todos os eventos
export async function GET() {
  try {
    const q = query(collection(db, "eventos"), orderBy("date", "desc"));
    const eventosSnapshot = await getDocs(q);
    const eventos = eventosSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(eventos);
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar eventos" },
      { status: 500 }
    );
  }
}

// Função para CRIAR um novo evento
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, date, location, imageSrc, ministerioId } = body;

    const docRef = await addDoc(collection(db, "eventos"), {
      title,
      description,
      date: Timestamp.fromDate(new Date(date)),
      location,
      imageSrc: imageSrc || null,
      ministerioId: ministerioId || null,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    return NextResponse.json({ id: docRef.id, ...body }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar evento:", error);
    return NextResponse.json(
      { error: "Erro ao criar evento" },
      { status: 500 }
    );
  }
}
