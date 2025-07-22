"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ImageLogin from "@/assets/webp/img02.webp";

// Variantes para a animação dos itens do formulário
const formItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Falha no login.");

      // Se o login for bem-sucedido, redireciona para o painel de controle
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      {/* --- COLUNA ESQUERDA: FORMULÁRIO --- */}
      <div className="flex items-center justify-center p-8 bg-stone-100 dark:bg-neutral-900">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="w-full max-w-sm"
        >
          <div className="text-center lg:text-left mb-10">
            <h2 className="font-bebas text-4xl text-neutral-800 dark:text-neutral-100">
              Acessar Painel
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 font-lato">
              Bem-vindo(a) de volta.
            </p>
          </div>

          <motion.form
            className="space-y-6"
            onSubmit={handleSubmit}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={formItemVariants} className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                required
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:text-neutral-100"
              />
            </motion.div>

            <motion.div variants={formItemVariants} className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                required
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:text-neutral-100"
              />
            </motion.div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <motion.button
              variants={formItemVariants}
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors duration-300 disabled:bg-primary/50"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>

      {/* --- COLUNA DIREITA: IMAGEM (visível apenas em telas grandes) --- */}
      <div className="hidden lg:block relative">
        <Image
          src={ImageLogin}
          alt="Comunidade da Lagoinha Sete Lagoas"
          fill
          className="object-cover"
          placeholder="blur"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <motion.div
          className="absolute inset-0 flex items-end p-12 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div>
            <h3 className="font-crimson-text italic text-4xl leading-snug">
              “Um lugar para pertencer, uma família para amar.”
            </h3>
            <p className="font-lato mt-4 text-lg opacity-80">
              Lagoinha Sete Lagoas
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
