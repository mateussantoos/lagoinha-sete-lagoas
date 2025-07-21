import { PrismaClient } from "@/generated/prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Lista todos os produtos
export async function GET() {
  try {
    const products = await prisma.produto.findMany({
      include: { categories: true },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 }
    );
  }
}

// Cria um novo produto
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, sku, description, price, categoryIds, ...outrosCampos } =
      body;

    const newProduct = await prisma.produto.create({
      data: {
        name,
        sku,
        description,
        price,
        ...outrosCampos,
        categories: categoryIds
          ? {
              connect: categoryIds.map((id: string) => ({ id })),
            }
          : undefined,
      },
    });
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar produto" },
      { status: 500 }
    );
  }
}
