"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormProvider, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button";

import type { AppProps } from "next/app";
import { useState } from "react";
// import AuthPage from "@/components/AuthPage";
import AuthPage from "@/components/blocks/Auth";
import  Chat  from "@/components/blocks/Chat";


export default function Home() {

  const form = useForm({
    defaultValues: { idInstance: "" },
  });

  const onSubmit = (data: any) => {
    // console.log("Form Data:", data);
  };
  console.log('parentRerender');

  const [step, setStep] = useState<"login" | "contact" | "chat">("login");

  return (
    <div className="h-[100%] p-2 s:p-10 font-[family-name:var(--font-geist-sans)] bg-neutral-300" >
      <main className="flex flex-col w-[100%] h-[100%] justify-center   items-center">
      {step === "login" && <AuthPage nextStep={() => setStep("chat")} />}
        {/* {step === "contact" && <ContactPage nextStep={() => setStep("chat")} />} */}
        {step === "chat" && <Chat />}
      </main>
      
    </div>
  );
}



