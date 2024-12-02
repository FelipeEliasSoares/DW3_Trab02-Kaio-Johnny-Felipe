-- Habilitar a extensão pgcrypto
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Criação da tabela usuario com UUID
CREATE TABLE usuario (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
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

-- Inserção de dados na tabela usuario com senha criptografada
INSERT INTO usuario (email, login, senha)
VALUES 
    ('admin', crypt('admin', gen_salt('bf')), CURRENT_DATE, TRUE);