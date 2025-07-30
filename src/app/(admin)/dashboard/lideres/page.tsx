"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UserPlus, Edit, Trash2 } from "lucide-react";
import { LeaderModal } from "@/components/admin/LeaderModal";

// Tipagem para os dados brutos que vêm da API
type ApiLeader = {
  id: string;
  name: string;
  phone: string;
  createdAt: {
    // O Timestamp chega assim
    seconds: number;
    nanoseconds: number;
  };
};

// Tipagem que o componente usa, com a data já convertida
type Leader = {
  id: string;
  name: string;
  phone: string;
  createdAt: string; // A data será uma string no formato ISO
};

export default function LideresPage() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLeader, setEditingLeader] = useState<Leader | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // A MUDANÇA ESTÁ AQUI
  const fetchLeaders = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/leaders");
      const apiData: ApiLeader[] = await response.json();

      // Converte o campo 'createdAt' de cada líder para uma string ISO
      const formattedLeaders: Leader[] = apiData.map((leader) => ({
        ...leader,
        createdAt: new Date(leader.createdAt.seconds * 1000).toISOString(),
      }));

      setLeaders(formattedLeaders);
    } catch (error) {
      console.error("Erro ao buscar líderes", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaders();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingLeader(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (leader: Leader) => {
    setEditingLeader(leader);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveLeader = async (leaderData: {
    name: string;
    phone: string;
  }) => {
    setIsSubmitting(true);
    const method = editingLeader ? "PUT" : "POST";
    const url = editingLeader
      ? `/api/leaders/${editingLeader.id}`
      : "/api/leaders";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leaderData),
      });
      if (!response.ok) throw new Error("Falha ao salvar líder.");

      await fetchLeaders();
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Falha ao salvar líder.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (leader: Leader) => {
    if (confirm(`Tem certeza que deseja deletar ${leader.name}?`)) {
      try {
        const response = await fetch(`/api/leaders/${leader.id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Falha ao deletar líder.");
        }
        await fetchLeaders();
      } catch (error: any) {
        alert(error.message);
        console.error("Erro ao deletar:", error);
      }
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-bebas text-4xl">Líderes de GC</h1>
            <p className="font-lato mt-1 text-neutral-600 dark:text-neutral-400">
              Adicione, edite ou remova líderes de Grupos de Crescimento.
            </p>
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
          >
            <UserPlus size={18} />
            Novo Líder
          </button>
        </div>

        <div className="bg-white dark:bg-neutral-950/50 rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full text-left font-lato">
            <thead className="border-b border-neutral-200 dark:border-neutral-800">
              <tr>
                <th className="p-4 font-semibold">Nome</th>
                <th className="p-4 font-semibold">Telefone</th>
                <th className="p-4 font-semibold">Criado em</th>
                <th className="p-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="text-center p-8 text-neutral-500">
                    Carregando...
                  </td>
                </tr>
              ) : leaders.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center p-8 text-neutral-500">
                    Nenhum líder encontrado.
                  </td>
                </tr>
              ) : (
                leaders.map((leader) => (
                  <tr
                    key={leader.id}
                    className="border-b last:border-none border-neutral-200 dark:border-neutral-800"
                  >
                    <td className="p-4 font-medium">{leader.name}</td>
                    <td className="p-4 text-neutral-600 dark:text-neutral-400">
                      {leader.phone}
                    </td>
                    {/* Agora esta linha funciona sem erros */}
                    <td className="p-4 text-neutral-600 dark:text-neutral-400">
                      {new Date(leader.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleOpenEditModal(leader)}
                          className="p-2 text-neutral-500 hover:text-primary transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(leader)}
                          className="p-2 text-neutral-500 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      <LeaderModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveLeader}
        leaderToEdit={editingLeader}
        isLoading={isSubmitting}
      />
    </>
  );
}
