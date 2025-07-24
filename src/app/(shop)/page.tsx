import BannerSection from "@/components/banner-section";
import { ProductSection} from "@/components/product-section";
import { CategorySection } from "@/components/category-section";
import { ProductRepositoryPrisma } from "@/infrastructure/repositories/product/product.repository.prisma";
import { prisma } from "@/lib/db/prisma";
import { ListProductUsecase } from "@/usecases/product/list-product.usecases";

export default async function Home() {
  console.log("fetching: ")
  const repo = ProductRepositoryPrisma.create(prisma)
  const listProductUsecase = ListProductUsecase.create(repo)

  const products = await listProductUsecase.execute();
  
  console.log(products)

  return (
      <div className="flex flex-col ">
        <BannerSection/>

        <section className="bg-neutral-200 p-10 mt-10 ">
          <h1 className="text-2xl text-center mb-11 font-bold">Ofertas e Lancamentos</h1>
          <ProductSection products={products} itemsPerPage={4}/>
        </section>

        <section className="py-6 flex flex-col mx-auto justify-center items-center">
          <h1 className="text-2xl text-center mb-11 font-bold">Categorias</h1>
          <CategorySection/>
        </section>
      </div>
    );
}
