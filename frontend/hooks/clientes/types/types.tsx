export type Clientes = {
  id: string;
  email: string;
  nome: string;
  datacadastro: Date; // Representa a data como objeto Date ao trabalhar no frontend
};

// Define o tipo para a resposta da API ao obter todos os clientes
export type GetAllClientesResponse = {
  status: string;
  clientes: Clientes[]; // A lista de clientes retornada
};

// Define o tipo para a resposta da API ao obter um cliente por ID
export type GetClientesByIdResponse = {
  status: string;
  clientes: Clientes[]; // Um array contendo o cliente solicitado
};

// Define o tipo para a resposta da API ao inserir um cliente
export type InsertClientesResponse = {
  msg: string;
  linhasAfetadas: number; // Número de registros afetados
};

// Define o tipo para a resposta da API ao atualizar um cliente
export type UpdateClientesResponse = {
  msg: string;
  linhasAfetadas: number; // Número de registros afetados
};

// Define o tipo para a resposta da API ao deletar um cliente
export type DeleteClientesResponse = {
  msg: string;
  linhasAfetadas: number; // Número de registros afetados
};

// Tipo para criar um novo cliente (entrada para a API)
export type CreateClientesInput = {
  email: string;
  nome: string;
  datacadastro: string; // Formato esperado pela API: "YYYY-MM-DD"
};

// Tipo para atualizar um cliente existente (entrada para a API)
export type UpdateClientesInput = {
  email?: string; // Opcional, pois nem sempre será atualizado
  nome?: string; // Opcional, pois nem sempre será atualizado
};
