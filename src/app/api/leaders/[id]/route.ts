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

// Função para ATUALIZAR um líder específico
export async function PUT(
  request: NextRequest // <-- MUDANÇA: Apenas o request é necessário
) {
  try {
    // NOVA ABORDAGEM: Extrai o ID diretamente da URL
    const id = request.nextUrl.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { error: "ID do líder ausente." },
        { status: 400 }
      );
    }

    const { name, phone } = await request.json();

    const docRef = doc(db, "leaders", id);
    await updateDoc(docRef, {
      name,
      phone,
      updatedAt: Timestamp.now(), // <-- MUDANÇA: Usando Timestamp
    });

    const updatedLeader = await getDoc(docRef);
    return NextResponse.json({ id: updatedLeader.id, ...updatedLeader.data() });
  } catch (error) {
    console.error("Erro ao atualizar líder:", error);
    return NextResponse.json(
      { error: "Erro interno ao atualizar líder" },
      { status: 500 }
    );
  }
}

// Função para DELETAR um líder específico
export async function DELETE(
  request: NextRequest // <-- MUDANÇA: Apenas o request é necessário
) {
  try {
    // NOVA ABORDAGEM: Extrai o ID diretamente da URL
    const id = request.nextUrl.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { error: "ID do líder ausente." },
        { status: 400 }
      );
    }

    // Verificação de segurança: checa se algum GC usa este líder
    const q = query(
      collection(db, "gcs"),
      where("leaderIds", "array-contains", id),
      limit(1)
    );
    const gcsQuery = await getDocs(q);

    if (!gcsQuery.empty) {
      return NextResponse.json(
        {
          error:
            "Não é possível deletar. Este líder ainda está vinculado a um GC.",
        },
        { status: 409 }
      );
    }

    await deleteDoc(doc(db, "leaders", id));

    return NextResponse.json({ message: "Líder deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar líder:", error);
    return NextResponse.json(
      { error: "Erro interno ao deletar líder" },
      { status: 500 }
    );
  }
}
