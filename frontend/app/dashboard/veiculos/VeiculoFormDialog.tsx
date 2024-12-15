"use client";

import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Veiculos, CreateVeiculosInput } from "../../../hooks/veiculos/types/types";

interface VeiculoFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateVeiculosInput) => void;
  loading: boolean;
  formData: Partial<Omit<Veiculos, "id">>;
  setFormData: (data: Partial<Omit<Veiculos, "id">>) => void;
}

export const VeiculoFormDialog: FC<VeiculoFormDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  loading,
  formData,
  setFormData,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validações para os campos
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.placa || formData.placa.trim() === "") {
      newErrors.placa = "A placa é obrigatória.";
    }

    if (!formData.modelo || formData.modelo.trim() === "") {
      newErrors.modelo = "O modelo é obrigatório.";
    }

    if (!formData.dataaquisicao) {
      newErrors.dataaquisicao = "A data de aquisição é obrigatória.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit({
      placa: formData.placa!,
      modelo: formData.modelo!,
      DataAquisicao: formData.dataaquisicao!,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Veículo</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Input
              placeholder="Placa"
              value={formData.placa || ""}
              onChange={(e) =>
                setFormData({ ...formData, placa: e.target.value })
              }
            />
            {errors.placa && (
              <p className="text-red-500 text-sm mt-1">{errors.placa}</p>
            )}
          </div>
          <div>
            <Input
              placeholder="Modelo"
              value={formData.modelo || ""}
              onChange={(e) =>
                setFormData({ ...formData, modelo: e.target.value })
              }
            />
            {errors.modelo && (
              <p className="text-red-500 text-sm mt-1">{errors.modelo}</p>
            )}
          </div>
          <div>
            <Input
              type="date"
              value={
                formData.dataaquisicao instanceof Date && !isNaN(formData.dataaquisicao.getTime())
                  ? formData.dataaquisicao.toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  dataaquisicao: new Date(e.target.value),
                })
              }
            />
            {errors.dataaquisicao && (
              <p className="text-red-500 text-sm mt-1">
                {errors.dataaquisicao}
              </p>
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
