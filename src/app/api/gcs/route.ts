import { NextResponse } from "next/server";
import { db } from "@/services/firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { Client } from "@googlemaps/google-maps-services-js";

const googleMapsClient = new Client({});

// Função para LISTAR todos os GCs
export async function GET() {
  try {
    const q = query(collection(db, "gcs"), orderBy("name", "asc"));
    const gcsSnapshot = await getDocs(q);

    // Para manter a compatibilidade, vamos buscar os líderes
    const leadersSnapshot = await getDocs(collection(db, "leaders"));
    const leadersMap = new Map(
      leadersSnapshot.docs.map((doc) => [doc.id, doc.data()])
    );

    const gcs = gcsSnapshot.docs.map((doc) => {
      const gcData = doc.data();
      const leaders = (gcData.leaderIds || []).map((id: string) => ({
        id,
        name: leadersMap.get(id)?.name || "Líder não encontrado",
      }));
      return { id: doc.id, ...gcData, leaders };
    });

    return NextResponse.json(gcs);
  } catch (error) {
    console.error("Erro ao buscar GCs:", error);
    return NextResponse.json({ error: "Erro ao buscar GCs" }, { status: 500 });
  }
}

// Função para CRIAR um novo GC
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { address, leaderIds, ...gcData } = body;

    let latitude = null;
    let longitude = null;

    if (address) {
      const geocodeResponse = await googleMapsClient.geocode({
        params: {
          address: `${address}, Sete Lagoas, MG`,
          key: process.env.Maps_API_KEY!,
        },
      });
      if (geocodeResponse.data.results[0]) {
        const location = geocodeResponse.data.results[0].geometry.location;
        latitude = location.lat;
        longitude = location.lng;
      }
    }

    const docRef = await addDoc(collection(db, "gcs"), {
      ...gcData,
      address,
      latitude,
      longitude,
      leaderIds: leaderIds || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ id: docRef.id, ...body }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar GC:", error);
    return NextResponse.json({ error: "Erro ao criar GC" }, { status: 500 });
  }
}
