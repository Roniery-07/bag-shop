import React, { Suspense } from 'react'
import RegisterForm from './register-form'

const RegisterPage = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-y-10 ">
        <h1 className="text-lg font-bold">
            Register
        </h1>
        <Suspense>
            <RegisterForm/>
        </Suspense>
    </div>
  )
}

export default RegisterPage
