import { useState, useEffect, useCallback } from "react";
import api from "../../lib/api";
import {
  Veiculos,
  CreateVeiculosInput,
  UpdateVeiculosInput,
  GetAllVeiculosResponse,
  GetVeiculosByIdResponse,
} from "../veiculos/types/types";

import { useAuth } from "../../context/AuthContext";

// Hook para obter todas as veiculos
export const useGetAllveiculos = () => {
  const [veiculos, setveiculos] = useState<Veiculos[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchveiculos = async () => {
    try {
      setLoading(true);
      const response = await api.get<GetAllVeiculosResponse>("/veiculos");
      console.log(response);
      setveiculos(response.data.veiculos);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao carregar veiculos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchveiculos();
  }, []);

  return { veiculos, loading, error, refetch: fetchveiculos };
};

// Hook para obter uma Veiculospor ID
export const useGetVeiculosById = (id: string | undefined) => {
  const [veiculos, setVeiculos] = useState<Veiculos | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVeiculos = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const response = await api.get<GetVeiculosByIdResponse>(
        `/veiculos/${id}`
      );
      console.log(response);
      if (response.data.veiculos) {
        setVeiculos(response.data.veiculos[0] || null);
      } else {
        setVeiculos(null);
      }
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao carregar a Veiculos.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchVeiculos();
  }, [fetchVeiculos]);

  return { veiculos, loading, error, refetch: fetchVeiculos };
};

export const useInsertVeiculos = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const insertVeiculos = async (newVeiculos: CreateVeiculosInput) => {
    if (!user) {
      setError("Usuário não autenticado.");
      throw new Error("Usuário não autenticado.");
    }

    try {
      setLoading(true);
      const dataWithUser = { ...newVeiculos, usuario_id: user.id };
      const response = await api.post<Veiculos>("/veiculos", dataWithUser);
      setError(null);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao inserir a Veiculos.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { insertVeiculos, loading, error };
};

// Hook para atualizar uma Veiculosexistente
export const useUpdateVeiculos = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateVeiculos = async (
    id: string,
    updatedVeiculos: UpdateVeiculosInput
  ) => {
    if (!user) {
      setError("Usuário não autenticado.");
      throw new Error("Usuário não autenticado.");
    }

    console.log(id, updatedVeiculos);

    try {
      setLoading(true);
      const dataToSend = {
        placa: updatedVeiculos.placa,
        modelo: updatedVeiculos.modelo,
        DataAquisicao: updatedVeiculos.dataaquisicao,
      };
      const response = await api.put(`/veiculos/${id}`, dataToSend);
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

  return { updateVeiculos, loading, error };
};

// Hook para deletar uma Veiculos
export const useDeleteVeiculos = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteVeiculos = async (id: string) => {
    try {
      setLoading(true);
      const response = await api.delete(`/veiculos/${id}`);
      console.log(response);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao deletar a Veiculos.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteVeiculos, loading, error };
};
