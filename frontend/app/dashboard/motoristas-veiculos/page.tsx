"use client";

import { useState, useMemo, useCallback, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MotoristaVeiculoTable } from "../motoristas-veiculos/MotoristaVeiculoTable";
import { MotoristaVeiculoFormDialog } from "../motoristas-veiculos/MotoristaVeiculoFormDialog";
import {
  useGetAllMotoristaVeiculos,
  useInsertMotoristaVeiculo,
  useDeleteMotoristaVeiculo,
} from "../../../hooks/motoristaVeiculo/useMotoristaVeiculo";
import { useGetAllMotoristas } from "../../../hooks/motoristas/useMotoristas";
import { useGetAllveiculos } from "../../../hooks/veiculos/useVeiculos";
import {
  MotoristaVeiculo,
  CreateMotoristaVeiculoInput,
} from "../../../hooks/motoristaVeiculo/types/types";

const ITEMS_PER_PAGE = 10;

export default function MotoristaVeiculoPage() {
  const [isPending, startTransition] = useTransition();
  const { motoristaVeiculos, loading, error, refetch } =
    useGetAllMotoristaVeiculos();
  const { motoristas } = useGetAllMotoristas();
  const { veiculos } = useGetAllveiculos();


  const {
    insertMotoristaVeiculo,
    loading: inserting,
    error: insertError,
  } = useInsertMotoristaVeiculo();

  const {
    deleteMotoristaVeiculo,
    loading: deleting,
    error: deleteError,
  } = useDeleteMotoristaVeiculo();

  const [novoRegistro, setNovoRegistro] = useState<Partial<MotoristaVeiculo>>(
    {}
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filtro e paginação
  const { paginatedRecords, totalPages } = useMemo(() => {
    const filtered =
      motoristaVeiculos?.filter(
        (mv) =>
          mv.motorista_nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mv.veiculo_placa.toLowerCase().includes(searchQuery.toLowerCase())
      ) || [];

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return {
      paginatedRecords: filtered.slice(start, end),
      totalPages: Math.ceil(filtered.length / ITEMS_PER_PAGE),
    };
  }, [motoristaVeiculos, searchQuery, currentPage]);

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, []);

  const adicionarRegistro = useCallback(
    async (data: CreateMotoristaVeiculoInput) => {
      try {
        await insertMotoristaVeiculo(data);
        setIsDialogOpen(false);
        setNovoRegistro({});
        startTransition(() => {
          refetch();
        });
      } catch (error) {
        console.error("Erro ao inserir MotoristaVeiculo:", error);
      }
    },
    [insertMotoristaVeiculo, refetch]
  );

  const deletarRegistro = useCallback(
    async (id: string) => {
      if (confirm("Tem certeza que deseja deletar este MotoristaVeiculo?")) {
        try {
          await deleteMotoristaVeiculo(id);
          startTransition(() => {
            refetch();
          });
        } catch (error) {
          console.error("Erro ao deletar MotoristaVeiculo:", error);
        }
      }
    },
    [deleteMotoristaVeiculo, refetch]
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Card className="max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Gestão de Motorista e Veículo
          </CardTitle>
          <CardDescription>
            Gerencie as associações entre Motoristas e Veículos
          </CardDescription>
        </CardHeader>

        <CardContent>
          <MotoristaVeiculoTable
            motoristaVeiculos={paginatedRecords}
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

      <MotoristaVeiculoFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={adicionarRegistro}
        motoristas={motoristas}
        veiculos={veiculos}
        loading={inserting}
        formData={novoRegistro}
        setFormData={setNovoRegistro}
      />
    </div>
  );
}
