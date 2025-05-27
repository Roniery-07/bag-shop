import { CategoryCard } from "./CategoryCard"

export const CategorySection = () => {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-2 place-items-center place-content-center">
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
    </div>
  )
}
