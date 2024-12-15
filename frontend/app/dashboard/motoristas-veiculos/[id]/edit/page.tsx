"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  useGetMotoristaVeiculoById,
  useUpdateMotoristaVeiculo,
} from "@/hooks/motoristaVeiculo/useMotoristaVeiculo";
import { useGetAllMotoristas } from "@/hooks/motoristas/useMotoristas";
import { useGetAllveiculos } from "@/hooks/veiculos/useVeiculos";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";

export default function EditMotoristaVeiculoPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { motoristaVeiculo, loading, error } = useGetMotoristaVeiculoById(id);
  const { motoristas } = useGetAllMotoristas();
  const { veiculos } = useGetAllveiculos();

  const {
    updateMotoristaVeiculo,
    loading: updating,
    error: updateError,
  } = useUpdateMotoristaVeiculo();

  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    motoristaID: "",
    veiculoID: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Preenche o estado com os dados do registro quando a API retorna os valores
  useEffect(() => {
    if (motoristaVeiculo) {
      setFormData({
        motoristaID: motoristaVeiculo.motoristaid, // ID do motorista
        veiculoID: motoristaVeiculo.veiculoid, // ID do veículo
      });
    }
  }, [motoristaVeiculo]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.motoristaID) {
      newErrors.motorista_id = "Motorista é obrigatório.";
    }

    if (!formData.motoristaID) {
      newErrors.veiculo_id = "Veículo é obrigatório.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      await updateMotoristaVeiculo(id, formData);
      router.push("/dashboard/motoristas-veiculos");
    } catch (error) {
      console.error("Erro ao atualizar:", error);
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
          <CardTitle>Editar Associação</CardTitle>
          <CardDescription>
            Atualize as informações da associação
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
            {/* Select para Motorista */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Motorista
              </label>
              <Select
                value={formData.motoristaID}
                onValueChange={(value) =>
                  setFormData({ ...formData, motoristaID: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um motorista" />
                </SelectTrigger>
                <SelectContent>
                  {motoristas.map((motorista) => (
                    <SelectItem key={motorista.id} value={motorista.id}>
                      {motorista.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.motorista_id && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.motorista_id}
                </p>
              )}
            </div>

            {/* Select para Veículo */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Veículo
              </label>
              <Select
                value={formData.veiculoID}
                onValueChange={(value) =>
                  setFormData({ ...formData, veiculoID: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um veículo" />
                </SelectTrigger>
                <SelectContent>
                  {veiculos.map((veiculo) => (
                    <SelectItem key={veiculo.id} value={veiculo.id}>
                      {veiculo.placa} - {veiculo.modelo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.veiculo_id && (
                <p className="text-red-500 text-sm mt-1">{errors.veiculo_id}</p>
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
