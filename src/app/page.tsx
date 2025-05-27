import BannerSection from "@/components/BannerSection";
import { ProductSection } from "@/components/ProductSection";
import { CategorySection } from "@/components/CategorySection";
export default function Home() {
  return (
      <div className="flex flex-col ">
        <BannerSection/>

        <section className="bg-neutral-200 p-10 mt-10 ">
          <h1 className="text-2xl text-center mb-11 font-bold">Ofertas e Lancamentos</h1>
          <ProductSection/>
        </section>

        <section className="py-6 flex flex-col mx-auto justify-center items-center">
          <h1 className="text-2xl text-center mb-11 font-bold">Categorias</h1>
          <CategorySection/>
        </section>

        <footer>
          footer
        </footer>
      </div>
    );
}
