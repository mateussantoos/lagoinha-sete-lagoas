"use client";
import { useState, useEffect } from "react";
import { Menu, X, Instagram, Facebook, Youtube } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip } from "@mui/material";
import Image from "next/image";

import logoBranca from "@/assets/svg/lagoinha-logoBranca.svg";
import logoPreta from "@/assets/svg/lagoinha-logo.svg";
import { ThemeToggle } from "./ThemeToggle";

const sections = [
  { title: "A Igreja", href: "/sobre" },
  { title: "Eventos", href: "/eventos" },
  { title: "GCs", href: "/gcs" },
  { title: "Ministérios", href: "/ministérios" },
  { title: "Generosidade", href: "/generosidade" },
  { title: "Bookstore", href: "/bookstore" },
  { title: "Carisma", href: "/carisma" },
  { title: "Contato", href: "/contato" },
];

const phrases = [
  "Seja bem-vindo à Lagoinha Sete Lagoas!",
  "Junte-se aos nossos GCs!",
  "Confira nossos eventos da semana.",
  "Começa agora a melhor fase da sua vida!",
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const html = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDark(html.classList.contains("dark"));
    });
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
    setIsDark(html.classList.contains("dark"));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 left-0 w-full z-50  pt-4 md:pt-0">
      {/* ===== BARRA SUPERIOR (some ao rolar) ===== */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isScrolled
            ? "-translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <div className="hidden sm:flex max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-neutral-200/50 dark:border-neutral-800/50 justify-between items-center py-2">
          <div className="text-sm text-neutral-700 dark:text-neutral-300 font-light h-6 overflow-hidden font-lato">
            <AnimatePresence mode="wait">
              <motion.div
                key={phrases[currentPhraseIndex]}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4 }}
              >
                {phrases[currentPhraseIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex space-x-2 text-neutral-600 dark:text-neutral-400">
            <Tooltip title="Instagram">
              <a
                href="https://www.instagram.com/lagoinhasetelagoas/"
                className="hover:text-primary transition-colors"
              >
                <Instagram size={20} />
              </a>
            </Tooltip>
            <Tooltip title="Facebook">
              <a
                href="https://www.facebook.com/lagoinhasetelagoas/"
                className="hover:text-primary transition-colors"
              >
                <Facebook size={20} />
              </a>
            </Tooltip>
            <Tooltip title="Youtube">
              <a href="#" className="hover:text-primary transition-colors">
                <Youtube size={24} />
              </a>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* ===== CONTAINER DA NAVBAR PRINCIPAL ===== */}
      <div className={`relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8`}>
        <nav
          className={`flex items-center justify-between transition-all duration-300 ease-in-out
            ${
              isScrolled
                ? "mt-4 bg-white/80 dark:bg-black/80 dark:border-1 dark:border-white/10 backdrop-blur-lg shadow-lg rounded-full py-2 px-6"
                : "bg-transparent py-4"
            }`}
        >
          {/* Logo */}
          <a href="/" aria-label="Página inicial">
            <Image
              src={isDark ? logoBranca : logoPreta}
              alt="Logo Lagoinha Sete Lagoas"
              className="h-8 w-auto transition-all"
              priority
            />
          </a>

          {/* Links Desktop */}
          <div className="hidden lg:flex items-center space-x-8">
            <ul className="flex space-x-6 font-bebas text-sm tracking-widest uppercase text-neutral-800 dark:text-neutral-100">
              {sections.map((sec) => (
                <li key={sec.title}>
                  <a
                    href={sec.href}
                    className="hover:text-primary whitespace-nowrap transition-colors"
                  >
                    {sec.title}
                  </a>
                </li>
              ))}
            </ul>
            <ThemeToggle />
          </div>

          {/* Botão Menu Mobile */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-800 dark:text-neutral-100"
              aria-label="Abrir menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>

        {/* ===== MENU MOBILE ===== */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute left-0 right-0 mt-2 mx-4 sm:mx-6 lg:mx-8 bg-white/95 dark:bg-black/95 backdrop-blur-lg shadow-lg rounded-3xl lg:hidden"
            >
              <ul className="flex flex-col space-y-4 p-6 font-bebas text-lg tracking-widest text-neutral-800 dark:text-neutral-100">
                {sections.map((sec) => (
                  <li key={sec.title}>
                    <a
                      href={sec.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="hover:text-primary transition-colors"
                    >
                      {sec.title}
                    </a>
                  </li>
                ))}
                <li className="pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80">
                  <div className="flex items-center justify-between">
                    <span>Mudar Tema</span>
                    <ThemeToggle />
                  </div>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
