export type Entrega = {
  id: string;
  descricao: string;
  datainicio: Date;
  dataentrega: Date;
  motorisveiculoid: string;
  clienteid: string;
  cliente_nome: string;
  softDelete: boolean;
};

export type EntregaDetails = {
  id: string;
  descricao: string;
  datainicio: Date;
  dataentrega: Date;
  motorisveiculoid: string;
  clienteid: string;
  cliente_nome: string;
  softDelete: boolean;
};

export type GetAllEntregasResponse = {
  status: string;
  registros: Entrega[];
};

export type GetEntregaByIdResponse = {
  status: string;
  registro: EntregaDetails;
};

export type CreateEntregaInput = {
  descricao: string;
  dataInicio: string;
  dataEntrega: string;
  motorisVeiculoId: string;
  clienteID: string;
};

export type UpdateEntregaInput = {
  descricao?: string;
  dataInicio?: Date | string;
  dataEntrega?: Date | string;
  motorisVeiculoId?: string;
  clienteID?: string;
};
