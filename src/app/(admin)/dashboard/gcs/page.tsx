"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UserPlus, Edit, Trash2 } from "lucide-react";
import { GcModal } from "@/components/admin/GcModal";

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

export default function GcsPage() {
  const [gcs, setGcs] = useState<GC[]>([]);
  const [allLeaders, setAllLeaders] = useState<Leader[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGc, setEditingGc] = useState<GC | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Busca GCs e Líderes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [gcsRes, leadersRes] = await Promise.all([
          fetch("/api/gcs"),
          fetch("/api/leaders"),
        ]);
        const gcsData = await gcsRes.json();
        const leadersData = await leadersRes.json();
        setGcs(gcsData);
        setAllLeaders(leadersData);
      } catch (error) {
        console.error("Erro ao buscar dados", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const refreshGcs = async () => {
    const gcsRes = await fetch("/api/gcs");
    const gcsData = await gcsRes.json();
    setGcs(gcsData);
  };

  const handleSaveGc = async (gcData: any) => {
    setIsSubmitting(true);
    const method = editingGc ? "PUT" : "POST";
    const url = editingGc ? `/api/gcs/${editingGc.id}` : "/api/gcs";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gcData),
      });
      if (!response.ok) throw new Error("Falha ao salvar GC.");
      await refreshGcs();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erro ao salvar:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (gc: GC) => {
    if (confirm(`Tem certeza que deseja deletar o GC "${gc.name}"?`)) {
      await fetch(`/api/gcs/${gc.id}`, { method: "DELETE" });
      await refreshGcs();
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
            <h1 className="font-bebas text-4xl">Grupos de Crescimento</h1>
            <p className="font-lato mt-1 text-neutral-600 dark:text-neutral-400">
              Adicione, edite ou remova GCs da plataforma.
            </p>
          </div>
          <button
            onClick={() => {
              setEditingGc(null);
              setIsModalOpen(true);
            }}
            className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
          >
            <UserPlus size={18} />
            Novo GC
          </button>
        </div>

        <div className="bg-white dark:bg-neutral-950/50 rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full text-left font-lato">
            <thead className="border-b border-neutral-200 dark:border-neutral-800">
              <tr>
                <th className="p-4 font-semibold">Nome do GC</th>
                <th className="p-4 font-semibold">Endereço</th>
                <th className="p-4 font-semibold">Líderes</th>
                <th className="p-4 font-semibold">Dia</th>
                <th className="p-4 font-semibold">Horário</th>
                <th className="p-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="text-center p-8">
                    Carregando...
                  </td>
                </tr>
              ) : (
                gcs.map((gc) => (
                  <tr
                    key={gc.id}
                    className="border-b last:border-none border-neutral-200 dark:border-neutral-800"
                  >
                    <td className="p-4 font-medium">{gc.name}</td>
                    <td className="p-4">{gc.address}</td>
                    <td className="p-4">
                      {gc.leaders.map((l) => l.name).join(", ")}
                    </td>
                    <td className="p-4">{gc.day}</td>
                    <td className="p-4">{gc.time}</td>
                    <td className="p-4">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => {
                            setEditingGc(gc);
                            setIsModalOpen(true);
                          }}
                        >
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDelete(gc)}>
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

      <GcModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveGc}
        gcToEdit={editingGc}
        allLeaders={allLeaders}
        isLoading={isSubmitting}
      />
    </>
  );
}
