import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, LogOut, Plus, Trash2, Upload } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { productos, type Producto, type Variante } from "@/data/catalogo";
import { fotoAjusteUrl, type AjusteProducto } from "@/lib/ajustes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Administración · XUUMIEL" },
      { name: "description", content: "Panel privado para editar productos, precios y fotos de XUUMIEL." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Administración · XUUMIEL" },
      { property: "og:description", content: "Panel privado de XUUMIEL." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCargando(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster />
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Ver la página
          </Link>
          <h1 className="font-display text-xl">Administración XUUMIEL</h1>
          {session ? (
            <Button variant="ghost" size="sm" onClick={() => supabase.auth.signOut()}>
              <LogOut className="h-4 w-4" /> Salir
            </Button>
          ) : (
            <span className="w-16" />
          )}
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-8">
        {cargando ? <p>Cargando…</p> : session ? <Panel userId={session.user.id} /> : <Acceso />}
      </main>
    </div>
  );
}

function Acceso() {
  const [modo, setModo] = useState<"entrar" | "crear" | "olvide">("entrar");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enviando, setEnviando] = useState(false);

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    try {
      if (modo === "entrar") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else if (modo === "crear") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Te enviamos un correo para confirmar la cuenta. Ábrelo y luego entra aquí.");
        setModo("entrar");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast.success("Te enviamos un correo para cambiar la contraseña.");
        setModo("entrar");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "No se pudo completar");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={enviar} className="mx-auto max-w-sm space-y-4 rounded-sm border border-border p-6">
      <h2 className="font-display text-2xl">
        {modo === "entrar" ? "Entrar" : modo === "crear" ? "Crear cuenta de administración" : "Recuperar contraseña"}
      </h2>
      <div className="space-y-2">
        <Label htmlFor="email">Correo</Label>
        <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      {modo !== "olvide" && (
        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
      )}
      <Button type="submit" className="w-full" disabled={enviando}>
        {enviando ? "Un momento…" : modo === "entrar" ? "Entrar" : modo === "crear" ? "Crear cuenta" : "Enviar correo"}
      </Button>
      <div className="flex flex-col gap-1 text-sm">
        {modo !== "entrar" && <button type="button" className="underline" onClick={() => setModo("entrar")}>Ya tengo cuenta</button>}
        {modo === "entrar" && <button type="button" className="underline" onClick={() => setModo("crear")}>Primera vez: crear cuenta</button>}
        {modo === "entrar" && <button type="button" className="underline" onClick={() => setModo("olvide")}>Olvidé mi contraseña</button>}
      </div>
    </form>
  );
}

function Panel({ userId }: { userId: string }) {
  const { data: esAdmin, isLoading } = useQuery({
    queryKey: ["es-admin", userId],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
      if (error) throw error;
      return Boolean(data);
    },
  });
  const { data: ajustes } = useQuery({
    queryKey: ["product-overrides"],
    enabled: esAdmin === true,
    queryFn: async () => {
      const { data, error } = await supabase.from("product_overrides").select("*");
      if (error) throw error;
      return data as unknown as AjusteProducto[];
    },
  });
  const [abierto, setAbierto] = useState<string | null>(null);

  if (isLoading) return <p>Cargando…</p>;
  if (!esAdmin)
    return <p className="text-center">Esta cuenta no tiene permiso de administración.</p>;

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Toca un producto para cambiar su nombre, descripción, precios o foto. Los cambios se ven en la página al guardar.
      </p>
      {productos.map((p) => {
        const a = ajustes?.find((x) => x.id === p.id);
        return (
          <div key={p.id} className="rounded-sm border border-border">
            <button
              type="button"
              className="flex w-full items-center justify-between px-4 py-3 text-left"
              onClick={() => setAbierto(abierto === p.id ? null : p.id)}
            >
              <span>
                {a?.nombre?.trim() || p.nombre}
                {a?.oculto && <span className="ml-2 text-xs text-muted-foreground">(oculto)</span>}
                {a && !a.oculto && <span className="ml-2 text-xs text-primary">(editado)</span>}
              </span>
              <span className="text-sm text-muted-foreground">{abierto === p.id ? "Cerrar" : "Editar"}</span>
            </button>
            {abierto === p.id && <Editor producto={p} ajuste={a} onListo={() => setAbierto(null)} />}
          </div>
        );
      })}
    </div>
  );
}

function Editor({ producto, ajuste, onListo }: { producto: Producto; ajuste?: AjusteProducto | undefined; onListo: () => void }) {
  const qc = useQueryClient();
  const [nombre, setNombre] = useState(ajuste?.nombre ?? producto.nombre);
  const [descripcion, setDescripcion] = useState(ajuste?.descripcion ?? producto.descripcion);
  const [variantes, setVariantes] = useState<Variante[]>(ajuste?.variantes?.length ? ajuste.variantes : producto.variantes);
  const [oculto, setOculto] = useState(ajuste?.oculto ?? false);
  const [imagenPath, setImagenPath] = useState<string | null>(ajuste?.imagen_path ?? null);
  const [guardando, setGuardando] = useState(false);

  const subirFoto = async (file: File) => {
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const path = `${producto.id}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file, { contentType: file.type });
    if (error) { toast.error("No se pudo subir la foto"); return; }
    setImagenPath(path);
    toast.success("Foto lista. Da clic en Guardar.");
  };

  const guardar = async () => {
    if (variantes.some((v) => !v.tamano.trim() || !(v.precio > 0))) {
      { toast.error("Cada presentación necesita tamaño y un precio mayor a 0."); return; }
    }
    setGuardando(true);
    const { error } = await supabase.from("product_overrides").upsert({
      id: producto.id,
      nombre: nombre.trim() === producto.nombre ? null : nombre.trim(),
      descripcion: descripcion === producto.descripcion ? null : descripcion,
      imagen_path: imagenPath,
      oculto,
      variantes: variantes.map((v) => ({ tamano: v.tamano.trim(), precio: Math.round(v.precio) })),
      updated_at: new Date().toISOString(),
    });
    setGuardando(false);
    if (error) { toast.error("No se pudo guardar"); return; }
    await qc.invalidateQueries({ queryKey: ["product-overrides"] });
    toast.success("Guardado");
    onListo();
  };

  const restaurar = async () => {
    if (!ajuste) return onListo();
    if (!confirm("¿Regresar este producto a como estaba originalmente?")) return;
    const { error } = await supabase.from("product_overrides").delete().eq("id", producto.id);
    if (error) { toast.error("No se pudo restaurar"); return; }
    await qc.invalidateQueries({ queryKey: ["product-overrides"] });
    toast.success("Producto restaurado");
    onListo();
  };

  return (
    <div className="space-y-4 border-t border-border px-4 py-4">
      <div className="flex items-start gap-4">
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-sm border border-border bg-muted">
          {imagenPath ? (
            <img src={fotoAjusteUrl(imagenPath)} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full items-center justify-center p-2 text-center text-xs text-muted-foreground">Foto actual de la página</span>
          )}
        </div>
        <div className="space-y-2">
          <Label className="inline-flex cursor-pointer items-center gap-2 rounded-sm border border-border px-3 py-2 text-sm">
            <Upload className="h-4 w-4" /> Cambiar foto
            <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && subirFoto(e.target.files[0])} />
          </Label>
          {imagenPath && (
            <button type="button" className="block text-xs underline" onClick={() => setImagenPath(null)}>
              Usar la foto original
            </button>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label>Nombre</Label>
        <Input value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>Descripción</Label>
        <Textarea rows={4} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>Presentaciones y precios (MXN)</Label>
        {variantes.map((v, i) => (
          <div key={i} className="flex gap-2">
            <Input
              placeholder="Tamaño"
              value={v.tamano}
              onChange={(e) => setVariantes(variantes.map((x, j) => (j === i ? { ...x, tamano: e.target.value } : x)))}
            />
            <Input
              type="number"
              min={1}
              className="w-32"
              value={v.precio}
              onChange={(e) => setVariantes(variantes.map((x, j) => (j === i ? { ...x, precio: Number(e.target.value) } : x)))}
            />
            <Button variant="ghost" size="icon" aria-label="Quitar" disabled={variantes.length === 1}
              onClick={() => setVariantes(variantes.filter((_, j) => j !== i))}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button variant="outline" size="sm" onClick={() => setVariantes([...variantes, { tamano: "", precio: 0 }])}>
          <Plus className="h-4 w-4" /> Agregar presentación
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <Switch id={`oc-${producto.id}`} checked={oculto} onCheckedChange={setOculto} />
        <Label htmlFor={`oc-${producto.id}`}>Ocultar de la página</Label>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button onClick={guardar} disabled={guardando}>{guardando ? "Guardando…" : "Guardar"}</Button>
        <Button variant="outline" onClick={onListo}>Cancelar</Button>
        {ajuste && <Button variant="ghost" onClick={restaurar}>Restaurar original</Button>}
      </div>
    </div>
  );
}
