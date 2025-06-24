import BannerSection from "@/components/BannerSection";
import { ProductSection} from "@/components/ProductSection";
import { CategorySection } from "@/components/CategorySection";
import { Product } from "@/types/product";

const products : Product[] = [
  {
    id: "1",
    name: "Mala Pequena de Bordo 10kg Rígida Rodas Giro 360° Verona Stradda",
    price: 104.99
  },
  {
    id: "2",
    name: "Mala Pequena de Bordo 10kg Rígida Rodas Giro 360° Verona Stradda",
    price: 104.99
  },
  {
    id: "3",
    name: "Mala Pequena de Bordo 10kg Rígida Rodas Giro 360° Verona Stradda",
    price: 104.99
  },
  {
    id: "4",
    name: "Mala Pequena de Bordo 10kg Rígida Rodas Giro 360° Verona Stradda",
    price: 104.99
  },
  {
    id: "5",
    name: "Mala Pequena de Bordo 10kg Rígida Rodas Giro 360° Verona Stradda",
    price: 104.99
  },
  {
    id: "6",
    name: "Mala Pequena de Bordo 10kg Rígida Rodas Giro 360° Verona Stradda",
    price: 104.99
  },
  {
    id: "7",
    name: "Mala Pequena de Bordo 10kg Rígida Rodas Giro 360° Verona Stradda",
    price: 104.99
  },
  {
    id: "8",
    name: "Mala Pequena de Bordo 10kg Rígida Rodas Giro 360° Verona Stradda",
    price: 104.99
  }

]


export default function Home() {
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

        <footer>
          footer
        </footer>
      </div>
    );
}
