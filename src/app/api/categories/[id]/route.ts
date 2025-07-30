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

// Função para ATUALIZAR uma categoria específica
export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id;
    const { name, description } = await request.json();

    const docRef = doc(db, "productCategories", id);
    await updateDoc(docRef, {
      name,
      description: description || null,
    });

    const updatedCategory = await getDoc(docRef);
    return NextResponse.json({
      id: updatedCategory.id,
      ...updatedCategory.data(),
    });
  } catch (error) {
    console.error("Erro ao atualizar categoria:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar categoria" },
      { status: 500 }
    );
  }
}

// Função para DELETAR uma categoria específica
export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id;

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
        { status: 409 }
      );
    }

    await deleteDoc(doc(db, "productCategories", id));

    return NextResponse.json({ message: "Categoria deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar categoria:", error);
    return NextResponse.json(
      { error: "Erro ao deletar categoria" },
      { status: 500 }
    );
  }
}
