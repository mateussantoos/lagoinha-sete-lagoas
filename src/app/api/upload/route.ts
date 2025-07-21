import { NextResponse } from "next/server";
import { Formidable } from "formidable";
import path from "path";
import fs from "fs/promises";

// Desativa o bodyParser padrão do Next.js para esta rota
export const config = {
  api: {
    bodyParser: false,
  },
};

// Função para garantir que o diretório de uploads exista
const ensureUploadsDirExists = async () => {
  const uploadsDir = path.join(process.cwd(), "public/uploads");
  try {
    await fs.access(uploadsDir);
  } catch (error) {
    // Se o diretório não existe, cria
    await fs.mkdir(uploadsDir, { recursive: true });
  }
  return uploadsDir;
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo enviado." },
        { status: 400 }
      );
    }

    // Converte o arquivo para um buffer para poder salvá-lo
    const buffer = Buffer.from(await file.arrayBuffer());

    // Gera um nome de arquivo único com a data atual
    const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");

    const uploadsDir = await ensureUploadsDirExists();

    // Salva o arquivo no diretório public/uploads
    await fs.writeFile(path.join(uploadsDir, filename), buffer);

    // Retorna a URL pública do arquivo salvo
    const imageUrl = `/uploads/${filename}`;
    return NextResponse.json({ success: true, imageUrl });
  } catch (error) {
    console.error("Erro no upload:", error);
    return NextResponse.json(
      { error: "Falha no upload do arquivo." },
      { status: 500 }
    );
  }
}
