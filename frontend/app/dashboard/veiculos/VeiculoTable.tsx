"use client";

import { FC } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Search, Eye, Edit, Trash, Plus } from "lucide-react";
import { Veiculos } from "../../../hooks/veiculos/types/types";
import { Input } from "@/components/ui/input";

interface VeiculosTableProps {
  veiculos: Veiculos[];
  loading: boolean;
  error?: string | null;
  searchQuery: string;
  onSearch: (value: string) => void;
  onDelete: (id: string) => void;
  onOpenDialog: () => void;
  deleting: boolean;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export const VeiculosTable: FC<VeiculosTableProps> = ({
  veiculos,
  loading,
  error,
  searchQuery,
  onSearch,
  onDelete,
  onOpenDialog,
  deleting,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  return (
    <div>
      {/* Seção de busca e novo registro */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Pesquisar por placa ou modelo..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={onOpenDialog} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Novo Veículo
        </Button>
      </div>

      {/* Erros */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Tabela */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Placa</TableHead>
                  <TableHead>Modelo</TableHead>
                  <TableHead>Data de Aquisição</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {veiculos.map((veiculo) => (
                  <TableRow key={veiculo.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      {veiculo.placa}
                    </TableCell>
                    <TableCell>{veiculo.modelo}</TableCell>
                    <TableCell>
                      {veiculo.dataaquisicao instanceof Date
                        ? veiculo.dataaquisicao.toLocaleDateString("pt-BR")
                        : new Date(veiculo.dataaquisicao).toLocaleDateString(
                            "pt-BR"
                          )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/dashboard/veiculos/${veiculo.id}/view`}>
                            <Eye className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/dashboard/veiculos/${veiculo.id}/edit`}>
                            <Edit className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(veiculo.id)}
                          disabled={deleting}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Paginação */}
          <div className="flex justify-center gap-2 mt-4">
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
