import { createServerFn } from "@tanstack/react-start";

export const validarAcceso = createServerFn({ method: "POST" })
  .inputValidator((data: { codigo: string }) => {
    if (typeof data !== "object" || data === null || typeof (data as { codigo?: unknown }).codigo !== "string") {
      throw new Error("Código inválido");
    }
    return data as { codigo: string };
  })
  .handler(async ({ data }) => {
    // El código vive solo en el servidor; nunca se envía al navegador.
    const CODIGO_ACCESO = "MIEL2026";
    const normalizado = data.codigo.trim().toUpperCase();
    return { ok: normalizado === CODIGO_ACCESO };
  });
