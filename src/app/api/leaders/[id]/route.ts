import { PrismaClient } from "@/generated/prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// ATUALIZAR um líder
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const { name, phone } = await request.json();

    const updatedLeader = await prisma.gCLeader.update({
      where: { id },
      data: { name, phone },
    });
    return NextResponse.json(updatedLeader);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar líder" },
      { status: 500 }
    );
  }
}

// DELETAR um líder
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await prisma.gCLeader.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Líder deletado com sucesso" });
  } catch (error: any) {
    if (error.code === "P2003") {
      return NextResponse.json(
        {
          error:
            "Não é possível deletar. Este líder ainda está vinculado a um GC.",
        },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Erro ao deletar líder" },
      { status: 500 }
    );
  }
}
