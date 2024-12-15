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
import {
  Motorista,
  CreateMotoristaInput,
} from "../../../hooks/motoristas/types/types";
import { formatCPF } from "@/lib/utils/formatCpf"; // Importa a função de formatação

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
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validações para os campos
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome || formData.nome.trim() === "") {
      newErrors.nome = "O nome é obrigatório.";
    }

    if (!formData.cpf) {
      newErrors.cpf = "O CPF é obrigatório.";
    } else if (!/^\d{11}$/.test(formData.cpf.replace(/\D/g, ""))) {
      newErrors.cpf = "O CPF deve ter exatamente 11 dígitos.";
    }

    if (!formData.email) {
      newErrors.email = "O email é obrigatório.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "O email não é válido.";
    }

    if (!formData.datacontratacao) {
      newErrors.dataontratacao = "A data de contratação é obrigatória.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit({
      nome: formData.nome!,
      cpf: formData.cpf!.replace(/\D/g, ""), // Remove a máscara antes de enviar
      email: formData.email!,
      dataContratacao: formData.datacontratacao!.toISOString().split("T")[0],
    } as CreateMotoristaInput);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Motorista</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Input
              placeholder="Nome"
              value={formData.nome || ""}
              onChange={(e) =>
                setFormData({ ...formData, nome: e.target.value })
              }
            />
            {errors.nome && (
              <p className="text-red-500 text-sm mt-1">{errors.nome}</p>
            )}
          </div>
          <div>
            <Input
              placeholder="CPF"
              value={formData.cpf || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  cpf: formatCPF(e.target.value), // Aplica a função de formatação
                })
              }
            />
            {errors.cpf && (
              <p className="text-red-500 text-sm mt-1">{errors.cpf}</p>
            )}
          </div>
          <div>
            <Input
              placeholder="Email"
              value={formData.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <Input
              type="date"
              value={
                formData.datacontratacao
                  ? formData.datacontratacao.toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  datacontratacao: new Date(e.target.value),
                })
              }
            />
            {errors.dataontratacao && (
              <p className="text-red-500 text-sm mt-1">
                {errors.dataontratacao}
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
