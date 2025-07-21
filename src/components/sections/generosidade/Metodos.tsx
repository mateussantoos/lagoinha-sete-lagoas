"use client";
import { PixCopyButton } from "@/components/ui/PixCopyButton";

const infoBancaria = {
  banco: "Itaú",
  agencia: "3137",
  conta: "99376-6",
  pix: "51.097.602/0001-40",
  tipoPix: "CNPJ",
};

export const Metodos = () => {
  return (
    <section className="py-24 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-bebas text-4xl sm:text-5xl text-neutral-800 dark:text-neutral-100">
            Formas de Contribuir
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card do PIX */}
          <div className="bg-stone-100 dark:bg-neutral-900 p-8 rounded-lg text-center shadow-sm">
            <h3 className="font-bebas text-3xl text-neutral-800 dark:text-neutral-100">
              PIX
            </h3>
            <p className="font-lato text-neutral-500 dark:text-neutral-400 mt-2">
              A forma mais rápida e prática de contribuir.
            </p>
            <div className="mt-6 bg-white dark:bg-neutral-800 p-4 rounded-lg">
              <p className="font-lato text-sm text-neutral-500 dark:text-neutral-400">
                Chave ({infoBancaria.tipoPix})
              </p>
              <p className="font-bold text-lg text-neutral-800 dark:text-neutral-100 break-words">
                {infoBancaria.pix}
              </p>
            </div>
            <PixCopyButton pixKey={infoBancaria.pix} />
          </div>

          {/* Card de Transferência Bancária */}
          <div className="bg-stone-100 dark:bg-neutral-900 p-8 rounded-lg text-center shadow-sm">
            <h3 className="font-bebas text-3xl text-neutral-800 dark:text-neutral-100">
              Conta Bancária
            </h3>
            <p className="font-lato text-neutral-500 dark:text-neutral-400 mt-2">
              Depósito ou transferência (TED/DOC).
            </p>
            <div className="mt-6 bg-white dark:bg-neutral-800 dark:text-neutral-300 p-4 rounded-lg text-left space-y-2">
              <p>
                <span className="font-bold ">Banco:</span> {infoBancaria.banco}
              </p>
              <p>
                <span className="font-bold ">Agência:</span>{" "}
                {infoBancaria.agencia}
              </p>
              <p>
                <span className="font-bold">Conta Corrente:</span>{" "}
                {infoBancaria.conta}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
