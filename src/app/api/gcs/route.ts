import { PrismaClient } from "@/generated/prisma/client";
import { NextResponse } from "next/server";
import { Client } from "@googlemaps/google-maps-services-js";

const prisma = new PrismaClient();
const googleMapsClient = new Client({});

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

    let latitude = null;
    let longitude = null;

    if (address) {
      const geocodeResponse = await googleMapsClient.geocode({
        params: {
          address: address,
          key: process.env.Maps_API_KEY!,
        },
      });
      if (geocodeResponse.data.results[0]) {
        const location = geocodeResponse.data.results[0].geometry.location;
        latitude = location.lat;
        longitude = location.lng;
      }
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
        latitude,
        longitude,
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
