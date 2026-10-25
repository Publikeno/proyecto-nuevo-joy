import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Nueva contraseña · XUUMIEL" },
      { name: "description", content: "Cambia la contraseña del panel de XUUMIEL." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Nueva contraseña · XUUMIEL" },
      { property: "og:description", content: "Cambia la contraseña del panel de XUUMIEL." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) return toast.error(error.message);
    toast.success("Contraseña cambiada");
    navigate({ to: "/admin", replace: true });
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <Toaster />
      <form onSubmit={enviar} className="w-full max-w-sm space-y-4 rounded-sm border border-border p-6">
        <h1 className="font-display text-2xl">Nueva contraseña</h1>
        <div className="space-y-2">
          <Label htmlFor="pw">Contraseña nueva</Label>
          <Input id="pw" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button type="submit" className="w-full">Guardar</Button>
      </form>
    </main>
  );
}
