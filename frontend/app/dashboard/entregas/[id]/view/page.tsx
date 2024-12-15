"use client";

import { useRouter, useParams } from "next/navigation";
import { useGetEntregaById } from "@/hooks/entregas/useEntregas";
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
import { ArrowLeft, AlertCircle, ClipboardList, Truck } from "lucide-react";

export default function ViewEntregaPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { entrega, loading, error } = useGetEntregaById(id);

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
          <AlertTitle>Erro ao carregar os dados</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!entrega) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <Alert className="max-w-2xl mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Registro não encontrado</AlertTitle>
          <AlertDescription>
            A entrega que você está procurando não existe ou foi removida.
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
          <CardTitle>Detalhes da Entrega</CardTitle>
          <CardDescription>
            Informações completas sobre a entrega
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6">
            {/* Detalhes da Descrição */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <ClipboardList className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">Descrição</p>
                <p className="text-base">{entrega.descricao}</p>
              </div>
            </div>

            {/* Detalhes do Cliente */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <ClipboardList className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">Cliente</p>
                <p className="text-base">{entrega.cliente_nome}</p>
              </div>
            </div>

            {/* Datas */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <ClipboardList className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">Datas</p>
                <p className="text-base">
                  Início:{" "}
                  {new Date(entrega.datainicio).toLocaleDateString("pt-BR")}
                </p>
                <p className="text-base">
                  Entrega:{" "}
                  {new Date(entrega.dataentrega).toLocaleDateString("pt-BR")}
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
              onClick={() => router.push(`/dashboard/entregas/${id}/edit`)}
              className="w-full sm:w-auto"
            >
              Editar Entrega
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
