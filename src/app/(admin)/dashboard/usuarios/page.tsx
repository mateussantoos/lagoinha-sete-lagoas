"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UserPlus, Edit, Trash2 } from "lucide-react";
import { UserModal } from "@/components/admin/UserModal"; // Importamos o nosso modal

type User = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "MEMBER";
  createdAt: string;
};

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchUsers = async () => {
    const response = await fetch("/api/users");
    const data = await response.json();
    setUsers(data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  // Funções para controlar o modal
  const handleOpenCreateModal = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveUser = async (userData: any) => {
    setIsSubmitting(true);
    const method = editingUser ? "PUT" : "POST";
    const url = editingUser ? `/api/users/${editingUser.id}` : "/api/users";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error("Falha ao salvar usuário.");

      await fetchUsers(); // Atualiza a lista
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao salvar:", error);
      // Aqui você pode adicionar um estado de erro para o modal
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (user: User) => {
    if (
      confirm(
        `Tem certeza que deseja deletar ${user.name}? Esta ação não pode ser desfeita.`
      )
    ) {
      try {
        const response = await fetch(`/api/users/${user.id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Falha ao deletar usuário.");
        await fetchUsers();
      } catch (error) {
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
            <h1 className="font-bebas text-4xl">Gerenciamento de Usuários</h1>
            <p className="font-lato mt-1 text-neutral-600 dark:text-neutral-400">
              Adicione, edite ou remova usuários da plataforma.
            </p>
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2"
          >
            <UserPlus size={18} />
            Novo Usuário
          </button>
        </div>

        {/* Tabela de Usuários com design refinado */}
        <div className="bg-white dark:bg-neutral-950/50 rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full text-left font-lato">
            <thead className="border-b border-neutral-200 dark:border-neutral-800">
              <tr>
                <th className="p-4 font-semibold">Nome</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Função</th>
                <th className="p-4 font-semibold">Criado em</th>
                <th className="p-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center p-8 text-neutral-500">
                    Carregando...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-8 text-neutral-500">
                    Nenhum usuário encontrado.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b last:border-none border-neutral-200 dark:border-neutral-800"
                  >
                    <td className="p-4 font-medium">{user.name}</td>
                    <td className="p-4 text-neutral-600 dark:text-neutral-400">
                      {user.email}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 text-xs font-bold rounded-full ${
                          user.role === "ADMIN"
                            ? "bg-primary/20 text-primary-dark"
                            : "bg-neutral-200 dark:bg-neutral-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-neutral-600 dark:text-neutral-400">
                      {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleOpenEditModal(user)}
                          className="p-2 text-neutral-500 hover:text-primary transition-colors"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
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

      {/* O Modal é renderizado aqui */}
      <UserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
        userToEdit={editingUser}
        isLoading={isSubmitting}
      />
    </>
  );
}
