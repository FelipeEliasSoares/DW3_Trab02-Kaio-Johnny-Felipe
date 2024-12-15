export function formatCPF(value: string): string {
  const cpf = value.replace(/\D/g, "").slice(0, 11); // Remove caracteres não numéricos e limita a 11 dígitos
  return cpf
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Aplica a máscara
}
