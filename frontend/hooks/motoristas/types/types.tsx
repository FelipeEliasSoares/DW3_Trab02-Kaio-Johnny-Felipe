export type Motorista = {
    id: string;
    nome: string;
    cpf: string;
    email: string;
    datacontratacao: Date;
};

// Define the type for the API response when getting all Motoristas
export type GetAllMotoristasResponse = {
    status: string;
    motoristas: Motorista[];
}

// Define the type for the API response when getting a Motorista by ID
export type GetMotoristaByIdResponse = {
    status: string;
    motorista: Motorista[];
}

// Define the type for the API response when inserting a new Motorista
export type InsertMotoristaResponse = {
    msg: string;
    linhasAfetadas: number;
};

// Define the type for the API response when updating a Motorista
export type UpdateMotoristaResponse = {
    msg: string;
    linhasAfetadas: number;
};

// Define the type for the API response when deleting a Motorista
export type DeleteMotoristaResponse = {
    msg: string;
    linhasAfetadas: number;
};

export type CreateMotoristaInput = {
    nome: string;
    cpf: string;
    email: string;
    dataContratacao: string;
};

export type UpdateMotoristaInput = {
    nome?: string;
};
