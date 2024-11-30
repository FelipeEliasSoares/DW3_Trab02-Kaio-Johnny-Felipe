//* use client para importar módulos do lado do cliente
"use client";

//* Importando os hooks necessários do react
import { useState, useEffect } from "react";

//* Importando o hook para autenticação
import { useAuth } from "../context/AuthContext";

//* Importando os componentes de UI da shadcn/ui
import { Card, CardHeader, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

//* Importando os ícones da lucide-react
import {
  Eye,
  EyeOff,
  LogIn,
  Lock,
  User,
  ChevronRight,
  Code,
  Database,
  Server,
} from "lucide-react";

//* Importando o hook useRouter do next para redirecionar o usuário
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, login, loading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "admin",
    password: "admin",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  // Redireciona o usuário autenticado para /dashboard
  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  const features = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Felipe - Frontend",
      color: "from-gray-900 to-gray-800",
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Kaio - Backend",
      color: "from-black to-gray-900",
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: "Johnny - Backend",
      color: "from-gray-950 to-black",
    },
  ];

  // Animação de transição de características
  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [features.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(formData.email, formData.password);
      router.push("/dashboard"); // Redireciona após login bem-sucedido
    } catch (err:any) {
      setError("Credenciais inválidas. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-black via-gray-900 to-gray-800">
        <div className="relative">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-4 border-t-gray-500 border-r-gray-500 border-b-transparent border-l-transparent w-16 h-16 animate-spin" />

          {/* Inner rotating ring */}
          <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-transparent border-b-gray-700 border-l-gray-700 w-12 h-12 animate-spin-reverse" />

          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
        </div>

        {/* Loading text */}
        <div className="mt-8 text-white space-y-2 text-center">
          <h2 className="text-xl font-semibold animate-pulse">Carregando</h2>
          <p className="text-sm text-gray-400">Por favor, aguarde...</p>
        </div>

        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-gray-800 to-transparent rounded-full opacity-20 animate-pulse" />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-tl from-gray-800 to-transparent rounded-full opacity-20 animate-pulse delay-300" />
        </div>
      </div>
    );
  }

  // Evita que o formulário de login apareça para usuários autenticados
  if (user) {
    return null;
  }

  return (
    <div
      className={`flex min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-black via-gray-900 to-gray-800 transition-opacity duration-1000 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Left side - Hero Content */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 text-white">
        <div className="mb-auto">
          <h1 className="text-5xl font-bold mb-8 leading-tight animate-fade-in">
            Transportadora KJF
          </h1>

          {/* Animated Features */}
          <div className="space-y-6 mt-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`transform transition-all duration-500 flex items-center space-x-4 p-4 rounded-xl backdrop-blur-sm 
                  ${
                    activeFeature === index
                      ? `bg-gradient-to-r ${feature.color} bg-opacity-20 translate-x-0 opacity-100`
                      : "bg-white/5 -translate-x-4 opacity-50"
                  }`}
              >
                <div className="p-2 bg-white/10 rounded-lg">{feature.icon}</div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-sm text-gray-400 mt-8">
          © 2024 Desenvolvido por Felipe, Kaio e Johnny
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex items-center justify-center w-full lg:w-1/2 px-6 py-8">
        <Card className="w-full max-w-md bg-black/80 backdrop-blur-xl shadow-2xl rounded-3xl border-0 transition-transform duration-300 hover:scale-[1.01]">
          <CardHeader className="space-y-4 pb-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-tr from-gray-900 to-black rounded-2xl flex items-center justify-center shadow-lg transform -translate-y-12">
                <LogIn className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="text-center pt-2">
              <h2 className="text-3xl font-bold text-white">Bem-vindo</h2>
              <p className="text-gray-400 mt-2">
                Acesse sua conta para continuar
              </p>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Usuário
                </label>
                <div className="relative group">
                  <Input
                    type="text"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="h-12 px-4 bg-gray-900/50 border-gray-700 text-white rounded-xl focus:ring-gray-600 focus:border-gray-600 transition-all duration-300 group-hover:border-gray-500"
                    placeholder="Digite seu usuário"
                  />
                  <div className="absolute inset-0 rounded-xl border border-gray-700 group-hover:border-gray-500 pointer-events-none transition-colors duration-300" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Senha
                </label>
                <div className="relative group">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="h-12 px-4 bg-gray-900/50 border-gray-700 text-white rounded-xl focus:ring-gray-600 focus:border-gray-600 pr-12 transition-all duration-300 group-hover:border-gray-500"
                    placeholder="Digite sua senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  <div className="absolute inset-0 rounded-xl border border-gray-700 group-hover:border-gray-500 pointer-events-none transition-colors duration-300" />
                </div>
              </div>

              {error && (
                <div className="px-4 py-3 text-sm text-red-400 bg-red-900/50 rounded-xl border border-red-800 flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                  <span>{error}</span>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                    <span>Autenticando...</span>
                  </div>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Entrar <ChevronRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
