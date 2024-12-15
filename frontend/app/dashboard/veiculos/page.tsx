"use client";

import { useState, useMemo, useCallback, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VeiculosTable } from "./VeiculoTable";
import { VeiculoFormDialog } from "./VeiculoFormDialog";
import {
  useGetAllveiculos,
  useInsertVeiculos,
  useDeleteVeiculos,
} from "../../../hooks/veiculos/useVeiculos";
import {
  Veiculos,
  CreateVeiculosInput,
} from "../../../hooks/veiculos/types/types";

const ITEMS_PER_PAGE = 10;

export default function VeiculoPage() {
  const [isPending, startTransition] = useTransition();
  const { veiculos, loading, error, refetch } = useGetAllveiculos();
  
  const {
    insertVeiculos,
    loading: inserting,
    error: insertError,
  } = useInsertVeiculos();

  const {
    deleteVeiculos,
    loading: deleting,
    error: deleteError,
  } = useDeleteVeiculos();

  const [novoRegistro, setNovoRegistro] = useState<Partial<Veiculos>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filtro e paginação
  const { paginatedRecords, totalPages } = useMemo(() => {
    const filtered = veiculos.filter((m) =>
      m.placa.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return {
      paginatedRecords: filtered.slice(start, end),
      totalPages: Math.ceil(filtered.length / ITEMS_PER_PAGE),
    };
  }, [veiculos, searchQuery, currentPage]);

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, []);

  const adicionarRegistro = useCallback(
    async (data: CreateVeiculosInput) => {
      try {
        await insertVeiculos(data);
        setIsDialogOpen(false);
        setNovoRegistro({});
        startTransition(() => {
          refetch();
        });
      } catch (error) {
        console.error("Erro ao inserir Veiculo:", error);
      }
    },
    [insertVeiculos, refetch]
  );

  const deletarRegistro = useCallback(
    async (id: string) => {
      if (confirm("Tem certeza que deseja deletar este Veiculo?")) {
        try {
          await deleteVeiculos(id);
          startTransition(() => {
            refetch();
          });
        } catch (error) {
          console.error("Erro ao deletar Veiculo:", error);
        }
      }
    },
    [deleteVeiculos, refetch]
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Card className="max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Gestão de Veiculos
          </CardTitle>
          <CardDescription>
            Gerencie seus Veiculos registrados
          </CardDescription>
        </CardHeader>

        <CardContent>
          <VeiculosTable
            veiculos={paginatedRecords}
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

      <VeiculoFormDialog
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
