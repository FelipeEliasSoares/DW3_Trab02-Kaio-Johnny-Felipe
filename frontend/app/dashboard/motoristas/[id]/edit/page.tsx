"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
    useGetMotoristaById,
    useUpdateMotorista,
} from "@/hooks/motoristas/useMotoristas";
import { Motorista } from "../../../../../hooks/motoristas/types/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import { format } from "date-fns";

// Função para cpf
import { formatCPF } from "@/lib/utils/formatCpf";


export function formatDate(date: Date): string {
    return format(date, "dd/MM/yyyy");
}


export default function EditMotoristaPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { motorista, loading, error } = useGetMotoristaById(id);

  const {
    updateMotorista,
    loading: updating,
    error: updateError,
  } = useUpdateMotorista();

  const [formData, setFormData] = useState<Motorista>({
    id: "",
    nome: "",
    cpf: "",
    email: "",
    datacontratacao: new Date(),
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
    if (motorista) {
        setFormData({
        id: motorista.id,
        nome: motorista.nome,
        cpf: formatCPF(motorista.cpf), 
        email: motorista.email,
        datacontratacao: new Date(motorista.datacontratacao), 
        });
    }
    }, [motorista]);


    const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.nome) {
        newErrors.nome = "Nome é obrigatório";
    }

    const cpfNumeros = formData.cpf.replace(/\D/g, ""); // Remove a máscara para validação

    if (!cpfNumeros) {
        newErrors.cpf = "CPF é obrigatório";
    } else if (cpfNumeros.length !== 11) {
        newErrors.cpf = "CPF deve ter 11 dígitos numéricos";
    }

    if (!formData.email) {
        newErrors.email = "Email é obrigatório";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
        newErrors.email = "Email inválido";
    }

    if (!formData.datacontratacao) {
        newErrors.datacontratacao = "Data de contratação é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
      if (!validate()) {
        return;
      }

      try {
        const dataToSend = {
          nome: formData.nome,
        };

        await updateMotorista(id, dataToSend);
        router.push("/dashboard/motoristas");
      } catch (error) {
        console.error("Failed to update:", error);
      }
};



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

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
          <CardTitle>Editar Motorista</CardTitle>
          <CardDescription>
            Atualize as informações do motorista
          </CardDescription>
        </CardHeader>

        <CardContent>
          {updateError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{updateError}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-6">
            <div className="grid gap-2">
              <label htmlFor="nome">Nome</label>
              <Input
                id="nome"
                placeholder="Nome do motorista"
                value={formData.nome}
                onChange={handleChange}
              />
              {errors.nome && (
                <p className="text-red-500 text-sm">{errors.nome}</p>
              )}
            </div>

            <div className="grid gap-2">
              <label htmlFor="cpf">CPF</label>
              <Input
                id="cpf"
                placeholder="CPF do motorista"
                value={formData.cpf}
                onChange={(e) => {
                  const formattedCPF = formatCPF(e.target.value);
                  setFormData((prev) => ({ ...prev, cpf: formattedCPF }));
                }}
                disabled
              />
              {errors.cpf && (
                <p className="text-red-500 text-sm">{errors.cpf}</p>
              )}
            </div>

            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="Email do motorista"
                value={formData.email}
                onChange={handleChange}
                disabled
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="grid gap-2">
              <label htmlFor="datacontratacao">Data de Contratação</label>
              <Input
                id="datacontratacao"
                type="date"
                value={
                  formData.datacontratacao instanceof Date
                    ? formData.datacontratacao.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    datacontratacao: new Date(e.target.value + "T00:00:00"),
                  }))
                }
                disabled
              />
              {errors.datacontratacao && (
                <p className="text-red-500 text-sm">{errors.datacontratacao}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              variant="outline"
              onClick={() => router.back()}
              disabled={updating}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              disabled={updating}
              className="flex items-center gap-2"
            >
              {updating ? (
                "Salvando..."
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Salvar Alterações
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
