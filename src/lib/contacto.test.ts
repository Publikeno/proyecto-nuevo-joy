import { describe, expect, it } from "vitest";
import { textos } from "@/data/ui-copy";

describe("contacto", () => {
  it("pone el WhatsApp general para tod@s, nacional e internacional", () => {
    expect(textos.es.whatsapp).toContain("+52 998 407 0222");
    expect(textos.es.whatsapp).toContain("nacional e internacional");
    expect(textos.en.whatsapp).toContain("+52 998 407 0222");
    expect(textos.en.whatsapp).toContain("national and international");
  });

  it("mantiene a Katy y Yair en ese orden con sus números", () => {
    expect(textos.es.contactPhones.map((f) => f.name)).toEqual(["Katy", "Yair"]);
    expect(textos.es.contactPhones.map((f) => f.wa)).toEqual(["529984190382", "529984767605"]);
    expect(textos.es.contactZone).toBe("Atención y entregas en Cancún.");
  });
});
