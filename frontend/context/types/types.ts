//* Definindo os tipos de dados que serão utilizados
export type User = {
  login: string;
  email: string;
  id: string;
};

//* Definindo o tipo do contexto de autenticação
export type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (login: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
};
