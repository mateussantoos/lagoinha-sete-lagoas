import { NextResponse } from "next/server";
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
} from "firebase/firestore";

// Função para ATUALIZAR um ministério específico
export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id;
    const body = await request.json();

    const docRef = doc(db, "ministerios", id);
    await updateDoc(docRef, {
      ...body,
      updatedAt: new Date().toISOString(),
    });

    const updatedMinisterio = await getDoc(docRef);
    return NextResponse.json({
      id: updatedMinisterio.id,
      ...updatedMinisterio.data(),
    });
  } catch (error) {
    console.error("Erro ao atualizar ministério:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar ministério" },
      { status: 500 }
    );
  }
}

// Função para DELETAR um ministério específico
export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id;

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
      { error: "Erro ao deletar ministério" },
      { status: 500 }
    );
  }
}
