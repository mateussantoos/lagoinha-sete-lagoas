import { NextResponse } from "next/server";
import { db } from "@/services/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

// Função para buscar as métricas da Bookstore
export async function GET() {
  try {
    // 1. Contar total de produtos
    const productsQuery = query(collection(db, "products"));
    const productsSnapshot = await getDocs(productsQuery);
    const productCount = productsSnapshot.size;

    // 2. Contar encomendas pendentes
    const pendingOrdersQuery = query(
      collection(db, "orders"),
      where("status", "==", "PENDENTE")
    );
    const pendingOrdersSnapshot = await getDocs(pendingOrdersQuery);
    const pendingOrdersCount = pendingOrdersSnapshot.size;

    // 3. Contar produtos com baixo estoque (< 5)
    const lowStockQuery = query(
      collection(db, "products"),
      where("stock", "<", 5)
    );
    const lowStockSnapshot = await getDocs(lowStockQuery);
    const lowStockCount = lowStockSnapshot.size;

    // 4. Contar total de categorias
    const categoriesQuery = query(collection(db, "productCategories"));
    const categoriesSnapshot = await getDocs(categoriesQuery);
    const categoryCount = categoriesSnapshot.size;

    // Retorna todas as métricas em um único objeto JSON
    return NextResponse.json({
      productCount,
      pendingOrdersCount,
      lowStockCount,
      categoryCount,
    });
  } catch (error) {
    console.error("Erro ao buscar métricas da bookstore:", error);
    return NextResponse.json(
      { error: "Erro ao buscar métricas" },
      { status: 500 }
    );
  }
}
