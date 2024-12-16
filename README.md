# Transportadora - Sistema de Gerenciamento

Este projeto implementa um sistema de gerenciamento para uma transportadora com foco no banco de dados PostgreSQL, que organiza motoristas, veículos, clientes, entregas e credenciais de acesso.

---

## 📊 Banco de Dados

### Estrutura das Tabelas

#### Motoristas
Armazena informações dos motoristas.
```sql
CREATE TABLE Motoristas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(255) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    dataContratacao DATE NOT NULL,
    softDelete BOOLEAN DEFAULT FALSE
);
```

#### Veículos
Gerencia os dados dos veículos da frota.
```sql
CREATE TABLE Veiculos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    placa VARCHAR(10) NOT NULL,
    modelo VARCHAR(255) NOT NULL,
    DataAquisicao DATE NOT NULL,
    softDelete BOOLEAN DEFAULT FALSE
);
```

#### MotoristasVeiculos
Relaciona motoristas aos veículos que utilizam.
```sql
CREATE TABLE MotoristasVeiculos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    motoristaID UUID NOT NULL,
    veiculoID UUID NOT NULL,
    softDelete BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (motoristaID) REFERENCES Motoristas(id),
    FOREIGN KEY (veiculoID) REFERENCES Veiculos(id)
);
```

#### Clientes
Armazena informações sobre os clientes.
```sql
CREATE TABLE Clientes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    dataCadastro DATE NOT NULL,
    softDelete BOOLEAN DEFAULT FALSE
);
```

#### Entregas
Monitora as entregas realizadas pela transportadora.
```sql
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
```

#### Login
Gerencia as credenciais dos usuários do sistema.
```sql
CREATE TABLE Login (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    login VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    dataCriacao DATE NOT NULL,
    softDelete BOOLEAN DEFAULT FALSE
);
```

#### Extensão Necessária
Ative a extensão `pgcrypto` para suporte a UUIDs:
```sql
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

---

## 💡 Funcionalidades

- **Motoristas, Veículos, Clientes:** Cadastro, edição, exclusão (soft delete).
- **Entregas:** Gerenciamento completo, incluindo vínculo entre motoristas, veículos e clientes.
- **Autenticação:** Login e controle de acesso com credenciais armazenadas no banco.

---

## 🌐 Licença
Licenciado sob a **MIT License**.

