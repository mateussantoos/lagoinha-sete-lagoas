import { PrismaClient } from "@/generated/prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const eventos = await prisma.evento.findMany();
    return NextResponse.json(eventos);
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar eventos" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, date, location, imageSrc } = body;

    const newEvento = await prisma.evento.create({
      data: {
        title,
        description,
        date: new Date(date),
        location,
        imageSrc,
      },
    });
    return NextResponse.json(newEvento, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar evento:", error);
    return NextResponse.json(
      { error: "Erro ao criar evento" },
      { status: 500 }
    );
  }
}
