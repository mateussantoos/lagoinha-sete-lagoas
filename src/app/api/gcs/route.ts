import { PrismaClient } from "@/generated/prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const gcs = await prisma.gC.findMany({
      include: { leaders: true },
    });
    return NextResponse.json(gcs);
  } catch (error) {
    console.error("Erro ao buscar GCs:", error);
    return NextResponse.json({ error: "Erro ao buscar GCs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      address,
      day,
      time,
      description,
      targetAudience,
      image,
      leaderIds,
    } = body;

    if (!leaderIds || leaderIds.length === 0) {
      return NextResponse.json(
        { error: "É necessário fornecer o ID de pelo menos um líder." },
        { status: 400 }
      );
    }

    const newGC = await prisma.gC.create({
      data: {
        name,
        address,
        day,
        time,
        description,
        targetAudience,
        image,
        leaders: {
          connect: leaderIds.map((id: string) => ({ id })),
        },
      },
      include: {
        leaders: true,
      },
    });

    return NextResponse.json(newGC, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar GC:", error);
    return NextResponse.json({ error: "Erro ao criar GC" }, { status: 500 });
  }
}
