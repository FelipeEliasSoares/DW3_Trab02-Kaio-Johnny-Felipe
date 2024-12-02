-- Habilitar a extensão pgcrypto
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Criação da tabela usuario com UUID
CREATE TABLE usuario (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
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

-- Inserção de dados na tabela usuario com senha criptografada
INSERT INTO usuario (email, login, senha)
VALUES 
    ('admin@example.com', 'admin', crypt('admin', gen_salt('bf')))  -- senha criptografada com bcrypt
ON CONFLICT DO NOTHING;

-- Criação da tabela conta com UUID
CREATE TABLE conta (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    valor NUMERIC(10, 2) NOT NULL,
    data DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    forma_pagamento VARCHAR(50) NOT NULL,
    usuario_id UUID NOT NULL, 
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

