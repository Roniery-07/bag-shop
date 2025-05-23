import BannerSection from "@/components/BannerSection";
import { ProductSection } from "@/components/ProductSection";

export default function Home() {
  return (
      <div className="flex flex-col ">
        <BannerSection/>

        <section className="bg-neutral-200 py-6 mt-10">
          <h1 className="text-2xl text-center mb-11 font-bold">Ofertas e Lancamentos</h1>
          <ProductSection/>
        </section>

        <section>
          destaques
        </section>

        <footer>
          footer
        </footer>
      </div>
    );
}
