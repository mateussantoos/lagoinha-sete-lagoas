"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCirclePlus } from "lucide-react";
import { Phone, Mail, MapPin } from "lucide-react";

// --- DADOS DE CONTATO (fácil de editar) ---
const contatoInfo = {
  whatsappNumber: "5531983311535", // Apenas números
  telefone: "+55 (31) 98331-1535",
  email: "contato@lagoinhasetelagoas.com",
  endereco: "R. Olinto Alvim, 97 - Boa Vista, Sete Lagoas",
};

export const FormularioContato = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // A lógica para montar a mensagem e abrir o WhatsApp está aqui
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullMessage = `Olá, meu nome é ${formData.name}. Contato: ${formData.contact}.\n\nMensagem: ${formData.message}`;
    const whatsappUrl = `https://wa.me/${
      contatoInfo.whatsappNumber
    }?text=${encodeURIComponent(fullMessage)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="py-24 bg-white dark:bg-black">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Coluna do Formulário */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-bebas text-4xl text-neutral-800 dark:text-neutral-100">
            Envie uma mensagem
          </h2>
          <p className="font-lato mt-2 mb-6 text-neutral-600 dark:text-neutral-400">
            Preencha os campos abaixo e clique para enviar diretamente no nosso
            WhatsApp.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Seu Nome"
              required
              className="w-full p-3 bg-stone-50 dark:bg-neutral-900 border-neutral-300 dark:text-neutral-300 dark:border-neutral-700 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              placeholder="Seu E-mail ou Telefone"
              required
              className="w-full p-3 bg-stone-50 dark:bg-neutral-900 border-neutral-300 dark:text-neutral-300 dark:border-neutral-700 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Sua Mensagem..."
              required
              rows={6}
              className="w-full p-3 bg-stone-50 dark:bg-neutral-900 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
            />

            {/* ESTE É O BOTÃO CORRETO PARA O FORMULÁRIO */}
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              <MessageCirclePlus className="h-6 w-6" />
              Enviar Mensagem no WhatsApp
            </button>
          </form>
        </motion.div>

        {/* Coluna de Informações */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="font-bebas text-4xl text-neutral-800 dark:text-neutral-100">
            Informações
          </h2>
          <p className="font-lato mt-2 mb-6 text-neutral-600 dark:text-neutral-400">
            Você também pode nos encontrar aqui:
          </p>
          <div className="space-y-4 font-lato text-neutral-700 dark:text-neutral-300">
            <p className="flex items-center gap-3">
              <Phone size={20} className="text-primary" />{" "}
              {contatoInfo.telefone}
            </p>
            <p className="flex items-center gap-3">
              <Mail size={20} className="text-primary" /> {contatoInfo.email}
            </p>
            <p className="flex items-center gap-3">
              <MapPin size={20} className="text-primary" />{" "}
              {contatoInfo.endereco}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
