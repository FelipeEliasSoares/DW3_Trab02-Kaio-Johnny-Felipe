export type MotoristaVeiculo = {
  id: string;
  motorista_id: string;
  veiculo_id: string;
  motorista_nome: string;
  motorista_cpf: string;
  veiculo_placa: string;
  veiculo_modelo: string;
  softDelete: boolean;
};

export type MotoristaVeiculoDetails = {
  id: string;
  motoristaid: string; // ID do motorista associado
  veiculoid: string; // ID do veículo associado
  softdelete: boolean; // Status de soft delete
  motorista_nome: string; // Nome do motorista
  motorista_cpf: string; // CPF do motorista
  veiculo_placa: string; // Placa do veículo
  veiculo_modelo: string; // Modelo do veículo
};


export type GetAllMotoristaVeiculoResponse = {
  status: string;
  registros: MotoristaVeiculo[];
};

export type GetMotoristaVeiculoByIdResponse = {
  status: string;
  registro: MotoristaVeiculoDetails; // Registro com detalhes completos
};


export type CreateMotoristaVeiculoInput = {
  motoristaID: string;
  veiculoID: string;
};

export type UpdateMotoristaVeiculoInput = {
  motoristaID?: string;
  veiculoID?: string;
};
