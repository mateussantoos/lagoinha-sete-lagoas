import { PrismaClient } from "@/generated/prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const ministerios = await prisma.ministerio.findMany();
    return NextResponse.json(ministerios);
  } catch (error) {
    console.error("Erro ao buscar ministérios:", error);
    return NextResponse.json(
      { error: "Erro ao buscar ministérios" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, leaderName, imageSrc } = body;

    const newMinisterio = await prisma.ministerio.create({
      data: { name, description, leaderName, imageSrc },
    });
    return NextResponse.json(newMinisterio, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar ministério:", error);
    return NextResponse.json(
      { error: "Erro ao criar ministério" },
      { status: 500 }
    );
  }
}
