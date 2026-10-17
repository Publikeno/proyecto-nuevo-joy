import { describe, expect, it } from "vitest";
import { lunesDe, resumenVisitas, type Dia } from "./estadisticas";

// Datos reales del registro de visitas de la página (17 de octubre de 2026).
const DIAS: Dia[] = [
  { dia: "2026-10-04", visitas: 1 },
  { dia: "2026-10-05", visitas: 9 },
  { dia: "2026-10-06", visitas: 3 },
  { dia: "2026-10-07", visitas: 6 },
  { dia: "2026-10-08", visitas: 11 },
  { dia: "2026-10-09", visitas: 6 },
  { dia: "2026-10-10", visitas: 1 },
  { dia: "2026-10-12", visitas: 3 },
  { dia: "2026-10-13", visitas: 1 },
  { dia: "2026-10-14", visitas: 2 },
  { dia: "2026-10-15", visitas: 5 },
  { dia: "2026-10-16", visitas: 4 },
  { dia: "2026-10-17", visitas: 1 },
];

const HOY = new Date(2026, 9, 17, 15, 4, 0); // sábado 17 de octubre de 2026

describe("resumenVisitas", () => {
  it("cuenta la semana desde el lunes (12-17 oct = 16)", () => {
    expect(resumenVisitas(DIAS, HOY).estaSemana).toBe(16);
  });

  it("suma los últimos 7 días incluyendo hoy (11-17 oct = 16)", () => {
    expect(resumenVisitas(DIAS, HOY).ultimos7).toBe(16);
  });

  it("agrupa por semana de lunes a domingo", () => {
    const r = resumenVisitas(DIAS, HOY);
    expect(r.semanas[0].lunes).toEqual(new Date(2026, 9, 12));
    expect(r.semanas[0].visitas).toBe(16);
    expect(r.semanas[1].lunes).toEqual(new Date(2026, 9, 5));
    expect(r.semanas[1].visitas).toBe(36);
    expect(r.semanas[4].lunes).toEqual(new Date(2026, 8, 14));
    expect(r.semanas[4].visitas).toBe(0);
  });

  it("lista 14 días terminando en hoy y pone cero donde no hubo visitas", () => {
    const r = resumenVisitas(DIAS, HOY);
    expect(r.dias).toHaveLength(14);
    expect(r.dias[0].dia ?? r.dias[0].fecha).toEqual(new Date(2026, 9, 17));
    expect(r.dias[0].visitas).toBe(1);
    expect(r.dias[6].fecha).toEqual(new Date(2026, 9, 11)); // domingo sin visitas
    expect(r.dias[6].visitas).toBe(0);
    expect(r.dias[13].fecha).toEqual(new Date(2026, 9, 4));
    expect(r.dias[13].visitas).toBe(1);
    expect(r.maxDia).toBe(11);
  });

  it("la semana de un domingo empieza el lunes anterior", () => {
    expect(lunesDe(new Date(2026, 9, 18))).toEqual(new Date(2026, 9, 12));
    expect(lunesDe(new Date(2026, 9, 12))).toEqual(new Date(2026, 9, 12));
  });
});
