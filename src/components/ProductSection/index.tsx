import { ProductItem } from "../ProductCard"

export const ProductSection = () => {
  return (
    <div className="h-72 flex flex-row gap-4 px-16">
        {[1, 2, 3, 4, 5].map(item => 
            <ProductItem key={item}/>
        )}
        
    </div>
  )
}
