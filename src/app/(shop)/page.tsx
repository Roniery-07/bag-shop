'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/context/authContext'
import BannerSection from "@/components/banner-section"
import { ProductSection } from "@/components/product-section-slick"
import { CategorySection } from "@/components/category-section"


export default function Home() {
  const {setUser} = useAuth()
  const [products, setProducts] = useState([])

  useEffect(() => {
    const checkSession = async () => {
    try {
        const res = await fetch('/api/session')
        if (res.ok) {
        const user = await res.json()
        if (user) setUser(user)
        } else {
            setUser(null)
        }
    } catch (e) {
        console.error('Erro ao verificar sessão:', e)
        setUser(null)
      }
    }
    const fetchProducts = async () => {
      const res = await fetch('/api/products')
      if (!res.ok) throw new Error('Erro ao buscar produtos')
      return res.json()
    }
    fetchProducts().then(setProducts).catch(console.error)
    checkSession()
   
  }, [setUser])

  return (
    <div className="flex flex-col ">
      <BannerSection />
      <section className=" bg-pink-300/70 p-10 mt-10 flex justify-center items-center flex-col">
        <h1 className="text-2xl text-center mb-11 font-bold">Ofertas e Lançamentos</h1>
        <ProductSection products={products} itemsPerPage={5} />
      </section>
      <section className="py-6 flex flex-col mx-auto justify-center items-center">
        <h1 className="text-2xl text-center mb-11 font-bold">Categorias</h1>
        <CategorySection />
      </section>
    </div>
  )
}
