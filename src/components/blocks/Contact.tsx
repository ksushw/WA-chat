'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useStore } from "@/store/store";
import { ArrowLeftIcon } from '@radix-ui/react-icons';

export default function AuthPage({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void } ) {
  const form = useForm({
    defaultValues: { phoneNumber: '' },
  });

  const [error, setError] = useState('');

  const onSubmit = (data: { phoneNumber: string }) => {
    const phoneRegex = /^\+\d{10,15}$/; // Проверка на международный формат +79991234567
    if (!data.phoneNumber || !phoneRegex.test(data.phoneNumber)) {
      setError('Введите корректный номер телефона');
      return;
    }

    const phone = data.phoneNumber.replace(/^\+/, ""); // Убираем + в начале
    useStore.getState().setCurrentChat(phone);
       
    setError('');
    nextStep();
  };

  return (
    <Card className="w-full max-w-sm bg-white shadow-lg rounded-lg">
      <CardContent className="p-6 space-y-4">
      <div className="flex items-center justify-center relative">
      <button
        className="absolute left-[-10px] p-2 rounded-full hover:bg-green-100 transition"
        onClick={prevStep}
      >
        <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
      </button>
      <h2 className="text-xl font-semibold text-gray-800">Вход по номеру телефона</h2>
    </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Номер телефона</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+7XXXXXXXXXX"
                      {...field}
                      type="tel"
                      className="text-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
              Далее
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
