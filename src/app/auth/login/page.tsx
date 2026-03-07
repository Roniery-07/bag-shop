import { Suspense } from 'react';

import LoginForm from '@/app/auth/login/login-form';

interface LoginPageProgps {
  params: { callbackUrl: string };
}
export default async function LoginPage({ params }: LoginPageProgps) {
  const p = await params;
  console.log(p.callbackUrl);
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-y-10 ">
      <h1 className="text-lg font-bold">Login</h1>
      <Suspense>
        <LoginForm callbackUrl={p.callbackUrl} />
      </Suspense>
    </div>
  );
}
