"use client";

import { useState, useMemo, useCallback, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MotoristaTable } from "./MotoristaTable";
import { MotoristaFormDialog } from "./MotoristaFormDialog";
import {
  useGetAllMotoristas,
  useInsertMotorista,
  useDeleteMotorista,
} from "../../../hooks/motoristas/useMotoristas";
import {
  Motorista,
  CreateMotoristaInput,
} from "../../../hooks/motoristas/types/types";

const ITEMS_PER_PAGE = 10;

export default function MotoristaPage() {
  const [isPending, startTransition] = useTransition();
  const { motoristas, loading, error, refetch } = useGetAllMotoristas();
  const {
    insertMotorista,
    loading: inserting,
    error: insertError,
  } = useInsertMotorista();
  const {
    deleteMotorista,
    loading: deleting,
    error: deleteError,
  } = useDeleteMotorista();

  const [novoRegistro, setNovoRegistro] = useState<Partial<Motorista>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filtro e paginação
  const { paginatedRecords, totalPages } = useMemo(() => {
    const filtered = motoristas.filter((m) =>
      m.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return {
      paginatedRecords: filtered.slice(start, end),
      totalPages: Math.ceil(filtered.length / ITEMS_PER_PAGE),
    };
  }, [motoristas, searchQuery, currentPage]);

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, []);

  const adicionarRegistro = useCallback(
    async (data: CreateMotoristaInput) => {
      try {
        await insertMotorista(data);
        setIsDialogOpen(false);
        setNovoRegistro({});
        startTransition(() => {
          refetch();
        });
      } catch (error) {
        console.error("Erro ao inserir Motorista:", error);
      }
    },
    [insertMotorista, refetch]
  );

  const deletarRegistro = useCallback(
    async (id: string) => {
      if (confirm("Tem certeza que deseja deletar este motorista?")) {
        try {
          await deleteMotorista(id);
          startTransition(() => {
            refetch();
          });
        } catch (error) {
          console.error("Erro ao deletar Motorista:", error);
        }
      }
    },
    [deleteMotorista, refetch]
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Card className="max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Gestão de Motoristas
          </CardTitle>
          <CardDescription>
            Gerencie seus motoristas registrados
          </CardDescription>
        </CardHeader>

        <CardContent>
          <MotoristaTable
            motoristas={paginatedRecords}
            loading={loading}
            error={error || insertError || deleteError || null}
            searchQuery={searchQuery}
            onSearch={handleSearch}
            onDelete={deletarRegistro}
            onOpenDialog={() => setIsDialogOpen(true)}
            deleting={deleting}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </CardContent>
      </Card>

      <MotoristaFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={adicionarRegistro}
        loading={inserting}
        formData={novoRegistro}
        setFormData={setNovoRegistro}
      />
    </div>
  );
}
