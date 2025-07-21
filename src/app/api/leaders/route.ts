import { PrismaClient } from "@/generated/prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone } = body;

    const newLeader = await prisma.gCLeader.create({
      data: {
        name,
        phone,
      },
    });

    return NextResponse.json(newLeader, { status: 201 });
  } catch (error: any) {
    console.error("Erro ao criar líder:", error);
    if (error.code === "P2002" && error.meta?.target?.includes("phone")) {
      return NextResponse.json(
        { error: "Já existe um líder com este telefone." },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Erro ao criar líder" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const leaders = await prisma.gCLeader.findMany();
    return NextResponse.json(leaders);
  } catch (error) {
    console.error("Erro ao buscar líderes:", error);
    return NextResponse.json(
      { error: "Erro ao buscar líderes" },
      { status: 500 }
    );
  }
}
