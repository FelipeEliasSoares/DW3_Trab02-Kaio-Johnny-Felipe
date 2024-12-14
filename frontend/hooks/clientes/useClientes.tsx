import { useState, useEffect, useCallback } from "react";
import api from "../../lib/api";
import {
  Clientes,
  CreateClientesInput,
  UpdateClientesInput,
  GetAllClientesResponse,
  GetClientesByIdResponse,
} from "../clientes/types/types";

import { useAuth } from "../../context/AuthContext";

// Hook para obter todas as Clientes
export const useGetAllClientes = () => {
  const [clientes, setClientes] = useState<Clientes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClientes = async () => {
    try {
      setLoading(true);
      const response = await api.get<GetAllClientesResponse>("/clientes");
      console.log(response);
      setClientes(response.data.clientes);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao carregar Clientes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return { clientes, loading, error, refetch: fetchClientes };
};

// Hook para obter uma Clientespor ID
export const useGetClientesById = (id: string | undefined) => {
  const [clientes, setClientes] = useState<Clientes | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClientes = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const response = await api.get<GetClientesByIdResponse>(
        `/clientes/${id}`
      );
      console.log(response);
      if (response.data.clientes) {
        setClientes(response.data.clientes[0] || null);
      } else {
        setClientes(null);
      }
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao carregar a Clientes.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchClientes();
  }, [fetchClientes]);

  return { clientes, loading, error, refetch: fetchClientes };
};

export const useInsertClientes = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const insertClientes = async (newClientes: CreateClientesInput) => {
    if (!user) {
      setError("Usuário não autenticado.");
      throw new Error("Usuário não autenticado.");
    }

    try {
      setLoading(true);
      const dataWithUser = { ...newClientes, usuario_id: user.id };
      const response = await api.post<Clientes>("/clientes", dataWithUser);
      setError(null);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao inserir a Clientes.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { insertClientes, loading, error };
};

// Hook para atualizar uma Clientesexistente
export const useUpdateClientes = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateClientes = async (
    id: string,
    updatedClientes: UpdateClientesInput
  ) => {
    if (!user) {
      setError("Usuário não autenticado.");
      throw new Error("Usuário não autenticado.");
    }

    console.log(id, updatedClientes);

    try {
      setLoading(true);
      const dataToSend = {
        email: updatedClientes.email,
        nome: updatedClientes.nome,
      };

      const response = await api.put(`/clientes/${id}`, dataToSend);
      setError(null);
      console.log(response);
      return response;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };


  return { updateClientes, loading, error };
};

// Hook para deletar uma Clientes
export const useDeleteClientes = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteClientes = async (id: string) => {
    try {
      setLoading(true);
      const response = await api.delete(`/clientes/${id}`);
      console.log(response);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao deletar a Clientes.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteClientes, loading, error };
};
