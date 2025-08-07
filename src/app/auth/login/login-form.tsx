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
import Link from 'next/link';
import { signInEmailAction } from '@/actions/sign-in-email.actions';
import { useAuth } from '@/lib/context/authContext';
import { useRouter } from 'next/router';

const schema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(6, { message: 'Mín. 6 caracteres' }),
});

type LoginData = z.infer<typeof schema>;

export default function LoginForm() {
  const {setSigned} = useAuth()
  const router = useRouter()
  const form = useForm<LoginData>({
    resolver: zodResolver(schema),
    defaultValues: {email: '', password: '' },
  });

  async function handleSubmit(formData : LoginData){
    const {error} = await signInEmailAction(formData)
    if(!error) {
      setSigned(true)
      router.push("/")
    }
    console.log(error)
  }
  
  return (
    <div className='space-y-6 p-10 rounded-lg w-md flex justify-center shadow-2xl flex-col max-w-sm'>
        <Form {...form}>
        <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full max-w-sm space-y-6"
        >
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

            <Button type="submit" className="w-full  bg-pink-400 text-white font-bold">
            Log in
            </Button>
          
        </form>
        </Form>

      <div className='flex flex-col gap-1'>
            <p className='text-sm p-0 text-center'>Not subscribed yet?</p>

            <Button type="button" className="w-full bg-pink-400 font-bold text-white" >
            <Link href={"/auth/register"}>Register</Link>
            </Button>
      </div>
    </div>
  );
}
