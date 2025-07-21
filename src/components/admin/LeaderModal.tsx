"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Phone } from "lucide-react";

type Leader = {
  id: string;
  name: string;
  phone: string;
};

interface LeaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (leaderData: { name: string; phone: string }) => void;
  leaderToEdit: Leader | null;
  isLoading: boolean;
}

export const LeaderModal = ({
  isOpen,
  onClose,
  onSave,
  leaderToEdit,
  isLoading,
}: LeaderModalProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const isEditMode = leaderToEdit !== null;

  useEffect(() => {
    if (isEditMode && isOpen) {
      setName(leaderToEdit.name);
      setPhone(leaderToEdit.phone);
    } else {
      setName("");
      setPhone("");
    }
  }, [leaderToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, phone });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
              <h3 className="font-bebas text-2xl text-neutral-800 dark:text-neutral-100">
                {isEditMode ? "Editar Líder" : "Novo Líder de GC"}
              </h3>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <X className="h-5 w-5 text-neutral-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome do Líder"
                  required
                  className="w-full pl-10 pr-4 py-2 bg-stone-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Telefone (com DDD)"
                  required
                  className="w-full pl-10 pr-4 py-2 bg-stone-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2 px-4 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 font-bold rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="py-2 px-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors disabled:bg-primary/50"
                >
                  {isLoading ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
