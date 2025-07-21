import { PrismaClient } from "@/generated/prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// ATUALIZAR uma categoria
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const { name, description } = await request.json();
    const updatedCategory = await prisma.categoriaProduto.update({
      where: { id },
      data: { name, description },
    });
    return NextResponse.json(updatedCategory);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar categoria" },
      { status: 500 }
    );
  }
}

// DELETAR uma categoria
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await prisma.categoriaProduto.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Categoria deletada com sucesso" });
  } catch (error: any) {
    // Se a categoria ainda tiver produtos, o Prisma retornará um erro
    if (error.code === "P2003") {
      return NextResponse.json(
        {
          error:
            "Não é possível deletar. Esta categoria ainda possui produtos vinculados.",
        },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Erro ao deletar categoria" },
      { status: 500 }
    );
  }
}
