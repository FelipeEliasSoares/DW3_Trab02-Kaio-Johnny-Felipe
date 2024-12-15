-- Tabela Motoristas
CREATE TABLE Motoristas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE, -- CPF único
    email VARCHAR(255) NOT NULL UNIQUE, -- Email único
    dataContratacao DATE NOT NULL,
    softDelete BOOLEAN DEFAULT FALSE
);

-- Tabela Veiculos
CREATE TABLE Veiculos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    placa VARCHAR(50) NOT NULL UNIQUE, -- Placa única
    modelo VARCHAR(50) NOT NULL,
    DataAquisicao DATE NOT NULL,
    softDelete BOOLEAN DEFAULT FALSE
);

-- Tabela MotoristasVeiculos (relacionamento entre Motoristas e Veiculos)
CREATE TABLE MotoristasVeiculos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    motoristaID UUID NOT NULL,
    veiculoID UUID NOT NULL,
    softDelete BOOLEAN DEFAULT FALSE,
    UNIQUE (motoristaID, veiculoID), -- Cada motorista só pode estar vinculado a um veículo uma vez
    FOREIGN KEY (motoristaID) REFERENCES Motoristas(id),
    FOREIGN KEY (veiculoID) REFERENCES Veiculos(id)
);

-- Tabela Clientes
CREATE TABLE Clientes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE, -- Email único
    dataContratacao DATE NOT NULL,
    softDelete BOOLEAN DEFAULT FALSE
);

-- Criação da tabela usuario com UUID
CREATE TABLE usuario (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE, -- Email único
    nome VARCHAR(255) NOT NULL,
    dataCadastro DATE NOT NULL,
    softDelete BOOLEAN DEFAULT FALSE
);

-- Tabela Entregas
CREATE TABLE Entregas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    descricao TEXT NOT NULL,
    dataInicio DATE NOT NULL,
    dataEntrega DATE NOT NULL,
    softDelete BOOLEAN DEFAULT FALSE,
    motoristaVeiculoID UUID,
    clienteID UUID NOT NULL,
    FOREIGN KEY (motoristaVeiculoID) REFERENCES MotoristasVeiculos(id),
    FOREIGN KEY (clienteID) REFERENCES Clientes(id)
);

-- Tabela Login
CREATE TABLE Login (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    login VARCHAR(255) NOT NULL UNIQUE, -- Login único
    senha VARCHAR(255) NOT NULL,
    dataCriacao DATE NOT NULL,
    softDelete BOOLEAN DEFAULT FALSE
);

-- Extensão pgcrypto para criptografia de senha
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Inserção de usuário admin
INSERT INTO Login (login, senha, dataCriacao, softDelete)
VALUES 
    ('admin', crypt('admin', gen_salt('bf')), CURRENT_DATE, TRUE);

-- Alterações adicionais para garantir consistência
ALTER TABLE veiculos
ALTER COLUMN placa TYPE VARCHAR(50),
ALTER COLUMN modelo TYPE VARCHAR(50);
