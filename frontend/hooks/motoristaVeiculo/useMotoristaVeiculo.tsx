import { useState, useEffect, useCallback } from "react";
import api from "../../lib/api";


import { MotoristaVeiculo,GetAllMotoristaVeiculoResponse, GetMotoristaVeiculoByIdResponse, CreateMotoristaVeiculoInput,UpdateMotoristaVeiculoInput,MotoristaVeiculoDetails } from "./types/types";

// Hook para obter todos os MotoristaVeiculos
export const useGetAllMotoristaVeiculos = () => {
  const [motoristaVeiculos, setMotoristaVeiculos] = useState<
    MotoristaVeiculo[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMotoristaVeiculos = async () => {
    try {
      setLoading(true);
      const response = await api.get<GetAllMotoristaVeiculoResponse>(
        "/motoristas-veiculos"
      );
      setMotoristaVeiculos(response.data.registros);
      setError(null);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Erro ao carregar os MotoristaVeiculos."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMotoristaVeiculos();
  }, []);

  return { motoristaVeiculos, loading, error, refetch: fetchMotoristaVeiculos };
};

// Hook para obter um MotoristaVeiculo por ID
export const useGetMotoristaVeiculoById = (id: string | undefined) => {
  const [motoristaVeiculo, setMotoristaVeiculo] =
    useState<MotoristaVeiculoDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMotoristaVeiculo = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const response = await api.get<GetMotoristaVeiculoByIdResponse>(
        `/motoristas-veiculos/${id}`
      );
      setMotoristaVeiculo(response.data.registro);
      setError(null);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Erro ao carregar o MotoristaVeiculo."
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMotoristaVeiculo();
  }, [fetchMotoristaVeiculo]);

  return { motoristaVeiculo, loading, error, refetch: fetchMotoristaVeiculo };
};

// Hook para inserir um MotoristaVeiculo
export const useInsertMotoristaVeiculo = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const insertMotoristaVeiculo = async (
    newMotoristaVeiculo: CreateMotoristaVeiculoInput
  ) => {
    try {
      setLoading(true);
      const response = await api.post<MotoristaVeiculo>(
        "/motoristas-veiculos",
        newMotoristaVeiculo
      );
      setError(null);
      return response.data;
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Erro ao inserir o MotoristaVeiculo."
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { insertMotoristaVeiculo, loading, error };
};

// Hook para atualizar um MotoristaVeiculo
export const useUpdateMotoristaVeiculo = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateMotoristaVeiculo = async (
    id: string,
    updatedMotoristaVeiculo: UpdateMotoristaVeiculoInput
  ) => {
    try {
      setLoading(true);
      const response = await api.put(
        `/motoristas-veiculos/${id}`,
        updatedMotoristaVeiculo
      );
      setError(null);
      return response.data;
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Erro ao atualizar o MotoristaVeiculo."
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateMotoristaVeiculo, loading, error };
};

// Hook para deletar um MotoristaVeiculo
export const useDeleteMotoristaVeiculo = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteMotoristaVeiculo = async (id: string) => {
    try {
      setLoading(true);
      await api.delete(`/motoristas-veiculos/${id}`);
      setError(null);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Erro ao deletar o MotoristaVeiculo."
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteMotoristaVeiculo, loading, error };
};
