"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { WhatsappButton } from "@/components/ui/WhatsappButton";

export const ProductDetailModal = ({
  product,
  onClose,
}: {
  product: any;
  onClose: () => void;
}) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col lg:flex-row"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Coluna da Imagem */}
          <div className="w-full lg:w-1/2 relative aspect-square">
            <Image
              src={product.imageSrc || "/images/placeholder.png"}
              alt={product.name}
              fill
              className="object-cover rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none"
            />
          </div>

          {/* Coluna de Detalhes */}
          <div className="w-full lg:w-1/2 p-8 flex flex-col overflow-y-auto relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-neutral-500 hover:text-primary transition-colors z-10 cursor-pointer"
            >
              <X size={24} />
            </button>

            <div className="flex-grow">
              <div className="flex flex-wrap gap-2 mb-2">
                {product.categories.map((cat: any) => (
                  <span
                    key={cat.id}
                    className="text-xs font-bold uppercase text-primary bg-primary/10 px-2 py-1 rounded"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>

              <h2 className="font-bebas text-4xl lg:text-5xl text-neutral-800 dark:text-neutral-100">
                {product.name}
              </h2>
              <p className="font-lato text-2xl font-bold text-primary mt-2">
                R$ {Number(product.price).toFixed(2).replace(".", ",")}
              </p>
              <p className="font-lato text-sm text-neutral-500 dark:text-neutral-400 mt-4 leading-relaxed">
                {product.description}
              </p>
              <div className="flex gap-4 mt-4 text-xs font-mono text-neutral-400">
                <span>SKU: {product.sku}</span>
                <span>ESTOQUE: {product.stock}</span>
              </div>
            </div>

            <div className="mt-8 flex-shrink-0">
              <WhatsappButton product={product} />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
