"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthError } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schemaLoginForm = z.object({
  correo: z.string().min(5).max(30).email(),
  password: z.string().min(3).max(30),
});

type SchemaLoginForm = z.infer<typeof schemaLoginForm>;

const errorForm = (mensaje: string) => {
  return <div className="-mt-3 mb-4 text-red-500 text-sm">{mensaje}</div>;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaLoginForm>({ resolver: zodResolver(schemaLoginForm), shouldUnregister: true });

  const router = useRouter();
  const [supaError, setSupaError] = useState<AuthError>();
  const supabase = createClientComponentClient();

  const handleSignIn = async (data: SchemaLoginForm) => {
    const { error } = await supabase.auth.signInWithPassword({ email: data.correo, password: data.password });
    if (error) {
      console.log(error);
      return setSupaError(error);
    }
    console.log("Logeado");
    router.refresh();
    router.push("/dashboard");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white/60 w-96 py-10 flex flex-col justify-center rounded-3xl shadow-2xl">
        <div className="font-bold text-center text-4xl">Iniciar sesión</div>
        <form className="flex flex-col mt-7 font-bold px-10" onSubmit={handleSubmit(handleSignIn)}>
          Correo
          <input {...register("correo")} className="border border-gray-400 mt-2 mb-4" />
          {errors.correo?.message && errorForm(errors.correo.message)}
          Contraseña
          <input type="password" {...register("password")} className="border border-gray-400 mt-2 mb-4" />
          {errors.password?.message && errorForm(errors.password.message)}
          <button type="submit" className="mt-4 py-2 outline outline-1 outline-green-700 bg-green-200 rounded-lg">
            Iniciar sesión
          </button>
          {supaError && <div className="mt-4 text-red-500 text-sm">{supaError.message}</div>}
        </form>
      </div>
    </div>
  );
}
