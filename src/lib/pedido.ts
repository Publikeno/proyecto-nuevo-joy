// Envío fijo a toda la República Mexicana.
export const ENVIO_NACIONAL_MXN = 150;

export function calcularTotales(items: { precio: number; cantidad: number }[]) {
  const subtotal = items.reduce((s, i) => s + i.precio * i.cantidad, 0);
  const envio = items.length > 0 ? ENVIO_NACIONAL_MXN : 0;
  return { subtotal, envio, total: subtotal + envio };
}
