// Função para formatar username removendo caracteres especiais, acentos e espaços
export function createSlug(username) {
  return username
    .trim() // remove espaços do início/fim
    .normalize('NFD') // decompõe acentos
    .replace(/[\u0000-\u001f\u007f-\u009f]/g, '') // remove caracteres de controle
    .replace(/[^\w\s-]/g, '') // remove caracteres especiais exceto underline, espaço e hifen
    .replace(/[\s_]+/g, '-') // substitui espaços e underlines por hifen
    .replace(/-+/g, '-') // evita múltiplos hifens
    .replace(/^-+|-+$/g, '') // remove hifens do início/fim
    .toLowerCase();
}
