//* Importando o custom hook useAuth
import { useAuth } from "../context/AuthContext";

//* Importando o hook useRouter do next para redirecionar o usuário
import { useRouter } from "next/router";

//* Importando o hook useEffect do React
import { useEffect } from "react";

export function withAuth(Component: React.ComponentType) {
  return function AuthenticatedComponent(
    props: React.ComponentProps<typeof Component>
  ) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/");
      }
    }, [user, loading, router]);

    if (loading || !user) {
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

    return <Component {...props} />;
  };
}
