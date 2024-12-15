import { useState, useEffect, useCallback } from "react";
import api from "../../lib/api";

import {
  Entrega,
  GetAllEntregasResponse,
  GetEntregaByIdResponse,
  CreateEntregaInput,
  UpdateEntregaInput,
  EntregaDetails,
} from "./types/types";

// Hook para obter todas as Entregas
export const useGetAllEntregas = () => {
  const [entregas, setEntregas] = useState<Entrega[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntregas = async () => {
    try {
      setLoading(true);
      const response = await api.get<GetAllEntregasResponse>("/entregas");
      setEntregas(response.data.registros);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao carregar as Entregas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntregas();
  }, []);

  return { entregas, loading, error, refetch: fetchEntregas };
};

// Hook para obter uma Entrega por ID
export const useGetEntregaById = (id: string | undefined) => {
  const [entrega, setEntrega] = useState<EntregaDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntrega = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const response = await api.get<GetEntregaByIdResponse>(`/entregas/${id}`);
      setEntrega(response.data.registro);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao carregar a Entrega.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEntrega();
  }, [fetchEntrega]);

  return { entrega, loading, error, refetch: fetchEntrega };
};

// Hook para inserir uma Entrega
export const useInsertEntrega = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const insertEntrega = async (newEntrega: CreateEntregaInput) => {
    try {
      setLoading(true);
      const response = await api.post<Entrega>("/entregas", newEntrega);
      setError(null);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao inserir a Entrega.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { insertEntrega, loading, error };
};

// Hook para atualizar uma Entrega
export const useUpdateEntrega = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateEntrega = async (
    id: string,
    updatedEntrega: UpdateEntregaInput
  ) => {
    try {
      setLoading(true);
      // Validação mínima antes de enviar ao backend
      if (
        !updatedEntrega.descricao ||
        !updatedEntrega.dataInicio ||
        !updatedEntrega.dataEntrega ||
        !updatedEntrega.motorisVeiculoId ||
        !updatedEntrega.clienteID
      ) {
        throw new Error("Todos os campos são obrigatórios.");
      }

      // Fazendo a requisição para o backend
      const response = await api.put(`/entregas/${id}`, {
        descricao: updatedEntrega.descricao,
        dataInicio: updatedEntrega.dataInicio,
        dataEntrega: updatedEntrega.dataEntrega,
        motorisVeiculoId: updatedEntrega.motorisVeiculoId,
        clienteID: updatedEntrega.clienteID,
      });

      setError(null); // Zera erros em caso de sucesso
      return response.data;
    } catch (err: any) {
      // Define mensagem de erro personalizada ou captura a do backend
      setError(err.response?.data?.message || "Erro ao atualizar a Entrega.");
      throw err; // Opcional, depende se você quer manipular o erro externamente
    } finally {
      setLoading(false); // Garantir que o loading é desativado
    }
  };

  return { updateEntrega, loading, error };
};

// Hook para deletar uma Entrega
export const useDeleteEntrega = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteEntrega = async (id: string) => {
    try {
      setLoading(true);
      await api.delete(`/entregas/${id}`);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao deletar a Entrega.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteEntrega, loading, error };
};

