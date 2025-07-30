import { NextRequest, NextResponse } from "next/server";
import { db } from "@/services/firebase";
import {
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { Client } from "@googlemaps/google-maps-services-js";

const googleMapsClient = new Client({});

// Função para ATUALIZAR um GC específico
export async function PUT(
  request: NextRequest // <-- MUDANÇA: Apenas o request é necessário
) {
  try {
    // NOVA ABORDAGEM: Extrai o ID diretamente da URL
    const id = request.nextUrl.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json({ error: "ID do GC ausente." }, { status: 400 });
    }

    const body = await request.json();
    const { address, ...gcData } = body;

    let dataToUpdate: any = { ...gcData, updatedAt: Timestamp.now() };

    // Mantém a sua lógica de geocodificação
    if (address) {
      dataToUpdate.address = address;
      try {
        const geocodeResponse = await googleMapsClient.geocode({
          params: {
            address: `${address}, Sete Lagoas, MG`,
            key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
          },
        });
        if (geocodeResponse.data.results[0]) {
          const location = geocodeResponse.data.results[0].geometry.location;
          dataToUpdate.latitude = location.lat;
          dataToUpdate.longitude = location.lng;
        }
      } catch (geoError) {
        console.error("Erro de geocodificação:", geoError);
        // Decide se quer interromper ou continuar sem as coordenadas
      }
    }

    const docRef = doc(db, "gcs", id);
    await updateDoc(docRef, dataToUpdate);

    const updatedGc = await getDoc(docRef);
    return NextResponse.json({ id: updatedGc.id, ...updatedGc.data() });
  } catch (error) {
    console.error("Erro ao atualizar GC:", error);
    return NextResponse.json(
      { error: "Erro interno ao atualizar GC" },
      { status: 500 }
    );
  }
}

// Função para DELETAR um GC específico
export async function DELETE(
  request: NextRequest // <-- MUDANÇA: Apenas o request é necessário
) {
  try {
    // NOVA ABORDAGEM: Extrai o ID diretamente da URL
    const id = request.nextUrl.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json({ error: "ID do GC ausente." }, { status: 400 });
    }

    await deleteDoc(doc(db, "gcs", id));
    return NextResponse.json({ message: "GC deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar GC:", error);
    return NextResponse.json(
      { error: "Erro interno ao deletar GC" },
      { status: 500 }
    );
  }
}
