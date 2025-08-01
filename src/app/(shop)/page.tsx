'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/context/authContext'
import BannerSection from "@/components/banner-section"
import { ProductSection } from "@/components/product-section"
import { CategorySection } from "@/components/category-section"


export default function Home() {
  const {setSigned} = useAuth()
  const [products, setProducts] = useState([])

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/session')
        if (res.ok) {
          const session = await res.json()
          console.log(session)
          if (session) {
            console.log("setando session true")
            setSigned(true)
          }
        } else {
          console.log("setando session false")

          setSigned(false)
        }
      } catch (e) {
        console.error('Erro ao verificar sessão:', e)
        setSigned(false)
      }
    }


    const fetchProducts = async () => {
      const res = await fetch('/api/products')
      if (!res.ok) throw new Error('Erro ao buscar produtos')
      return res.json()
    }
    fetchProducts().then(setProducts).catch(console.error)
    checkSession()
    
  }, [setSigned])

  return (
    <div className="flex flex-col ">
      <BannerSection />
      <section className="bg-neutral-200 p-10 mt-10 ">
        <h1 className="text-2xl text-center mb-11 font-bold">Ofertas e Lançamentos</h1>
        <ProductSection products={products} itemsPerPage={4} />
      </section>
      <section className="py-6 flex flex-col mx-auto justify-center items-center">
        <h1 className="text-2xl text-center mb-11 font-bold">Categorias</h1>
        <CategorySection />
      </section>
    </div>
  )
}
