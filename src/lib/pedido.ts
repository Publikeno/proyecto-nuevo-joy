// Envío a toda la República Mexicana: $150 fijos, opcional en el carrito.
export const ENVIO_NACIONAL_MXN = 150;

export function calcularTotales(items: { precio: number; cantidad: number }[], conEnvio: boolean = true) {
  const subtotal = items.reduce((s, i) => s + i.precio * i.cantidad, 0);
  const envio = conEnvio && items.length > 0 ? ENVIO_NACIONAL_MXN : 0;
  return { subtotal, envio, total: subtotal + envio };
}
