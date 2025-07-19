"use client";

import { motion } from "framer-motion";
import { Instagram, Facebook, Youtube, ArrowRight } from "lucide-react";
import Link from "next/link";

// --- DADOS DO RODAPÉ ---
// Edite aqui para alterar os títulos e links das colunas
const footerLinkColumns = [
  {
    title: "Nossa Casa",
    links: [
      { label: "Nossa História", href: "/historia" },
      { label: "Nossas Crenças", href: "/crencas" },
      { label: "Liderança", href: "/lideranca" },
      { label: "Seja Membro", href: "/seja-membro" },
    ],
  },
  {
    title: "Ações",
    links: [
      { label: "Grupos de Crescimento", href: "/mapa-gcs" },
      { label: "Ministério Infantil", href: "/infantil" },
      { label: "Ação Social", href: "/acao-social" },
      { label: "Curso para Casais", href: "/casais" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Últimas Mensagens", href: "#" },
      { label: "Club Cast", href: "#" },
      { label: "Contribua", href: "/contribua" },
      { label: "Contato", href: "/contato" },
    ],
  },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/lagoinha.setelagoas/",
    icon: Instagram,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/lagoinha.setelagoas/",
    icon: Facebook,
  },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-stone-100 dark:bg-neutral-900 pt-16 sm:pt-24 pb-55 overflow-hidden">
      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- SEÇÃO SUPERIOR: NEWSLETTER E LINKS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Coluna 1: Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-bebas text-lg uppercase tracking-wider text-neutral-800 dark:text-neutral-100">
              Fique por dentro
            </h3>
            <p className="font-lato mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Assine e receba as novidades da nossa igreja direto no seu e-mail.
            </p>
            <form className="mt-4 flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="w-full px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-md focus:ring-2 focus:ring-primary focus:outline-none font-lato"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
              >
                Enviar
              </button>
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
        className="absolute -bottom-35 left-0 w-full h-full flex items-end justify-start select-none pointer-events-none z-0"
      >
        <h2
          className="font-bebas font-bold text-stone-200 dark:text-neutral-800/50 whitespace-nowrap"
          style={{ fontSize: "clamp(2rem, 14vw, 20rem)" }}
        >
          Lagoinha Sete Lagoas
        </h2>
      </div>
    </footer>
  );
};
