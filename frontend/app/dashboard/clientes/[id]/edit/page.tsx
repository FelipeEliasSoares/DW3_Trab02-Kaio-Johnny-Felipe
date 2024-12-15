"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  useGetClientesById,
  useUpdateClientes,
} from "@/hooks/clientes/useClientes";
import { Clientes } from "@/hooks/clientes/types/types";
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

export default function EditClientePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { clientes, loading , error } = useGetClientesById(id);

  const {
    updateClientes,
    loading: updating,
    error: updateError,
  } = useUpdateClientes();

  const [formData, setFormData] = useState<Clientes>({
    id: "",
    nome: "",
    email: "",
    datacadastro: new Date(),
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (clientes) {
      setFormData({
        id: clientes.id,
        nome: clientes.nome,
        email: clientes.email,
        datacadastro: new Date(clientes.datacadastro),
      });
    }
  }, [clientes]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.nome) {
      newErrors.nome = "Nome é obrigatório";
    }

    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.datacadastro || isNaN(formData.datacadastro.getTime())) {
      newErrors.datacadastro = "Data de Cadastro é obrigatória";
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
        email: formData.email,
      };


      await updateClientes(id, dataToSend);
      router.push("/dashboard/clientes");
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev: Clientes) => ({
      ...prev,
      [id]: value,
    }));
  };


  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      setFormData((prev) => ({ ...prev, datacadastro: new Date(NaN) }));
      setErrors((prev) => ({
        ...prev,
        datacadastro: "Data de Cadastro é obrigatória",
      }));
    } else {
      setFormData((prev) => ({ ...prev, datacadastro: new Date(value) }));
      setErrors((prev) => ({ ...prev, datacadastro: "" }));
    }
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
          <CardTitle>Editar Cliente</CardTitle>
          <CardDescription>Atualize as informações do cliente</CardDescription>
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
                placeholder="Nome do cliente"
                value={formData.nome}
                onChange={handleChange}
                required
              />
              {errors.nome && (
                <p className="text-red-500 text-sm">{errors.nome}</p>
              )}
            </div>

            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="Email do cliente"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="grid gap-2">
              <label htmlFor="datacadastro">Data de Cadastro</label>
              <Input
                type="date"
                value={
                  formData.datacadastro instanceof Date &&
                  !isNaN(formData.datacadastro.getTime())
                    ? formData.datacadastro.toISOString().split("T")[0]
                    : ""
                }
                onChange={handleDateChange}
                disabled
              />
              {errors.datacadastro && (
                <p className="text-red-500 text-sm">{errors.datacadastro}</p>
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

