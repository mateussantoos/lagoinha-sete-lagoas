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

// Função para ATUALIZAR uma categoria específica
export async function PUT(
  request: NextRequest // <-- MUDANÇA: Apenas o request é necessário
) {
  try {
    // NOVA ABORDAGEM: Extrai o ID diretamente da URL
    const id = request.nextUrl.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { error: "ID da categoria ausente." },
        { status: 400 }
      );
    }

    const { name, description } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: "O nome da categoria é obrigatório." },
        { status: 400 }
      );
    }

    const docRef = doc(db, "productCategories", id);
    await updateDoc(docRef, {
      name,
      description: description || null,
      updatedAt: Timestamp.now(),
    });

    const updatedCategory = await getDoc(docRef);
    return NextResponse.json({
      id: updatedCategory.id,
      ...updatedCategory.data(),
    });
  } catch (error) {
    console.error("Erro ao atualizar categoria:", error);
    return NextResponse.json(
      { error: "Erro interno ao atualizar categoria" },
      { status: 500 }
    );
  }
}

// Função para DELETAR uma categoria específica
export async function DELETE(
  request: NextRequest // <-- MUDANÇA: Apenas o request é necessário
) {
  try {
    // NOVA ABORDAGEM: Extrai o ID diretamente da URL
    const id = request.nextUrl.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { error: "ID da categoria ausente." },
        { status: 400 }
      );
    }

    // Verificação de segurança: checa se algum produto usa esta categoria
    const q = query(
      collection(db, "products"),
      where("categoryIds", "array-contains", id),
      limit(1)
    );
    const productsQuery = await getDocs(q);

    if (!productsQuery.empty) {
      return NextResponse.json(
        {
          error:
            "Não é possível deletar. Esta categoria ainda possui produtos vinculados.",
        },
        { status: 409 } // Status 409 Conflict é mais apropriado aqui
      );
    }

    await deleteDoc(doc(db, "productCategories", id));

    return NextResponse.json({ message: "Categoria deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar categoria:", error);
    return NextResponse.json(
      { error: "Erro interno ao deletar categoria" },
      { status: 500 }
    );
  }
}
