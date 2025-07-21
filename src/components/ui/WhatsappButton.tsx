"use client";

import { MessageCirclePlus } from "lucide-react";

const WHATSAPP_NUMBER = "5531998674933";

type Product = {
  name: string;
  sku: string;
  price: number;
};

export const WhatsappButton = ({ product }: { product: Product }) => {
  const formattedPrice = `R$ ${Number(product.price)
    .toFixed(2)
    .replace(".", ",")}`;

  const message = encodeURIComponent(
    `Olá! Tenho interesse em encomendar o seguinte produto:\n\n` +
      `*Produto:* ${product.name}\n` +
      `*Código:* ${product.sku}\n` +
      `*Preço:* ${formattedPrice}\n\n` +
      `Aguardo o contato para combinar a retirada. Obrigado!`
  );

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-3 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
    >
      <MessageCirclePlus className="h-6 w-6" />
      Encomendar pelo WhatsApp
    </a>
  );
};
