/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductImages` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductImages" DROP CONSTRAINT "ProductImages_productId_fkey";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "ProductImages";

-- CreateTable
CREATE TABLE "products" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_images" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "order" INTEGER,
    "productId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- This is an empty migration.
-- ▸ 1. Inserir os produtos
INSERT INTO products (name, price, description, quantity)
VALUES 
  ('Green Suede Oxford',          129.90, 'Stylish teal suede oxford shoe with brogue detailing', 0),
  ('Black Nike Air Sneaker',      199.90, 'Lightweight black running sneaker with reflective swoosh', 0),
  ('Red Nike Flyknit Trainer',    249.90, 'Red Nike Flyknit trainer with flexible sole', 0),
  ('Minimalist Silver Smartwatch',299.90, 'Sleek silver smartwatch with white strap', 0),
  ('Bioglow Makeup Set',           59.90, 'Orange Bioglow serum and illuminating face cream', 0),
  ('Matte Green Water Bottle',     24.90, '500 ml matte-green stainless-steel bottle', 0);

-- ▸ 2. Inserir as imagens referentes a cada produto
INSERT INTO product_images (url, alt, "order", "productId")
VALUES
  ('/static/tenis3.jpg',  'Green suede oxford on peach backdrop',     1,
     (SELECT id FROM "products" WHERE name = 'Green Suede Oxford')),
  ('/static/tenis2.jpg',  'Black Nike Air sneaker floating on white', 1,
     (SELECT id FROM "products" WHERE name = 'Black Nike Air Sneaker')),
  ('/static/tenis1.jpg',  'Red Nike Flyknit trainer on red background',1,
     (SELECT id FROM "products" WHERE name = 'Red Nike Flyknit Trainer')),
  ('/static/relogio.jpg', 'Minimalist silver smartwatch top view',    1,
     (SELECT id FROM "products" WHERE name = 'Minimalist Silver Smartwatch')),
  ('/static/maquiagem.jpg','Bioglow orange serum and cream set',      1,
     (SELECT id FROM "products" WHERE name = 'Bioglow Makeup Set')),
  ('/static/garrafa.jpg', 'Matte green stainless-steel bottle',       1,
     (SELECT id FROM "products" WHERE name = 'Matte Green Water Bottle'));
