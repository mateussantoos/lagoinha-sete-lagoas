import { PrismaClient } from "@/generated/prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// ATUALIZAR um ministério
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();

    const updatedMinisterio = await prisma.ministerio.update({
      where: { id },
      data: body,
    });
    return NextResponse.json(updatedMinisterio);
  } catch (error) {
    console.error("Erro ao atualizar ministério:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar ministério" },
      { status: 500 }
    );
  }
}

// DELETAR um ministério
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await prisma.ministerio.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Ministério deletado com sucesso" });
  } catch (error: any) {
    if (error.code === "P2003") {
      return NextResponse.json(
        {
          error:
            "Não é possível deletar. Este ministério está vinculado a um ou mais eventos.",
        },
        { status: 409 }
      );
    }
    console.error("Erro ao deletar ministério:", error);
    return NextResponse.json(
      { error: "Erro ao deletar ministério" },
      { status: 500 }
    );
  }
}
