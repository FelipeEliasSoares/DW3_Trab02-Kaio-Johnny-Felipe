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
  Clientes,
  CreateClientesInput,
} from "../../../hooks/clientes/types/types";

interface ClienteFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateClientesInput) => void;
  loading: boolean;
  formData: Partial<Omit<Clientes, "id">>;
  setFormData: (data: Partial<Omit<Clientes, "id">>) => void;
}

export const ClienteFormDialog: FC<ClienteFormDialogProps> = ({
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

    if (!formData.email || formData.email.trim() === "") {
      newErrors.email = "O email é obrigatório.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "O email é inválido.";
    }

    if (!formData.datacadastro) {
      newErrors.datacadastro = "A data de cadastro é obrigatória.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit({
      nome: formData.nome!,
      email: formData.email!,
      datacadastro: formData.datacadastro!,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Cliente</DialogTitle>
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
              value={formData.datacadastro || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  datacadastro: e.target.value,
                })
              }
            />
            {errors.datacadastro && (
              <p className="text-red-500 text-sm mt-1">{errors.datacadastro}</p>
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
