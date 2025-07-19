"use client";

import { Star } from "lucide-react";
import { useRef, useEffect, useState } from "react";

// --- DADOS DOS LETREIROS ---
const marqueePhrasesTop = [
  "Venha nos conhecer",
  "Um lugar para pertencer",
  "Cultos de celebração aos domingos",
];

const marqueePhrasesBottom = [
  "Grupos de crescimento",
  "Ações sociais",
  "Ministério de jovens e crianças",
];

// --- Sub-componente para cada Faixa do Letreiro ---
interface MarqueeStripProps {
  phrases: string[];
  duration?: number;
  direction?: "left" | "right";
  className?: string;
}

const MarqueeStrip = ({
  phrases,
  duration = 50,
  direction = "left",
  className = "",
}: MarqueeStripProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [repeatCount, setRepeatCount] = useState(4); // valor inicial razoável

  // Calcula quantas repetições são necessárias para preencher a largura do container
  useEffect(() => {
    function calcularRepeticoes() {
      const container = containerRef.current;
      if (!container) return;

      // Cria um elemento temporário para medir o conteúdo
      const temp = document.createElement("div");
      temp.style.visibility = "hidden";
      temp.style.position = "absolute";
      temp.style.whiteSpace = "nowrap";
      temp.style.display = "flex";
      temp.className =
        "font-bebas text-2xl sm:text-3xl tracking-wider uppercase";
      temp.innerHTML = phrases
        .map(
          (phrase) =>
            `<span class="mx-8">${phrase}</span><span style="display:inline-block;vertical-align:middle;">★</span>`
        )
        .join("");
      document.body.appendChild(temp);

      const contentWidth = temp.offsetWidth;
      const containerWidth = container.offsetWidth || window.innerWidth;
      let count = Math.ceil((containerWidth * 2) / contentWidth); // *2 para garantir looping suave
      count = Math.max(count, 2); // pelo menos 2 repetições
      setRepeatCount(count);

      document.body.removeChild(temp);
    }

    calcularRepeticoes();
    window.addEventListener("resize", calcularRepeticoes);
    return () => window.removeEventListener("resize", calcularRepeticoes);
    // eslint-disable-next-line
  }, [phrases.join(" ")]);

  // Função para renderizar as frases repetidas
  const renderFrases = (ariaHidden = false) => {
    const arr = [];
    for (let i = 0; i < repeatCount; i++) {
      arr.push(
        <div className="flex" key={i} aria-hidden={ariaHidden}>
          {phrases.map((phrase, index) => (
            <div key={index} className="flex items-center">
              <span className="mx-8 font-bebas text-2xl sm:text-3xl tracking-wider uppercase">
                {phrase}
              </span>
              <Star className="h-5 w-5 sm:h-6 sm:w-6 fill-current" />
            </div>
          ))}
        </div>
      );
    }
    return arr;
  };

  return (
    <div
      ref={containerRef}
      className={`flex items-center overflow-hidden ${className}`}
    >
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee ${duration}s linear infinite ${
            direction === "right" ? "reverse" : ""
          }`,
        }}
      >
        {renderFrases(false)}
      </div>
    </div>
  );
};

// --- Componente Principal ---
export const Marquee = () => {
  return (
    <section className="py-12 bg-white dark:bg-black overflow-x-hidden">
      <div className="flex flex-col gap-4 -rotate-2">
        <MarqueeStrip
          phrases={marqueePhrasesTop}
          duration={50}
          direction="left"
          className="bg-primary text-black py-3"
        />
        <MarqueeStrip
          phrases={marqueePhrasesBottom}
          duration={55}
          direction="left"
          className="bg-neutral-800 dark:bg-neutral-900 text-white py-3"
        />
      </div>
    </section>
  );
};
