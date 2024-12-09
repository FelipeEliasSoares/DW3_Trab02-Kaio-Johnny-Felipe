"use client";

import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Motorista,
  CreateMotoristaInput,
} from "../../../hooks/motoristas/types/types";

interface MotoristaFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateMotoristaInput) => void;
  loading: boolean;
  formData: Partial<Motorista>;
  setFormData: (data: Partial<Motorista>) => void;
}

export const MotoristaFormDialog: FC<MotoristaFormDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  loading,
  formData,
  setFormData,
}) => {
  const handleSubmit = () => {
    // Verifica campos obrigatórios
    if (
      !formData.nome ||
      !formData.cpf ||
      !formData.email ||
      !formData.dataContratacao
    ) {
      alert("Todos os campos são obrigatórios");
      return;
    }

    onSubmit({
      nome: formData.nome,
      cpf: formData.cpf,
      email: formData.email,
      dataContratacao: formData.dataContratacao,
    } as CreateMotoristaInput);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Motorista</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Nome"
            value={formData.nome || ""}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          />
          <Input
            placeholder="CPF"
            value={formData.cpf || ""}
            onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
          />
          <Input
            placeholder="Email"
            value={formData.email || ""}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <Input
            type="date"
            value={formData.dataContratacao || ""}
            onChange={(e) =>
              setFormData({ ...formData, dataContratacao: e.target.value })
            }
          />
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
