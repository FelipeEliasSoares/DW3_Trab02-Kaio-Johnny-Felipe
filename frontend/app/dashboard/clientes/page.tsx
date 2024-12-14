"use client";

import { useState, useMemo, useCallback, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ClientesTable } from "../clientes/ClientesTable";
import { ClienteFormDialog } from "./ClientesFormDialog";
import {
  useGetAllClientes,
  useInsertClientes,
  useDeleteClientes,
} from "../../../hooks/clientes/useClientes";
import {
  Clientes,
  CreateClientesInput,
} from "../../../hooks/clientes/types/types";

const ITEMS_PER_PAGE = 10;

export default function ClientePage() {
  const [isPending, startTransition] = useTransition();
  const { clientes, loading, error, refetch } = useGetAllClientes();

  const {
    insertClientes,
    loading: inserting,
    error: insertError,
  } = useInsertClientes();

  const {
    deleteClientes,
    loading: deleting,
    error: deleteError,
  } = useDeleteClientes();

  const [novoRegistro, setNovoRegistro] = useState<Partial<Clientes>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filtro e paginação
  const { paginatedRecords, totalPages } = useMemo(() => {
    const filtered = clientes.filter((c) =>
      c.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return {
      paginatedRecords: filtered.slice(start, end),
      totalPages: Math.ceil(filtered.length / ITEMS_PER_PAGE),
    };
  }, [clientes, searchQuery, currentPage]);

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, []);

  const adicionarRegistro = useCallback(
    async (data: CreateClientesInput) => {
      try {
        await insertClientes(data);
        setIsDialogOpen(false);
        setNovoRegistro({});
        startTransition(() => {
          refetch();
        });
      } catch (error) {
        console.error("Erro ao inserir Cliente:", error);
      }
    },
    [insertClientes, refetch]
  );

  const deletarRegistro = useCallback(
    async (id: string) => {
      if (confirm("Tem certeza que deseja deletar este Cliente?")) {
        try {
          await deleteClientes(id);
          startTransition(() => {
            refetch();
          });
        } catch (error) {
          console.error("Erro ao deletar Cliente:", error);
        }
      }
    },
    [deleteClientes, refetch]
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Card className="max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Gestão de Clientes
          </CardTitle>
          <CardDescription>Gerencie seus Clientes registrados</CardDescription>
        </CardHeader>

        <CardContent>
          <ClientesTable
            clientes={paginatedRecords}
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

      <ClienteFormDialog
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
