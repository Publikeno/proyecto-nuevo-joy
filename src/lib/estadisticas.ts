// Reglas del panel de Estadísticas: semanas de lunes a domingo y días sin visitas contados como cero.

export type Dia = { dia: string; visitas: number };

export const parsear = (s: string) => {
  const [a = 1970, m = 1, d = 1] = s.split("-").map(Number);
  return new Date(a, m - 1, d);
};

export const clave = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const lunesDe = (d: Date) => {
  const x = new Date(d);
  x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
  return x;
};

export const sumar = (filas: Dia[], desde: Date, hasta: Date) =>
  filas
    .filter((f) => {
      const d = parsear(f.dia);
      return d >= desde && d < hasta;
    })
    .reduce((acc, f) => acc + f.visitas, 0);

export const etiquetaCorta = (d: Date) =>
  new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "short" }).format(d).replace(".", "");

export type Resumen = {
  estaSemana: number;
  ultimos7: number;
  dias: { fecha: Date; visitas: number }[];
  semanas: { lunes: Date; visitas: number }[];
  maxDia: number;
};

export const resumenVisitas = (filas: Dia[], ahora: Date = new Date()): Resumen => {
  const hoy = new Date(ahora);
  hoy.setHours(0, 0, 0, 0);
  const lunes = lunesDe(hoy);

  const mapa = new Map(filas.map((f) => [f.dia, f.visitas]));
  const dias = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(hoy);
    d.setDate(d.getDate() - i);
    return { fecha: d, visitas: mapa.get(clave(d)) ?? 0 };
  });

  const semanas = Array.from({ length: 5 }, (_, i) => {
    const desde = new Date(lunes);
    desde.setDate(desde.getDate() - i * 7);
    const hasta = new Date(desde);
    hasta.setDate(hasta.getDate() + 7);
    return { lunes: desde, visitas: sumar(filas, desde, hasta) };
  });

  const hace7 = new Date(hoy);
  hace7.setDate(hace7.getDate() - 6);
  const manana = new Date(hoy);
  manana.setDate(manana.getDate() + 1);

  return {
    estaSemana: semanas[0]?.visitas ?? 0,
    ultimos7: sumar(filas, hace7, manana),
    dias,
    semanas,
    maxDia: Math.max(1, ...dias.map((d) => d.visitas)),
  };
};
