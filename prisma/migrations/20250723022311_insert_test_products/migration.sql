-- This is an empty migration.
-- ▸ 1. Inserir os produtos
INSERT INTO "Product" (name, price, description, quantity)
VALUES 
  ('Green Suede Oxford',          129.90, 'Stylish teal suede oxford shoe with brogue detailing', 0),
  ('Black Nike Air Sneaker',      199.90, 'Lightweight black running sneaker with reflective swoosh', 0),
  ('Red Nike Flyknit Trainer',    249.90, 'Red Nike Flyknit trainer with flexible sole', 0),
  ('Minimalist Silver Smartwatch',299.90, 'Sleek silver smartwatch with white strap', 0),
  ('Bioglow Makeup Set',           59.90, 'Orange Bioglow serum and illuminating face cream', 0),
  ('Matte Green Water Bottle',     24.90, '500 ml matte-green stainless-steel bottle', 0);

-- ▸ 2. Inserir as imagens referentes a cada produto
INSERT INTO "ProductImages" (url, alt, "order", "productId")
VALUES
  ('/static/tenis3.jpg',  'Green suede oxford on peach backdrop',     1,
     (SELECT id FROM "Product" WHERE name = 'Green Suede Oxford')),
  ('/static/tenis2.jpg',  'Black Nike Air sneaker floating on white', 1,
     (SELECT id FROM "Product" WHERE name = 'Black Nike Air Sneaker')),
  ('/static/tenis1.jpg',  'Red Nike Flyknit trainer on red background',1,
     (SELECT id FROM "Product" WHERE name = 'Red Nike Flyknit Trainer')),
  ('/static/relogio.jpg', 'Minimalist silver smartwatch top view',    1,
     (SELECT id FROM "Product" WHERE name = 'Minimalist Silver Smartwatch')),
  ('/static/maquiagem.jpg','Bioglow orange serum and cream set',      1,
     (SELECT id FROM "Product" WHERE name = 'Bioglow Makeup Set')),
  ('/static/garrafa.jpg', 'Matte green stainless-steel bottle',       1,
     (SELECT id FROM "Product" WHERE name = 'Matte Green Water Bottle'));
