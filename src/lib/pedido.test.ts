import { describe, expect, it } from "vitest";
import { calcularTotales } from "./pedido";

describe("totales del carrito", () => {
  it("suma envío fijo de $150 a toda la República", () => {
    expect(calcularTotales([{ precio: 210, cantidad: 2 }])).toEqual({ subtotal: 420, envio: 150, total: 570 });
  });
  it("sin productos no cobra envío", () => {
    expect(calcularTotales([]).total).toBe(0);
  });
});
