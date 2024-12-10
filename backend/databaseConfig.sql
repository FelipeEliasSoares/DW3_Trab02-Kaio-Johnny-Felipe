

-- Tabela Motoristas
CREATE TABLE Motoristas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    dataContratacao DATE NOT NULL,
    softDelete BOOLEAN DEFAULT FALSE
);

-- Tabela Veiculos
CREATE TABLE Veiculos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    placa VARCHAR(10) NOT NULL,
    modelo VARCHAR(255) NOT NULL,
    DataAquisicao DATE NOT NULL,
    softDelete BOOLEAN DEFAULT FALSE
);

-- Tabela MotoristasVeiculos (relacionamento entre Motoristas e Veiculos)
CREATE TABLE MotoristasVeiculos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    motoristaID UUID NOT NULL,
    veiculoID UUID NOT NULL,
    softDelete BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (motoristaID) REFERENCES Motoristas(id),
    FOREIGN KEY (veiculoID) REFERENCES Veiculos(id)
);

-- Tabela Clientes
CREATE TABLE Clientes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    dataContratacao DATE NOT NULL,
    softDelete BOOLEAN DEFAULT FALSE
);

-- Criação da tabela usuario com UUID
CREATE TABLE usuario (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
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
    motorisVeiculoId UUID,
    clienteID UUID NOT NULL,
    FOREIGN KEY (motorisVeiculoId) REFERENCES MotoristasVeiculos(id),
    FOREIGN KEY (clienteID) REFERENCES Clientes(id)
);

-- Tabela Login
CREATE TABLE Login (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    login VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    dataCriacao DATE NOT NULL,
    softDelete BOOLEAN DEFAULT FALSE
);

CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO Login (login, senha, dataCriacao, softDelete)
VALUES 
    ('admin', crypt('admin', gen_salt('bf')), CURRENT_DATE, TRUE);


ALTER TABLE veiculos
ALTER COLUMN placa TYPE character varying(50),
ALTER COLUMN modelo TYPE character varying(50);
