"use client";

import { useRouter, useParams } from "next/navigation";
import { useGetMotoristaById } from "@/hooks/motoristas/useMotoristas";
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
import {
  ArrowLeft,
  AlertCircle,
  Calendar,
  Mail,
  User,
  IdCard,
} from "lucide-react";
import { format } from "date-fns";
import { formatCPF } from "@/lib/utils/formatCpf"; // Importa a função de formatação de CPF

export function formatDate(date: Date): string {
  return format(date, "dd/MM/yyyy");
}

export default function ViewMotoristaPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { motorista, loading, error } = useGetMotoristaById(id);

  // Loading state with skeleton
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

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <Alert variant="destructive" className="max-w-2xl mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro ao carregar motorista</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  // Not found state
  if (!motorista) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <Alert className="max-w-2xl mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Motorista não encontrado</AlertTitle>
          <AlertDescription>
            O motorista que você está procurando não existe ou foi removido.
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
          <CardTitle>Detalhes do Motorista</CardTitle>
          <CardDescription>Informações completas do motorista</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <User className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">Nome</p>
                <p className="text-base">{motorista.nome}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <IdCard className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">CPF</p>
                <p className="text-base">{formatCPF(motorista.cpf)}</p>{" "}
                {/* CPF formatado */}
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Mail className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-base">{motorista.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">
                  Data de Contratação
                </p>
                <p className="text-base">
                  {formatDate(new Date(motorista.datacontratacao))}
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
              onClick={() => router.push(`/dashboard/motoristas/${id}/edit/`)}
              className="w-full sm:w-auto"
            >
              Editar Motorista
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
