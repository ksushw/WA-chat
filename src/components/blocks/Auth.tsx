'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { setCookie } from 'cookies-next';
import { useState } from 'react';

export default function AuthPage({ nextStep }: { nextStep: () => void }) {
  const form = useForm({
    defaultValues: { idInstance: '', apiToken: '' },
  });

  const [error, setError] = useState('');

  const onSubmit = (data: { idInstance: string; apiToken: string }) => {
    if (!data.idInstance || !data.apiToken) {
      setError('Заполните оба поля');
      return;
    }

    setCookie('idInstance', data.idInstance, { path: '/' });
    setCookie('apiToken', data.apiToken, { path: '/' });

    setError('');
    nextStep();
  };

  return (

      <Card className="w-full max-w-sm bg-white shadow-lg rounded-lg">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-center text-gray-800">
            Авторизация
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="idInstance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID Instance</FormLabel>
                    <FormControl>
                      <Input placeholder="Введите idInstance" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
              name="apiToken"
              
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>API Token</FormLabel>
                    <FormControl>
                      <Input placeholder="Введите apiToken" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
                Войти
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
  );
}
