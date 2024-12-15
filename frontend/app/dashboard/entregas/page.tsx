"use client";

import { useState, useMemo, useCallback, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EntregaTable } from "../entregas/EntregaTable";
import { EntregaFormDialog } from "../entregas/EntregaFormDialog";
import {
  useGetAllEntregas,
  useInsertEntrega,
  useDeleteEntrega,
} from "@/hooks/entregas/useEntregas";
import { useGetAllClientes } from "@/hooks/clientes/useClientes";
import { useGetAllMotoristaVeiculos } from "@/hooks/motoristaVeiculo/useMotoristaVeiculo";
import { CreateEntregaInput, Entrega } from "@/hooks/entregas/types/types";

const ITEMS_PER_PAGE = 10;

export default function EntregasPage() {
  const [isPending, startTransition] = useTransition();
  const { entregas, loading, error, refetch } = useGetAllEntregas();
  const { clientes } = useGetAllClientes();
  const { motoristaVeiculos } = useGetAllMotoristaVeiculos();


  const {
    insertEntrega,
    loading: inserting,
    error: insertError,
  } = useInsertEntrega();

  const {
    deleteEntrega,
    loading: deleting,
    error: deleteError,
  } = useDeleteEntrega();

  const [novoRegistro, setNovoRegistro] = useState<Partial<Entrega>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filtro e paginação
  const { paginatedRecords, totalPages } = useMemo(() => {
    const filtered =
      entregas?.filter(
        (entrega) =>
          entrega.descricao.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entrega.cliente_nome.toLowerCase().includes(searchQuery.toLowerCase())
      ) || [];

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return {
      paginatedRecords: filtered.slice(start, end),
      totalPages: Math.ceil(filtered.length / ITEMS_PER_PAGE),
    };
  }, [entregas, searchQuery, currentPage]);

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, []);

  const adicionarRegistro = useCallback(
    async (data: CreateEntregaInput) => {
      try {
        await insertEntrega(data);
        setIsDialogOpen(false);
        setNovoRegistro({});
        startTransition(() => {
          refetch();
        });
      } catch (error) {
        console.error("Erro ao inserir Entrega:", error);
      }
    },
    [insertEntrega, refetch]
  );

  const deletarRegistro = useCallback(
    async (id: string) => {
      if (confirm("Tem certeza que deseja deletar esta Entrega?")) {
        try {
          await deleteEntrega(id);
          startTransition(() => {
            refetch();
          });
        } catch (error) {
          console.error("Erro ao deletar Entrega:", error);
        }
      }
    },
    [deleteEntrega, refetch]
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Card className="max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Gestão de Entregas
          </CardTitle>
          <CardDescription>
            Gerencie as entregas cadastradas no sistema
          </CardDescription>
        </CardHeader>

        <CardContent>
          <EntregaTable
            entregas={paginatedRecords}
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

      <EntregaFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={adicionarRegistro}
        clientes={clientes || []}
        motoristaVeiculos={motoristaVeiculos || []}
        loading={inserting}
        formData={novoRegistro}
        setFormData={setNovoRegistro}
      />
    </div>
  );
}
