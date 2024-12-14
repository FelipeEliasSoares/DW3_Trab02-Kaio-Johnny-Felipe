"use client";

import { useRouter, useParams } from "next/navigation";
import { useGetClientesById } from "@/hooks/clientes/useClientes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, AlertCircle, Calendar, IdCard } from "lucide-react";

export default function ViewClientePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { clientes, loading, error } = useGetClientesById(id);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <Alert variant="destructive" className="max-w-2xl mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro ao carregar cliente</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!clientes) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <Alert className="max-w-2xl mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Cliente não encontrado</AlertTitle>
          <AlertDescription>
            O cliente que você está procurando não existe ou foi removido.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </div>
          <CardTitle>Detalhes do Cliente</CardTitle>
          <CardDescription>Informações completas do cliente</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <IdCard className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">Nome</p>
                <p className="text-base">{clientes.nome}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <IdCard className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-base">{clientes.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">
                  Data de Cadastro
                </p>
                <p className="text-base">
                  {new Date(clientes.datacadastro).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="w-full sm:w-auto"
            >
              Voltar
            </Button>
            <Button
              onClick={() => router.push(`/dashboard/clientes/${id}/edit/`)}
              className="w-full sm:w-auto"
            >
              Editar Cliente
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
