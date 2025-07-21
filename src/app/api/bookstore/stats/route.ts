import { PrismaClient } from "@/generated/prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const productCount = await prisma.produto.count();

    const pendingOrdersCount = await prisma.encomenda.count({
      where: { status: "PENDENTE" },
    });

    const lowStockCount = await prisma.produto.count({
      where: {
        stock: {
          lt: 5,
        },
      },
    });

    const categoryCount = await prisma.categoriaProduto.count();

    return NextResponse.json({
      productCount,
      pendingOrdersCount,
      lowStockCount,
      categoryCount,
    });
  } catch (error) {
    console.error("Erro ao buscar métricas da bookstore:", error);
    return NextResponse.json(
      { error: "Erro ao buscar métricas" },
      { status: 500 }
    );
  }
}
