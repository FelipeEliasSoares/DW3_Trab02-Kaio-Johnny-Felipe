-- Criação das tabelas do banco de dados

-- Tabela Motoristas
CREATE TABLE Motoristas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    dataContratacao DATE NOT NULL,
    softDelete BOOLEAN DEFAULT FALSE
);

-- Criação da tabela usuario com UUID
CREATE TABLE usuario (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    login VARCHAR(50) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    dataCriacao DATE NOT NULL,
    softDelete BOOLEAN DEFAULT FALSE
);

CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO Login (login, senha, dataCriacao, softDelete)
VALUES 
    ('admin', crypt('admin', gen_salt('bf')), CURRENT_DATE, TRUE);