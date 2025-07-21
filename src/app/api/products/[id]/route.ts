import { PrismaClient } from "@/generated/prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// ATUALIZAR um produto específico
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const { categoryIds, ...productData } = body;

    const updatedProduct = await prisma.produto.update({
      where: { id },
      data: {
        ...productData,
        categories: categoryIds
          ? {
              set: categoryIds.map((id: string) => ({ id })),
            }
          : undefined,
      },
    });
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar produto" },
      { status: 500 }
    );
  }
}

// DELETAR um produto específico
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await prisma.produto.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Produto deletado com sucesso" });
  } catch (error: any) {
    if (error.code === "P2003") {
      return NextResponse.json(
        {
          error:
            "Não é possível deletar. Este produto faz parte de uma ou mais encomendas.",
        },
        { status: 409 }
      );
    }
    console.error("Erro ao deletar produto:", error);
    return NextResponse.json(
      { error: "Erro ao deletar produto" },
      { status: 500 }
    );
  }
}
