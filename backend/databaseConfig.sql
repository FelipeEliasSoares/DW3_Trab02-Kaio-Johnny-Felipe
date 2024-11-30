-- Habilitar a extensão pgcrypto
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Criação da tabela usuario com UUID
CREATE TABLE usuario (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    login VARCHAR(50) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    removido BOOLEAN DEFAULT FALSE
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

