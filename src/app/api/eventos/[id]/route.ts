import { NextRequest, NextResponse } from "next/server";
import { db } from "@/services/firebase";
import {
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  Timestamp,
} from "firebase/firestore";

// Função para ATUALIZAR um evento específico
export async function PUT(
  request: NextRequest // <-- MUDANÇA: Apenas o request é necessário
) {
  try {
    // NOVA ABORDAGEM: Extrai o ID diretamente da URL
    const id = request.nextUrl.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { error: "ID do evento ausente." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { date, ...eventData } = body;

    const docRef = doc(db, "eventos", id);
    await updateDoc(docRef, {
      ...eventData,
      date: Timestamp.fromDate(new Date(date)),
      updatedAt: Timestamp.now(),
    });

    const updatedEvent = await getDoc(docRef);
    return NextResponse.json({ id: updatedEvent.id, ...updatedEvent.data() });
  } catch (error) {
    console.error("Erro ao atualizar evento:", error);
    return NextResponse.json(
      { error: "Erro interno ao atualizar evento" },
      { status: 500 }
    );
  }
}

// Função para DELETAR um evento específico
export async function DELETE(
  request: NextRequest // <-- MUDANÇA: Apenas o request é necessário
) {
  try {
    // NOVA ABORDAGEM: Extrai o ID diretamente da URL
    const id = request.nextUrl.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { error: "ID do evento ausente." },
        { status: 400 }
      );
    }

    await deleteDoc(doc(db, "eventos", id));
    return NextResponse.json({ message: "Evento deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar evento:", error);
    return NextResponse.json(
      { error: "Erro interno ao deletar evento" },
      { status: 500 }
    );
  }
}
