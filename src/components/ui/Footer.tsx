"use client";

import { Instagram, Facebook, Youtube } from "lucide-react";
import Link from "next/link";
import { Button } from "../common/Button";

// --- DADOS DO RODAPÉ ---
const footerLinkColumns = [
  {
    title: "Nossa Casa",
    links: [
      { label: "Nossa História", href: "/sobre" },
      { label: "Nossas Crenças", href: "/sobre" },
      { label: "Liderança", href: "/sobre" },
    ],
  },
  {
    title: "Participe",
    links: [
      { label: "Grupos de Crescimento", href: "/gcs" },
      { label: "Ministérios", href: "/ministerios" },
      { label: "Eventos", href: "/eventos" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Últimas Mensagens", href: "/#youtube" },
      { label: "Bookstore", href: "/bookstore" },
      { label: "Generosidade", href: "/generosidade" },
    ],
  },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/lagoinhasetelagoas/",
    icon: Instagram,
  },
  {
    name: "Facebook",
    href: "https://www.instagram.com/lagoinhasetelagoas/",
    icon: Facebook,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@lagoinhasetelagoas7913",
    icon: Youtube,
  },
];

const handleWhatsappClick = () => {
  window.open("https://wa.me/5531998674933", "_blank");
};
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-stone-100 dark:bg-neutral-900 pt-16 sm:pt-24 pb-10 md:pb-55 overflow-hidden">
      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- SEÇÃO SUPERIOR: NEWSLETTER E LINKS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Coluna 1: Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-bebas text-lg uppercase tracking-wider text-neutral-800 dark:text-neutral-100">
              Fique por dentro
            </h3>
            <p className="font-lato mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Entre no nosso grupo particular no WhatsApp e receba todas as
              noticias mais recentes em primeira mão.
            </p>
            <form className="mt-4 flex flex-col sm:flex-row gap-2">
              <Button
                text="Entrar no Grupo WhatsApp"
                onClick={handleWhatsappClick}
              />
            </form>
          </div>

          {/* Colunas 2, 3, 4: Links */}
          {footerLinkColumns.map((column) => (
            <div key={column.title}>
              <h3 className="font-bebas text-lg uppercase tracking-wider text-neutral-800 dark:text-neutral-100">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-lato text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* --- SEÇÃO INFERIOR: COPYRIGHT E REDES SOCIAIS --- */}
        <div className="mt-16 pt-8 border-t border-neutral-300 dark:border-neutral-700 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-xs text-neutral-500 dark:text-neutral-400 font-lato text-center sm:text-left">
            <p>
              &copy; {currentYear} Lagoinha Sete Lagoas. Todos os direitos
              reservados.
            </p>
            <p>
              Desenvolvido por{" "}
              <a href="https://www.instagram.com/mateussantoos._?igsh=ZnV3aHFleGNpaGQ4">
                @mateussantoos._
              </a>
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Siga-nos no ${social.name}`}
                className="text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* --- TEXTO GIGANTE DE FUNDO --- */}
      <div
        aria-hidden="true"
        className="absolute  -bottom-35 left-0 w-full h-full flex items-end justify-center select-none pointer-events-none z-0"
      >
        <h2
          className="absolute font-bebas font-bold text-stone-200 dark:text-neutral-800/50 whitespace-nowrap "
          style={{ fontSize: "clamp(2rem, 14vw, 20rem)" }}
        >
          Lagoinha Sete Lagoas
        </h2>
      </div>
    </footer>
  );
};
