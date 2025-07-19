import LoginForm from "@/components/LoginForm/page";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-y-10 ">
        <h1 className="text-lg font-bold">
            Login
        </h1>
        <Suspense>
            <LoginForm/>
        </Suspense>
    </div>
  );
}
