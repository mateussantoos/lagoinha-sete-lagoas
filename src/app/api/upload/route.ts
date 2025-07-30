import { NextResponse } from "next/server";
import { storage } from "@/services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo enviado." },
        { status: 400 }
      );
    }

    // Converte o arquivo para um buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Gera um nome de arquivo único com a data atual para evitar sobreposições
    const filename = `uploads/${Date.now()}_${file.name.replaceAll(" ", "_")}`;

    // Cria uma referência para o arquivo no Firebase Storage
    const storageRef = ref(storage, filename);

    // Faz o upload do buffer do arquivo
    await uploadBytes(storageRef, buffer, {
      contentType: file.type, // Adiciona o tipo do arquivo (ex: image/jpeg)
    });

    // Pega a URL pública do arquivo que acabamos de enviar
    const imageUrl = await getDownloadURL(storageRef);

    return NextResponse.json({ success: true, imageUrl });
  } catch (error) {
    console.error("Erro no upload para o Firebase Storage:", error);
    return NextResponse.json(
      { error: "Falha no upload do arquivo." },
      { status: 500 }
    );
  }
}
