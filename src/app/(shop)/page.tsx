import BannerSection from "@/components/banner-section"
import { ProductSection } from "@/components/product-section-slick"
import { CategorySection } from "@/components/category-section"
import { ProductRepositoryPrisma } from "@/infrastructure/repositories/product/product.repository.prisma"
import { prisma } from "@/lib/db/prisma"
import { ListProductUsecase } from "@/usecases/product/list-product.usecases"


export default async function Home() {

  let products;
  const fetchProducts = async () => {
    const productRepo = ProductRepositoryPrisma.create(prisma)
    const listProductUsecase = ListProductUsecase.create(productRepo)
    products = await listProductUsecase.execute();
  }
  // checkSession()
  await fetchProducts()
   

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
