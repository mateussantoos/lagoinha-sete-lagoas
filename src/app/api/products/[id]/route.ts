import { NextResponse } from "next/server";
import { db } from "@/services/firebase";
import { doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";

// Função para ATUALIZAR um produto específico
export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id;
    const body = await request.json();
    const { categoryIds, ...productData } = body;

    const docRef = doc(db, "products", id);
    await updateDoc(docRef, {
      ...productData,
      categoryIds: categoryIds || [],
      updatedAt: new Date().toISOString(),
    });

    const updatedProduct = await getDoc(docRef);
    return NextResponse.json({
      id: updatedProduct.id,
      ...updatedProduct.data(),
    });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar produto" },
      { status: 500 }
    );
  }
}

// Função para DELETAR um produto específico
export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id;
    // Lógica futura: verificar se o produto está em alguma encomenda antes de deletar
    await deleteDoc(doc(db, "products", id));
    return NextResponse.json({ message: "Produto deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    return NextResponse.json(
      { error: "Erro ao deletar produto" },
      { status: 500 }
    );
  }
}
