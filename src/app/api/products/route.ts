import { NextResponse } from "next/server";
import { db } from "@/services/firebase";
import {
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";

// Função para LISTAR todos os produtos
export async function GET() {
  try {
    const productsQuery = query(
      collection(db, "products"),
      orderBy("createdAt", "desc")
    );
    const categoriesSnapshot = await getDocs(
      collection(db, "productCategories")
    );

    const productsSnapshot = await getDocs(productsQuery);

    const categoriesMap = new Map(
      categoriesSnapshot.docs.map((doc) => [doc.id, doc.data()])
    );

    const products = productsSnapshot.docs.map((doc) => {
      const productData = doc.data();
      const categories = (productData.categoryIds || []).map((id: string) => ({
        id,
        name: categoriesMap.get(id)?.name || "Categoria desconhecida",
      }));
      return {
        id: doc.id,
        ...productData,
        categories,
      };
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 }
    );
  }
}

// Função para CRIAR um novo produto
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      sku,
      description,
      price,
      stock,
      isOnSale,
      discountPercentage,
      imageSrc,
      categoryIds,
    } = body;

    const docRef = await addDoc(collection(db, "products"), {
      name,
      sku,
      description,
      price,
      stock,
      isOnSale,
      discountPercentage,
      imageSrc,
      isPublished: true, // Valor padrão
      categoryIds: categoryIds || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ id: docRef.id, ...body }, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return NextResponse.json(
      { error: "Erro ao criar produto" },
      { status: 500 }
    );
  }
}
