import { NextResponse } from "next/server";
import { db } from "@/services/firebase";
import {
  collection,
  getDocs,
  doc,
  addDoc,
  query,
  orderBy,
  where,
  documentId,
  writeBatch,
} from "firebase/firestore";

// Função para LISTAR todas as encomendas
export async function GET() {
  try {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const encomendasSnapshot = await getDocs(q);

    // Para enriquecer os dados, vamos buscar os produtos de cada encomenda
    // Esta parte pode ser otimizada no futuro se necessário
    const encomendas = await Promise.all(
      encomendasSnapshot.docs.map(async (doc) => {
        const encomendaData = doc.data();
        // A lógica para incluir detalhes do produto já está no item da encomenda
        return {
          id: doc.id,
          ...encomendaData,
        };
      })
    );

    return NextResponse.json(encomendas);
  } catch (error) {
    console.error("Erro ao buscar encomendas:", error);
    return NextResponse.json(
      { error: "Erro ao buscar encomendas" },
      { status: 500 }
    );
  }
}

// Função para CRIAR uma nova encomenda
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerPhone, customerEmail, items } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "A encomenda precisa ter pelo menos um item." },
        { status: 400 }
      );
    }

    const batch = writeBatch(db);
    const newEncomendaRef = doc(collection(db, "orders"));

    const productIds = items.map(
      (item: { produtoId: string }) => item.produtoId
    );

    if (productIds.length > 0) {
      const productsQuery = query(
        collection(db, "products"),
        where(documentId(), "in", productIds)
      );
      const productsSnapshot = await getDocs(productsQuery);

      const productsData: { [key: string]: any } = {};
      productsSnapshot.forEach((doc) => {
        productsData[doc.id] = doc.data();
      });

      const itemsWithSnapshot = items.map(
        (item: { produtoId: string; quantity: number }) => {
          const product = productsData[item.produtoId];
          if (!product) {
            throw new Error(`Produto com ID ${item.produtoId} não encontrado.`);
          }
          return {
            produtoId: item.produtoId,
            quantity: item.quantity,
            productName: product.name,
            productPrice: product.price,
          };
        }
      );

      batch.set(newEncomendaRef, {
        customerName,
        customerPhone,
        customerEmail: customerEmail || null,
        items: itemsWithSnapshot,
        status: "PENDENTE",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      await batch.commit();
    }

    return NextResponse.json(
      { id: newEncomendaRef.id, ...body },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar encomenda:", error);
    return NextResponse.json(
      { error: "Erro ao criar encomenda" },
      { status: 500 }
    );
  }
}
