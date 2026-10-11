import { describe, expect, it } from "vitest";
import { calcularTotales } from "./pedido";

describe("totales del carrito", () => {
  it("suma envío de $150 cuando el cliente lo pide", () => {
    expect(calcularTotales([{ precio: 210, cantidad: 2 }], true)).toEqual({ subtotal: 420, envio: 150, total: 570 });
  });
  it("no cobra envío cuando el cliente lo quita", () => {
    expect(calcularTotales([{ precio: 210, cantidad: 2 }], false)).toEqual({ subtotal: 420, envio: 0, total: 420 });
  });
  it("sin productos no cobra envío", () => {
    expect(calcularTotales([]).total).toBe(0);
  });
});
