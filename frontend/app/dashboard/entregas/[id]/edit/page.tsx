"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  useGetEntregaById,
  useUpdateEntrega,
} from "@/hooks/entregas/useEntregas";
import { useGetAllClientes } from "@/hooks/clientes/useClientes";
import { useGetAllMotoristaVeiculos } from "@/hooks/motoristaVeiculo/useMotoristaVeiculo";
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

export default function EditEntregaPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  // Hooks para buscar dados
  const {
    entrega,
    loading: loadingEntrega,
    error: errorEntrega,
  } = useGetEntregaById(id);
  const {
    clientes,
    loading: loadingClientes,
    error: errorClientes,
  } = useGetAllClientes();
  const {
    motoristaVeiculos,
    loading: loadingMotoristaVeiculos,
    error: errorMotoristaVeiculos,
  } = useGetAllMotoristaVeiculos();

  const {
    updateEntrega,
    loading: updating,
    error: updateError,
  } = useUpdateEntrega();

  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState<{
    descricao: string;
    clienteID: string;
    motorisVeiculoId: string;
    dataInicio: string;
    dataEntrega: string;
  }>({
    descricao: "",
    clienteID: "",
    motorisVeiculoId: "",
    dataInicio: "",
    dataEntrega: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Preenche o estado com os dados do registro quando a API retorna os valores
  useEffect(() => {
    if (entrega) {
      setFormData({
        descricao: entrega.descricao || "",
        clienteID: entrega.clienteid || "",
        motorisVeiculoId: entrega.motorisveiculoid || "",
        dataInicio: entrega.datainicio
          ? new Date(entrega.datainicio).toISOString().split("T")[0]
          : "",
        dataEntrega: entrega.dataentrega
          ? new Date(entrega.dataentrega).toISOString().split("T")[0]
          : "",
      });
    }
  }, [entrega]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.descricao.trim()) {
      newErrors.descricao = "Descrição é obrigatória.";
    }

    if (!formData.clienteID) {
      newErrors.clienteID = "Cliente é obrigatório.";
    }

    if (!formData.motorisVeiculoId) {
      newErrors.motorisVeiculoId = "Motorista/Veículo é obrigatório.";
    }

    if (!formData.dataInicio) {
      newErrors.dataInicio = "Data de início é obrigatória.";
    }

    if (!formData.dataEntrega) {
      newErrors.dataEntrega = "Data de entrega é obrigatória.";
    } else if (
      formData.dataInicio &&
      formData.dataInicio > formData.dataEntrega
    ) {
      newErrors.dataEntrega =
        "Data de entrega não pode ser anterior à data de início.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      const payload = {
        descricao: formData.descricao,
        dataInicio: formData.dataInicio,
        dataEntrega: formData.dataEntrega,
        motorisVeiculoId: formData.motorisVeiculoId,
        clienteID: formData.clienteID,
      };

      console.log("Payload enviado:", payload);

      await updateEntrega(id, payload);
      router.push("/dashboard/entregas");
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
  };

  // Renderização condicional enquanto os dados estão sendo carregados
  if (loadingEntrega || loadingClientes || loadingMotoristaVeiculos) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  // Tratamento de erros nas requisições
  if (errorEntrega || errorClientes || errorMotoristaVeiculos) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Ocorreu um erro ao carregar os dados. Por favor, tente novamente.
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
          <CardTitle>Editar Entrega</CardTitle>
          <CardDescription>Atualize as informações da entrega</CardDescription>
        </CardHeader>

        <CardContent>
          {updateError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{updateError}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-6">
            {/* Input para Descrição */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Descrição
              </label>
              <input
                type="text"
                value={formData.descricao}
                onChange={(e) =>
                  setFormData({ ...formData, descricao: e.target.value })
                }
                className="w-full border rounded p-2"
              />
              {errors.descricao && (
                <p className="text-red-500 text-sm mt-1">{errors.descricao}</p>
              )}
            </div>

            {/* Select para Cliente */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Cliente
              </label>
              <Select
                value={formData.clienteID}
                onValueChange={(value) =>
                  setFormData({ ...formData, clienteID: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clientes.map((cliente) => (
                    <SelectItem key={cliente.id} value={cliente.id}>
                      {cliente.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.clienteID && (
                <p className="text-red-500 text-sm mt-1">{errors.clienteID}</p>
              )}
            </div>

            {/* Select para Motorista/Veículo */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Motorista/Veículo
              </label>
              <Select
                value={formData.motorisVeiculoId}
                onValueChange={(value) =>
                  setFormData({ ...formData, motorisVeiculoId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um motorista/veículo" />
                </SelectTrigger>
                <SelectContent>
                  {motoristaVeiculos.map((mv) => (
                    <SelectItem key={mv.id} value={mv.id}>
                      {mv.motorista_nome} - {mv.veiculo_placa}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.motorisVeiculoId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.motorisVeiculoId}
                </p>
              )}
            </div>

            {/* Datas */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Data Início
                </label>
                <input
                  type="date"
                  value={formData.dataInicio}
                  onChange={(e) =>
                    setFormData({ ...formData, dataInicio: e.target.value })
                  }
                  className="w-full border rounded p-2"
                />
                {errors.dataInicio && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.dataInicio}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Data Entrega
                </label>
                <input
                  type="date"
                  value={formData.dataEntrega}
                  onChange={(e) =>
                    setFormData({ ...formData, dataEntrega: e.target.value })
                  }
                  min={formData.dataInicio || ""}
                  disabled={!formData.dataInicio}
                  className={`w-full border rounded p-2 ${
                    !formData.dataInicio ? "bg-gray-100" : ""
                  }`}
                />
                {errors.dataEntrega && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.dataEntrega}
                  </p>
                )}
              </div>
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
