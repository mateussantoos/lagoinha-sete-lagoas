import { NextResponse } from "next/server";
import { db } from "@/services/firebase";
import { doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";

// Função para ATUALIZAR um usuário específico
export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id;
    const body = await request.json();

    // Remove a senha do corpo para não atualizá-la acidentalmente
    const { password, ...userData } = body;

    const docRef = doc(db, "users", id);
    await updateDoc(docRef, {
      ...userData,
      updatedAt: new Date().toISOString(),
    });

    const updatedUser = await getDoc(docRef);
    const { password: _, ...userWithoutPassword } = updatedUser.data() as any;

    return NextResponse.json({ id: updatedUser.id, ...userWithoutPassword });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar usuário" },
      { status: 500 }
    );
  }
}

// Função para DELETAR um usuário específico
export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id;
    // ATENÇÃO: Isso deleta o registro no Firestore, mas não o usuário no Firebase Auth.
    await deleteDoc(doc(db, "users", id));
    return NextResponse.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return NextResponse.json(
      { error: "Erro ao deletar usuário" },
      { status: 500 }
    );
  }
}
