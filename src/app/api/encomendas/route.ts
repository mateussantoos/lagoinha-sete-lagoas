import { PrismaClient } from "@/generated/prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Função para LISTAR todas as encomendas
export async function GET() {
  try {
    const encomendas = await prisma.encomenda.findMany({
      include: {
        items: {
          include: {
            produto: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(encomendas);
  } catch (error) {
    console.error("Erro ao buscar encomendas:", error);
    return NextResponse.json(
      { error: "Erro ao buscar encomendas" },
      { status: 500 }
    );
  }
}

// Função para CRIAR uma nova encomenda
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerPhone, customerEmail, items } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "A encomenda precisa ter pelo menos um item." },
        { status: 400 }
      );
    }

    const novaEncomenda = await prisma.$transaction(async (tx) => {
      const encomenda = await tx.encomenda.create({
        data: {
          customerName,
          customerPhone,
          customerEmail,
        },
      });

      const itensParaCriar = items.map(
        (item: { produtoId: string; quantity: number }) => ({
          encomendaId: encomenda.id,
          produtoId: item.produtoId,
          quantity: item.quantity,
        })
      );

      await tx.itemEncomenda.createMany({
        data: itensParaCriar,
      });

      return tx.encomenda.findUnique({
        where: { id: encomenda.id },
        include: {
          items: {
            include: {
              produto: true,
            },
          },
        },
      });
    });

    return NextResponse.json(novaEncomenda, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar encomenda:", error);
    return NextResponse.json(
      { error: "Erro ao criar encomenda" },
      { status: 500 }
    );
  }
}
