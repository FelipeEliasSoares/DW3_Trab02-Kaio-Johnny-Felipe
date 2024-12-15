"use client";

import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { CreateEntregaInput } from "@/hooks/entregas/types/types";
import { Clientes } from "@/hooks/clientes/types/types";
import { MotoristaVeiculo } from "@/hooks/motoristaVeiculo/types/types";

interface EntregaFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateEntregaInput) => void;
  loading: boolean;
  clientes: Clientes[];
  motoristaVeiculos: MotoristaVeiculo[];
  formData: Partial<CreateEntregaInput>;
  setFormData: (data: Partial<CreateEntregaInput>) => void;
}

export const EntregaFormDialog: FC<EntregaFormDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  loading,
  clientes,
  motoristaVeiculos,
  formData,
  setFormData,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validações para os campos
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.descricao) {
      newErrors.descricao = "A descrição é obrigatória.";
    }

    if (!formData.clienteID) {
      newErrors.clienteID = "O cliente é obrigatório.";
    }

    if (!formData.motorisVeiculoId) {
      newErrors.motorisVeiculoId = "O motorista/veículo é obrigatório.";
    }

    if (!formData.dataInicio) {
      newErrors.dataInicio = "A data de início é obrigatória.";
    }

    if (!formData.dataEntrega) {
      newErrors.dataEntrega = "A data de entrega é obrigatória.";
    } else {
      if (formData.dataInicio && formData.dataEntrega < formData.dataInicio) {
        newErrors.dataEntrega =
          "A data de entrega não pode ser anterior à data de início.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit({
      descricao: formData.descricao!,
      dataInicio: formData.dataInicio!,
      dataEntrega: formData.dataEntrega!,
      clienteID: formData.clienteID!,
      motorisVeiculoId: formData.motorisVeiculoId!,
    });
  };

  const handleDataInicioChange = (value: string) => {
    setFormData({ ...formData, dataInicio: value });
    if (formData.dataEntrega && formData.dataEntrega < value) {
      setFormData({ ...formData, dataInicio: value, dataEntrega: "" });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nova Entrega</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Descrição */}
          <div>
            <input
              type="text"
              placeholder="Descrição"
              value={formData.descricao || ""}
              onChange={(e) =>
                setFormData({ ...formData, descricao: e.target.value })
              }
              className="w-full border rounded p-2"
            />
            {errors.descricao && (
              <p className="text-red-500 text-sm mt-1">{errors.descricao}</p>
            )}
          </div>

          {/* Seleção de Cliente */}
          <div>
            <Select
              value={formData.clienteID || ""}
              onValueChange={(value) =>
                setFormData({ ...formData, clienteID: value })
              }
            >
              <SelectTrigger aria-label="Selecione um cliente">
                <SelectValue
                  placeholder="Selecione um cliente"
                  defaultValue={
                    clientes.find((c) => c.id === formData.clienteID)?.nome ||
                    ""
                  }
                />
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

          {/* Seleção de Motorista/Veículo */}
          <div>
            <Select
              value={formData.motorisVeiculoId || ""}
              onValueChange={(value) =>
                setFormData({ ...formData, motorisVeiculoId: value })
              }
            >
              <SelectTrigger aria-label="Selecione um motorista/veículo">
                <SelectValue
                  placeholder="Selecione um motorista/veículo"
                  defaultValue={
                    motoristaVeiculos.find(
                      (mv) => mv.id === formData.motorisVeiculoId
                    )?.motorista_nome || ""
                  }
                />
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
              <input
                type="date"
                value={formData.dataInicio || ""}
                onChange={(e) => handleDataInicioChange(e.target.value)}
                className="w-full border rounded p-2"
              />
              <p className="text-gray-500 text-sm">Data Início</p>
              {errors.dataInicio && (
                <p className="text-red-500 text-sm mt-1">{errors.dataInicio}</p>
              )}
            </div>
            <div>
              <input
                type="date"
                value={formData.dataEntrega || ""}
                onChange={(e) =>
                  setFormData({ ...formData, dataEntrega: e.target.value })
                }
                min={formData.dataInicio || ""}
                className="w-full border rounded p-2"
              />
              <p className="text-gray-500 text-sm">Data Entrega</p>
              {errors.dataEntrega && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dataEntrega}
                </p>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Adicionando..." : "Adicionar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
