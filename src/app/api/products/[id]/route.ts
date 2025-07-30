import { NextRequest, NextResponse } from "next/server";
import { db } from "@/services/firebase";
import {
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  Timestamp,
} from "firebase/firestore";

// Função para ATUALIZAR um produto específico
export async function PUT(
  request: NextRequest // <-- MUDANÇA: Apenas o request é necessário
) {
  try {
    // NOVA ABORDAGEM: Extrai o ID diretamente da URL
    const id = request.nextUrl.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { error: "ID do produto ausente." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { categoryIds, ...productData } = body;

    const docRef = doc(db, "products", id);
    await updateDoc(docRef, {
      ...productData,
      categoryIds: categoryIds || [],
      updatedAt: Timestamp.now(), // <-- MUDANÇA: Usando Timestamp
    });

    const updatedProduct = await getDoc(docRef);
    return NextResponse.json({
      id: updatedProduct.id,
      ...updatedProduct.data(),
    });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return NextResponse.json(
      { error: "Erro interno ao atualizar produto" },
      { status: 500 }
    );
  }
}

// Função para DELETAR um produto específico
export async function DELETE(
  request: NextRequest // <-- MUDANÇA: Apenas o request é necessário
) {
  try {
    // NOVA ABORDAGEM: Extrai o ID diretamente da URL
    const id = request.nextUrl.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { error: "ID do produto ausente." },
        { status: 400 }
      );
    }

    // Lógica futura: verificar se o produto está em alguma encomenda antes de deletar
    await deleteDoc(doc(db, "products", id));
    return NextResponse.json({ message: "Produto deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    return NextResponse.json(
      { error: "Erro interno ao deletar produto" },
      { status: 500 }
    );
  }
}
