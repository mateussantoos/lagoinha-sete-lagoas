import { PrismaClient } from "@/generated/prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// ATUALIZAR um evento
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const { title, description, date, location, imageSrc } = body;

    const updatedEvento = await prisma.evento.update({
      where: { id },
      data: {
        title,
        description,
        date: new Date(date),
        location,
        imageSrc,
      },
    });
    return NextResponse.json(updatedEvento);
  } catch (error) {
    console.error("Erro ao atualizar evento:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar evento" },
      { status: 500 }
    );
  }
}

// DELETAR um evento
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await prisma.evento.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Evento deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar evento:", error);
    return NextResponse.json(
      { error: "Erro ao deletar evento" },
      { status: 500 }
    );
  }
}
