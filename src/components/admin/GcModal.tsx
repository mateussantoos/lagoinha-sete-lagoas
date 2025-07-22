"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, MapPin } from "lucide-react";

type Leader = { id: string; name: string };
type GC = {
  id: string;
  name: string;
  address: string;
  day: string;
  time: string;
  description?: string;
  leaders: Leader[];
};

interface GcModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (gcData: any) => void;
  gcToEdit: GC | null;
  allLeaders: Leader[];
  isLoading: boolean;
}

export const GcModal = ({
  isOpen,
  onClose,
  onSave,
  gcToEdit,
  allLeaders,
  isLoading,
}: GcModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    day: "domingo",
    time: "",
    description: "",
  });
  const [selectedLeaderIds, setSelectedLeaderIds] = useState<string[]>([]);
  const isEditMode = gcToEdit !== null;

  useEffect(() => {
    if (isEditMode && isOpen) {
      setFormData({
        name: gcToEdit.name,
        address: gcToEdit.address,
        day: gcToEdit.day,
        time: gcToEdit.time,
        description: gcToEdit.description || "",
      });
      setSelectedLeaderIds(gcToEdit.leaders.map((l) => l.id));
    } else {
      setFormData({
        name: "",
        address: "",
        day: "domingo",
        time: "",
        description: "",
      });
      setSelectedLeaderIds([]);
    }
  }, [gcToEdit, isOpen, isEditMode]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddLeader = (leaderId: string) => {
    if (leaderId && !selectedLeaderIds.includes(leaderId)) {
      setSelectedLeaderIds([...selectedLeaderIds, leaderId]);
    }
  };

  const handleRemoveLeader = (leaderId: string) => {
    setSelectedLeaderIds(selectedLeaderIds.filter((id) => id !== leaderId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, leaderIds: selectedLeaderIds });
  };

  // Filtra os líderes que já foram selecionados para não aparecerem no dropdown
  const availableLeaders = allLeaders.filter(
    (leader) => !selectedLeaderIds.includes(leader.id)
  );
  const selectedLeaders = allLeaders.filter((leader) =>
    selectedLeaderIds.includes(leader.id)
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl w-full max-w-lg"
          >
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
              <h3 className="font-bebas text-2xl">
                {isEditMode ? "Editar GC" : "Novo GC"}
              </h3>
              <button onClick={onClose}>
                <X size={20} />
              </button>
            </div>
            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-4 max-h-[70vh] overflow-y-auto"
            >
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nome do GC"
                required
                className="w-full p-2 bg-stone-50 dark:bg-neutral-800 border rounded-lg"
              />
              <input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Endereço"
                required
                className="w-full p-2 bg-stone-50 dark:bg-neutral-800 border rounded-lg"
              />
              <div className="flex gap-4">
                <select
                  name="day"
                  value={formData.day}
                  onChange={handleInputChange}
                  className="w-1/2 p-2 bg-stone-50 dark:bg-neutral-800 border rounded-lg"
                >
                  <option value="domingo">Domingo</option>
                  <option value="segunda">Segunda-feira</option>
                  <option value="terça">Terça-feira</option>
                  <option value="quarta">Quarta-feira</option>
                  <option value="quinta">Quinta-feira</option>
                  <option value="sexta">Sexta-feira</option>
                  <option value="sábado">Sábado</option>
                </select>
                <input
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="w-1/2 p-2 bg-stone-50 dark:bg-neutral-800 border rounded-lg"
                />
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Descrição (opcional)"
                className="w-full p-2 bg-stone-50 dark:bg-neutral-800 border rounded-lg min-h-[100px]"
              />

              {/* --- NOVO SELETOR DE LÍDERES --- */}
              <div>
                <label className="font-bold block mb-2">Líderes</label>
                {/* Lista de líderes já selecionados */}
                <div className="flex flex-wrap gap-2 mb-2 min-h-[40px]">
                  {selectedLeaders.map((leader) => (
                    <motion.div
                      key={leader.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2 bg-primary/20 text-primary-dark font-semibold text-sm px-3 py-1 rounded-full"
                    >
                      <span>{leader.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveLeader(leader.id)}
                        className="hover:text-red-500"
                      >
                        <X size={14} />
                      </button>
                    </motion.div>
                  ))}
                </div>
                {/* Dropdown para adicionar novos líderes */}
                <select
                  onChange={(e) => handleAddLeader(e.target.value)}
                  value=""
                  className="w-full p-2 bg-stone-50 dark:bg-neutral-800 border rounded-lg"
                >
                  <option value="" disabled>
                    {availableLeaders.length > 0
                      ? "Selecione um líder para adicionar..."
                      : "Nenhum outro líder disponível"}
                  </option>
                  {availableLeaders.map((leader) => (
                    <option key={leader.id} value={leader.id}>
                      {leader.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2 px-4 bg-neutral-200 dark:bg-neutral-700 font-bold rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="py-2 px-4 bg-primary text-white font-bold rounded-lg disabled:bg-primary/50"
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
