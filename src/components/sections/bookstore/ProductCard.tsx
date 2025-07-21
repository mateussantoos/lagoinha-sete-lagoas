import Image from "next/image";

// Tipagem para os dados do produto que o card recebe
type Product = {
  id: string;
  name: string;
  price: number;
  imageSrc?: string | null;
  isOnSale?: boolean;
  discountPercentage?: number | null;
};

export const ProductCard = ({
  product,
  onClick,
}: {
  product: Product;
  onClick: () => void;
}) => {
  const finalPrice =
    product.isOnSale && product.discountPercentage
      ? Number(product.price) * (1 - product.discountPercentage / 100)
      : Number(product.price);

  return (
    <button onClick={onClick} className="group block text-left w-full">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image
          src={product.imageSrc || "/images/placeholder.png"}
          alt={product.name}
          fill
          className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        {product.isOnSale && (
          <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            PROMO
          </div>
        )}
      </div>
      <div className="mt-4">
        {/* Título com tamanho responsivo e altura de linha mais justa */}
        <h3 className="font-bebas text-xl lg:text-2xl leading-tight text-neutral-800 dark:text-neutral-100 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Preços com tamanhos responsivos */}
        <div className="flex items-baseline gap-2 mt-1 font-lato">
          <p className="text-base sm:text-lg font-bold text-primary">
            R$ {finalPrice.toFixed(2).replace(".", ",")}
          </p>
          {product.isOnSale && (
            <p className="text-xs sm:text-sm text-neutral-500 line-through">
              R$ {Number(product.price).toFixed(2).replace(".", ",")}
            </p>
          )}
        </div>
      </div>
    </button>
  );
};
