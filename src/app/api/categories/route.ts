import { PrismaClient } from "@/generated/prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Lista todas as categorias
export async function GET() {
  try {
    const categories = await prisma.categoriaProduto.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar categorias" },
      { status: 500 }
    );
  }
}

// Cria uma nova categoria
export async function POST(request: Request) {
  try {
    const { name, description } = await request.json();
    const newCategory = await prisma.categoriaProduto.create({
      data: { name, description },
    });
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar categoria" },
      { status: 500 }
    );
  }
}
