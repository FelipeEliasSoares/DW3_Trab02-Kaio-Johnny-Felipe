"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  useGetVeiculosById,
  useUpdateVeiculos,
} from "@/hooks/veiculos/useVeiculos";
import { Veiculos } from "@/hooks/veiculos/types/types";
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

export default function EditVeiculoPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { veiculos, loading, error } = useGetVeiculosById(id);

  const {
    updateVeiculos,
    loading: updating,
    error: updateError,
  } = useUpdateVeiculos();

  const [formData, setFormData] = useState<Veiculos>({
    id: "",
    placa: "",
    modelo: "",
    dataaquisicao: new Date(),
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (veiculos) {
      setFormData({
        id: veiculos.id,
        placa: veiculos.placa,
        modelo: veiculos.modelo,
        dataaquisicao: new Date(veiculos.dataaquisicao),
      });
    }
  }, [veiculos]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.placa) {
      newErrors.placa = "Placa é obrigatória";
    }

    if (!formData.modelo) {
      newErrors.modelo = "Modelo é obrigatório";
    }

    if (!formData.dataaquisicao || isNaN(formData.dataaquisicao.getTime())) {
      newErrors.dataaquisicao = "Data de aquisição é obrigatória";
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
        placa: formData.placa,
        modelo: formData.modelo,
        dataaquisicao: formData.dataaquisicao,
      };

      await updateVeiculos(id, dataToSend);
      router.push("/dashboard/veiculos");
    } catch (error) {
      console.error("Failed to update:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev: Veiculos) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      setFormData((prev) => ({ ...prev, dataaquisicao: new Date(NaN) }));
      setErrors((prev) => ({
        ...prev,
        dataaquisicao: "Data de aquisição é obrigatória",
      }));
    } else {
      setFormData((prev) => ({ ...prev, dataaquisicao: new Date(value) }));
      setErrors((prev) => ({ ...prev, dataaquisicao: "" }));
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
          <CardTitle>Editar Veículo</CardTitle>
          <CardDescription>Atualize as informações do veículo</CardDescription>
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
              <label htmlFor="placa">Placa</label>
              <Input
                id="placa"
                placeholder="Placa do veículo"
                value={formData.placa}
                onChange={handleChange}
                required
              />
              {errors.placa && (
                <p className="text-red-500 text-sm">{errors.placa}</p>
              )}
            </div>

            <div className="grid gap-2">
              <label htmlFor="modelo">Modelo</label>
              <Input
                id="modelo"
                placeholder="Modelo do veículo"
                value={formData.modelo}
                onChange={handleChange}
                required
              />
              {errors.modelo && (
                <p className="text-red-500 text-sm">{errors.modelo}</p>
              )}
            </div>

            <div className="grid gap-2">
              <label htmlFor="dataaquisicao">Data de Aquisição</label>
              <Input
                type="date"
                value={
                  formData.dataaquisicao instanceof Date &&
                  !isNaN(formData.dataaquisicao.getTime())
                    ? formData.dataaquisicao.toISOString().split("T")[0]
                    : ""
                }
                onChange={handleDateChange}
                required
              />
              {errors.dataaquisicao && (
                <p className="text-red-500 text-sm">{errors.dataaquisicao}</p>
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
