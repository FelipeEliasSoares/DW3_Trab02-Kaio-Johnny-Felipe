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
import { CreateMotoristaVeiculoInput } from "../../../hooks/motoristaVeiculo/types/types";
import { Motorista } from "../../../hooks/motoristas/types/types";
import { Veiculos } from "../../../hooks/veiculos/types/types";

interface MotoristaVeiculoFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateMotoristaVeiculoInput) => void;
  loading: boolean;
  motoristas: Motorista[];
  veiculos: Veiculos[];
  formData: Partial<CreateMotoristaVeiculoInput>;
  setFormData: (data: Partial<CreateMotoristaVeiculoInput>) => void;
}

export const MotoristaVeiculoFormDialog: FC<
  MotoristaVeiculoFormDialogProps
> = ({
  isOpen,
  onClose,
  onSubmit,
  loading,
  motoristas,
  veiculos,
  formData,
  setFormData,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validações para os campos
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.motoristaID) {
      newErrors.motoristaID = "O motorista é obrigatório.";
    }

    if (!formData.veiculoID) {
      newErrors.veiculoID = "O veículo é obrigatório.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit({
      motoristaID: formData.motoristaID!,
      veiculoID: formData.veiculoID!,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Associar Motorista e Veículo</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Seleção de Motorista */}
          <div>
            <Select
              value={formData.motoristaID || ""}
              onValueChange={(value) =>
                setFormData({ ...formData, motoristaID: value })
              }
            >
              <SelectTrigger aria-label="Selecione um motorista">
                <SelectValue
                  placeholder="Selecione um motorista"
                  defaultValue={
                    motoristas.find((m) => m.id === formData.motoristaID)
                      ?.nome || ""
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {motoristas.map((motorista) => (
                  <SelectItem key={motorista.id} value={motorista.id}>
                    {motorista.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.motoristaID && (
              <p className="text-red-500 text-sm mt-1">{errors.motoristaID}</p>
            )}
          </div>

          {/* Seleção de Veículo */}
          <div>
            <Select
              value={formData.veiculoID || ""}
              onValueChange={(value) =>
                setFormData({ ...formData, veiculoID: value })
              }
            >
              <SelectTrigger aria-label="Selecione um veículo">
                <SelectValue
                  placeholder="Selecione um veículo"
                  defaultValue={
                    veiculos.find((v) => v.id === formData.veiculoID)?.placa ||
                    ""
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {veiculos.map((veiculo) => (
                  <SelectItem key={veiculo.id} value={veiculo.id}>
                    {veiculo.placa} - {veiculo.modelo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.veiculoID && (
              <p className="text-red-500 text-sm mt-1">{errors.veiculoID}</p>
            )}
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
