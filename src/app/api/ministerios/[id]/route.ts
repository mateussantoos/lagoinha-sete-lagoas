import { NextRequest, NextResponse } from "next/server";
import { db } from "@/services/firebase";
import {
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  collection,
  query,
  where,
  limit,
  getDocs,
  Timestamp,
} from "firebase/firestore";

// Função para ATUALIZAR um ministério específico
export async function PUT(
  request: NextRequest // <-- MUDANÇA: Apenas o request é necessário
) {
  try {
    // NOVA ABORDAGEM: Extrai o ID diretamente da URL
    const id = request.nextUrl.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { error: "ID do ministério ausente." },
        { status: 400 }
      );
    }

    const body = await request.json();

    const docRef = doc(db, "ministerios", id);
    await updateDoc(docRef, {
      ...body,
      updatedAt: Timestamp.now(), // <-- MUDANÇA: Usando Timestamp
    });

    const updatedMinisterio = await getDoc(docRef);
    return NextResponse.json({
      id: updatedMinisterio.id,
      ...updatedMinisterio.data(),
    });
  } catch (error) {
    console.error("Erro ao atualizar ministério:", error);
    return NextResponse.json(
      { error: "Erro interno ao atualizar ministério" },
      { status: 500 }
    );
  }
}

// Função para DELETAR um ministério específico
export async function DELETE(
  request: NextRequest // <-- MUDANÇA: Apenas o request é necessário
) {
  try {
    // NOVA ABORDAGEM: Extrai o ID diretamente da URL
    const id = request.nextUrl.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { error: "ID do ministério ausente." },
        { status: 400 }
      );
    }

    // Verificação de segurança: checa se algum evento usa este ministério
    const q = query(
      collection(db, "eventos"),
      where("ministerioId", "==", id),
      limit(1)
    );
    const eventosQuery = await getDocs(q);

    if (!eventosQuery.empty) {
      return NextResponse.json(
        {
          error:
            "Não é possível deletar. Este ministério está vinculado a um ou mais eventos.",
        },
        { status: 409 }
      );
    }

    await deleteDoc(doc(db, "ministerios", id));

    return NextResponse.json({ message: "Ministério deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar ministério:", error);
    return NextResponse.json(
      { error: "Erro interno ao deletar ministério" },
      { status: 500 }
    );
  }
}
