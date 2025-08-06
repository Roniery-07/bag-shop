"use client"
import React from 'react';
import Link from 'next/link';
import { ShoppingBag, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/context/authContext';



const Navbar: React.FC = () => {
    const {signed} = useAuth()

    return (
    <nav className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 md:px-16 py-4 bg-pink-200 ">
        <ul className="hidden md:flex gap-6 font-medium text-pink-800">
          <Link href={"/"}><li className="hover:text-pink-600 cursor-pointer">Início</li></Link>
          <li className="hover:text-pink-600 cursor-pointer">Coleções</li>
          <li className="hover:text-pink-600 cursor-pointer">Categorias</li>
          <li className="hover:text-pink-600 cursor-pointer">Contato</li>
        </ul>
        <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Buscar bolsas..."
            className="px-4 py-2 rounded-xl w-full md:w-64 text-sm text-brown-900 focus:outline-none"
          />
					{(signed) ? 
						(
							<button className="bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600 w-full md:w-auto">
								<div className='flex gap-2 justify-center items-center' >
									<p className='text-sm text-center '>Log Out</p>
									<LogOut/>
								</div>
							</button>

						)	:
						(

							<Link
								href="/auth/login"
								className="bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600 w-full md:w-auto flex gap-2 justify-center items-center"
							>
								<p className="text-sm text-center">Log In</p>
								<LogIn />
							</Link>
						)
					}

					<Link
						href="/"
						className="bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600 w-full md:w-auto flex gap-2 justify-center items-center"
					>
						<ShoppingBag />
					</Link>	
        </div>
      </nav>
    );  
};

export default Navbar;