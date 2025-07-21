import { PrismaClient } from "@/generated/prisma/client";
import { NextResponse } from "next/server";
import { Client } from "@googlemaps/google-maps-services-js";

const prisma = new PrismaClient();
const googleMapsClient = new Client({});

// ATUALIZAR um GC
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    const { leaderIds, address, ...gcData } = body;

    let locationData = {};

    if (address) {
      const geocodeResponse = await googleMapsClient.geocode({
        params: {
          address: address,
          key: process.env.Maps_API_KEY!,
        },
      });
      if (geocodeResponse.data.results[0]) {
        const location = geocodeResponse.data.results[0].geometry.location;
        locationData = {
          address,
          latitude: location.lat,
          longitude: location.lng,
        };
      }
    }

    const updatedGc = await prisma.gC.update({
      where: { id },
      data: {
        ...gcData,
        ...locationData,
        leaders: leaderIds
          ? { set: leaderIds.map((leaderId: string) => ({ id: leaderId })) }
          : undefined,
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
