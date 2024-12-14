import { useState, useEffect, useCallback } from "react";
import api from "../../lib/api";
import {
  Motorista,
  CreateMotoristaInput,
  UpdateMotoristaInput,
  GetAllMotoristasResponse,
  GetMotoristaByIdResponse,
} from "../motoristas/types/types";

import { useAuth } from "../../context/AuthContext";

// Hook para obter todas as Motoristas
export const useGetAllMotoristas = () => {
  const [motoristas, setMotoristas] = useState<Motorista[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMotoristas = async () => {
    try {
      setLoading(true);
      const response = await api.get<GetAllMotoristasResponse>("/motoristas");
      setMotoristas(response.data.motorista);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao carregar Motoristas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMotoristas();
  }, []);

  return { motoristas, loading, error, refetch: fetchMotoristas };
};

// Hook para obter uma Motoristapor ID
export const useGetMotoristaById = (id: string | undefined) => {
  const [Motorista, setMotorista] = useState<Motorista| null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMotorista= useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const response = await api.get<GetMotoristaByIdResponse>(`/motoristas/${id}`);
      if (response.data.motorista) {
        setMotorista(response.data.motorista[0] || null);
      } else {
        setMotorista(null);
      }
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao carregar a Motorista.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMotorista();
  }, [fetchMotorista]);

  return { Motorista, loading, error, refetch: fetchMotorista};
};

export const useInsertMotorista= () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const insertMotorista= async (newMotorista: CreateMotoristaInput) => {
    if (!user) {
      setError("Usuário não autenticado.");
      throw new Error("Usuário não autenticado.");
    }

    try {
      setLoading(true);
      const dataWithUser = { ...newMotorista, usuario_id: user.id };
      const response = await api.post<Motorista>("/motoristas", dataWithUser);
      setError(null);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao inserir a Motorista.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { insertMotorista, loading, error };
};

// Hook para atualizar uma Motoristaexistente
export const useUpdateMotorista= () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateMotorista= async (id: string, updatedMotorista: UpdateMotoristaInput) => {
    if (!user) {
      setError("Usuário não autenticado.");
      throw new Error("Usuário não autenticado.");
    }

    try {
      setLoading(true);
      const dataWithUser = { ...updatedMotorista, usuario_id: user.id };
      const response = await api.put<Motorista>(`/motoristas/${id}`, dataWithUser);
      setError(null);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao atualizar a Motorista.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateMotorista, loading, error };
};

// Hook para deletar uma Motorista
export const useDeleteMotorista= () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteMotorista= async (id: string) => {
    try {
      setLoading(true);
      await api.delete(`/motoristas/${id}`);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao deletar a Motorista.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteMotorista, loading, error };
};
