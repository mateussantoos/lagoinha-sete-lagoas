import { NextRequest, NextResponse } from "next/server";
import { db } from "@/services/firebase";
import {
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  Timestamp,
} from "firebase/firestore";

// Função para ATUALIZAR um usuário específico
export async function PUT(
  request: NextRequest // <-- MUDANÇA: Apenas o request é necessário
) {
  try {
    // NOVA ABORDAGEM: Extrai o ID diretamente da URL
    const id = request.nextUrl.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { error: "ID do usuário ausente." },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Remove a senha do corpo para não atualizá-la acidentalmente
    const { password, ...userData } = body;

    const docRef = doc(db, "users", id);
    await updateDoc(docRef, {
      ...userData,
      updatedAt: Timestamp.now(), // <-- MUDANÇA: Usando Timestamp
    });

    const updatedUserDoc = await getDoc(docRef);
    const updatedUser = { id: updatedUserDoc.id, ...updatedUserDoc.data() };

    // Remove a senha do retorno por segurança, caso ela exista
    delete (updatedUser as any).password;

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return NextResponse.json(
      { error: "Erro interno ao atualizar usuário" },
      { status: 500 }
    );
  }
}

// Função para DELETAR um usuário específico
export async function DELETE(
  request: NextRequest // <-- MUDANÇA: Apenas o request é necessário
) {
  try {
    // NOVA ABORDAGEM: Extrai o ID diretamente da URL
    const id = request.nextUrl.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { error: "ID do usuário ausente." },
        { status: 400 }
      );
    }

    // ATENÇÃO: Isso deleta o registro no Firestore, mas não o usuário no Firebase Auth.
    await deleteDoc(doc(db, "users", id));
    return NextResponse.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return NextResponse.json(
      { error: "Erro interno ao deletar usuário" },
      { status: 500 }
    );
  }
}
