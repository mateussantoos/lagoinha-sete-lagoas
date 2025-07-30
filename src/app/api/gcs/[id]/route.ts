import { NextResponse } from "next/server";
import { db } from "@/services/firebase";
import { doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { Client } from "@googlemaps/google-maps-services-js";

const googleMapsClient = new Client({});

// Função para ATUALIZAR um GC específico
export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id;
    const body = await request.json();
    const { address, ...gcData } = body;

    let dataToUpdate: any = { ...gcData, updatedAt: new Date().toISOString() };

    if (address) {
      dataToUpdate.address = address;
      const geocodeResponse = await googleMapsClient.geocode({
        params: {
          address: `${address}, Sete Lagoas, MG`,
          key: process.env.Maps_API_KEY!,
        },
      });
      if (geocodeResponse.data.results[0]) {
        const location = geocodeResponse.data.results[0].geometry.location;
        dataToUpdate.latitude = location.lat;
        dataToUpdate.longitude = location.lng;
      }
    }

    const docRef = doc(db, "gcs", id);
    await updateDoc(docRef, dataToUpdate);

    const updatedGc = await getDoc(docRef);
    return NextResponse.json({ id: updatedGc.id, ...updatedGc.data() });
  } catch (error) {
    console.error("Erro ao atualizar GC:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar GC" },
      { status: 500 }
    );
  }
}

// Função para DELETAR um GC específico
export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id;
    await deleteDoc(doc(db, "gcs", id));
    return NextResponse.json({ message: "GC deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar GC:", error);
    return NextResponse.json({ error: "Erro ao deletar GC" }, { status: 500 });
  }
}
