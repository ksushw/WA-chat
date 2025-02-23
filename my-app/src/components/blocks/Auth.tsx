import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
import { Button } from '@/components/ui/button';

export default function AuthPage({ nextStep }: { nextStep: () => void }) {
  const form = useForm({
    defaultValues: { idInstance: '' },
  });

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
  };

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="idInstance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Авторизация</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>Введите idInstance</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" onClick={nextStep} className="bg-accent">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
