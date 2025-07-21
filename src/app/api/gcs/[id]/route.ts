import { PrismaClient } from "@/generated/prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// ATUALIZAR um GC
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const { leaderIds, ...gcData } = body;

    const updatedGc = await prisma.gC.update({
      where: { id },
      data: {
        ...gcData,
        day: gcData.day,
        leaders: {
          set: leaderIds.map((leaderId: string) => ({ id: leaderId })),
        },
      },
      include: {
        leaders: true,
      },
    });
    return NextResponse.json(updatedGc);
  } catch (error) {
    console.error("Erro ao atualizar GC:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar GC" },
      { status: 500 }
    );
  }
}

// DELETAR um GC
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await prisma.gC.delete({
      where: { id },
    });
    return NextResponse.json({ message: "GC deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar GC:", error);
    return NextResponse.json({ error: "Erro ao deletar GC" }, { status: 500 });
  }
}
