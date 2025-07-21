'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField, 
  FormItem, 
  FormLabel,
  FormControl, 
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';

const schema = z.object({
  name: z.string().min(4, {message: 'Mín. 4 caracteres'}),
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(6, { message: 'Mín. 6 caracteres' }),
});

type LoginData = z.infer<typeof schema>;

export default function LoginForm() {

  const form = useForm<LoginData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const onSubmit = (data: LoginData) => {
    console.log('Login OK', data);
  };

  return (
    <div className='py-10 rounded-lg w-md flex justify-center shadow-2xl'>
        <Form {...form}>
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-sm space-y-6"
        >
            <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                  type='text'
                  placeholder='Your name'
                  {...field}
                  className='focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0'
                  />

                </FormControl>
              </FormItem> 
            )}
            />
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                    className='focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0'
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
                <FormItem >
                <FormLabel>Password</FormLabel>
                <FormControl>
                    <Input
                    type="password"
                    placeholder="******"
                    {...field}
                    className='focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0'
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <Button type="submit" className="w-full bg-green-300">
            Log in
            </Button>
        </form>
        </Form>
    </div>
  );
}
