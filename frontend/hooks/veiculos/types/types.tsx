export type Veiculos = {
  id: string;
  placa: string;
  modelo: string
  dataaquisicao: Date;
};

// Define the type for the API response when getting all Veiculoss
export type GetAllVeiculosResponse = {
  status: string;
  veiculos: Veiculos[];
};

// Define the type for the API response when getting a Veiculos by ID
export type GetVeiculosByIdResponse = {
  status: string;
  veiculos: Veiculos[];
};

// Define the type for the API response when inserting a new Veiculos
export type InsertVeiculosResponse = {
  msg: string;
  linhasAfetadas: number;
};

// Define the type for the API response when updating a Veiculos
export type UpdateVeiculosResponse = {
  msg: string;
  linhasAfetadas: number;
};

// Define the type for the API response when deleting a Veiculos
export type DeleteVeiculosResponse = {
  msg: string;
  linhasAfetadas: number;
};

export type CreateVeiculosInput = {
  placa: string;
  modelo: string;
  DataAquisicao: Date;
};

export type UpdateVeiculosInput = {
  placa?: string;
  modelo?: string;
  dataaquisicao?: Date;
};
