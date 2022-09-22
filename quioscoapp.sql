-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."_prisma_migrations" (
    "id" varchar(36) NOT NULL,
    "checksum" varchar(64) NOT NULL,
    "finished_at" timestamptz,
    "migration_name" varchar(255) NOT NULL,
    "logs" text,
    "rolled_back_at" timestamptz,
    "started_at" timestamptz NOT NULL DEFAULT now(),
    "applied_steps_count" int4 NOT NULL DEFAULT 0,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Categoria_id_seq";

-- Table Definition
CREATE TABLE "public"."Categoria" (
    "id" int4 NOT NULL DEFAULT nextval('"Categoria_id_seq"'::regclass),
    "nombre" text NOT NULL,
    "icono" text NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Orden_id_seq";

-- Table Definition
CREATE TABLE "public"."Orden" (
    "id" int4 NOT NULL DEFAULT nextval('"Orden_id_seq"'::regclass),
    "nombre" text NOT NULL,
    "fecha" text NOT NULL,
    "total" float8 NOT NULL,
    "pedido" jsonb NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Producto_id_seq";

-- Table Definition
CREATE TABLE "public"."Producto" (
    "id" int4 NOT NULL DEFAULT nextval('"Producto_id_seq"'::regclass),
    "nombre" text NOT NULL,
    "precio" float8 NOT NULL,
    "imagen" text NOT NULL,
    "categoriaId" int4 NOT NULL,
    CONSTRAINT "Producto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "public"."Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."_prisma_migrations" ("id", "checksum", "finished_at", "migration_name", "logs", "rolled_back_at", "started_at", "applied_steps_count") VALUES
('e4d78f25-b97c-4399-90ef-340a50093f78', 'a1f2d56924f53d5bfdef437f70ca8e19699391795b3dac3851e0c278caef6c37', '2022-09-16 17:02:29.736893-05', '20220916220229_productos_y_categorias', NULL, NULL, '2022-09-16 17:02:29.673374-05', 1);
INSERT INTO "public"."_prisma_migrations" ("id", "checksum", "finished_at", "migration_name", "logs", "rolled_back_at", "started_at", "applied_steps_count") VALUES
('a0f5da9f-eab3-4132-a727-9433eeb4cac8', '075ec56fc546cb7845fca8beede02db1a88977f1912650f209e60620eacadac5', '2022-09-16 17:29:19.248948-05', '20220916222919_ordenes', NULL, NULL, '2022-09-16 17:29:19.172706-05', 1);


INSERT INTO "public"."Categoria" ("id", "nombre", "icono") VALUES
(1, 'Café', 'cafe');
INSERT INTO "public"."Categoria" ("id", "nombre", "icono") VALUES
(2, 'Hamburguesas', 'hamburguesa');
INSERT INTO "public"."Categoria" ("id", "nombre", "icono") VALUES
(3, 'Pizzas', 'pizza');
INSERT INTO "public"."Categoria" ("id", "nombre", "icono") VALUES
(4, 'Donas', 'dona'),
(5, 'Pasteles', 'pastel'),
(6, 'Galletas', 'galletas');

INSERT INTO "public"."Orden" ("id", "nombre", "fecha", "total", "pedido") VALUES
(1, 'as', '1663809073114', 164.7, '[{"id": 4, "imagen": "cafe_04", "nombre": "Latte Frio con Chocolate Grande", "precio": 54.9, "cantidad": 3}]');
INSERT INTO "public"."Orden" ("id", "nombre", "fecha", "total", "pedido") VALUES
(2, 'Alfred', '1663809271722', 284.5, '[{"id": 4, "imagen": "cafe_04", "nombre": "Latte Frio con Chocolate Grande", "precio": 54.9, "cantidad": 3}, {"id": 1, "imagen": "cafe_01", "nombre": "Café Caramel con Chocolate", "precio": 59.9, "cantidad": 2}]');
INSERT INTO "public"."Orden" ("id", "nombre", "fecha", "total", "pedido") VALUES
(3, 'Alfred', '1663809301396', 284.5, '[{"id": 4, "imagen": "cafe_04", "nombre": "Latte Frio con Chocolate Grande", "precio": 54.9, "cantidad": 3}, {"id": 1, "imagen": "cafe_01", "nombre": "Café Caramel con Chocolate", "precio": 59.9, "cantidad": 2}]');
INSERT INTO "public"."Orden" ("id", "nombre", "fecha", "total", "pedido") VALUES
(4, 'Juan', '1663809383474', 284.5, '[{"id": 4, "imagen": "cafe_04", "nombre": "Latte Frio con Chocolate Grande", "precio": 54.9, "cantidad": 3}, {"id": 1, "imagen": "cafe_01", "nombre": "Café Caramel con Chocolate", "precio": 59.9, "cantidad": 2}]'),
(5, 'Lola', '1663809435443', 149.7, '[{"id": 2, "imagen": "cafe_02", "nombre": "Café Frio con Chocolate Grande", "precio": 49.9, "cantidad": 3}]'),
(6, 'Lopez', '1663809470725', 54.9, '[{"id": 5, "imagen": "cafe_05", "nombre": "Malteada Fria con Chocolate Grande", "precio": 54.9, "cantidad": 1}]'),
(7, 'Toya', '1663809516803', 179.7, '[{"id": 36, "imagen": "hamburguesas_02", "nombre": "Hamburguesa de Pollo", "precio": 59.9, "cantidad": 3}]'),
(8, 'Ale', '1663809551119', 109.8, '[{"id": 5, "imagen": "cafe_05", "nombre": "Malteada Fria con Chocolate Grande", "precio": 54.9, "cantidad": 2}]');

INSERT INTO "public"."Producto" ("id", "nombre", "precio", "imagen", "categoriaId") VALUES
(1, 'Café Caramel con Chocolate', 59.9, 'cafe_01', 1);
INSERT INTO "public"."Producto" ("id", "nombre", "precio", "imagen", "categoriaId") VALUES
(2, 'Café Frio con Chocolate Grande', 49.9, 'cafe_02', 1);
INSERT INTO "public"."Producto" ("id", "nombre", "precio", "imagen", "categoriaId") VALUES
(3, 'Latte Frio con Chocolate Grande', 54.9, 'cafe_03', 1);
INSERT INTO "public"."Producto" ("id", "nombre", "precio", "imagen", "categoriaId") VALUES
(4, 'Latte Frio con Chocolate Grande', 54.9, 'cafe_04', 1),
(5, 'Malteada Fria con Chocolate Grande', 54.9, 'cafe_05', 1),
(6, 'Café Mocha Caliente Chico', 39.9, 'cafe_06', 1),
(7, 'Café Mocha Caliente Grande con Chocolate', 59.9, 'cafe_07', 1),
(8, 'Café Caliente Capuchino Grande', 59.9, 'cafe_08', 1),
(9, 'Café Mocha Caliente Mediano', 49.9, 'cafe_09', 1),
(10, 'Café Mocha Frio con Caramelo Mediano', 49.9, 'cafe_10', 1),
(11, 'Café Mocha Frio con Chocolate Mediano', 49.9, 'cafe_11', 1),
(12, 'Café Espresso', 29.9, 'cafe_12', 1),
(13, 'Café Capuchino Grande con Caramelo', 59.9, 'cafe_13', 1),
(14, 'Café Caramelo Grande', 59.9, 'cafe_14', 1),
(15, 'Paquete de 3 donas de Chocolate', 39.9, 'donas_01', 4),
(16, 'Paquete de 3 donas Glaseadas', 39.9, 'donas_02', 4),
(17, 'Dona de Fresa ', 19.9, 'donas_03', 4),
(18, 'Dona con Galleta de Chocolate ', 19.9, 'donas_04', 4),
(19, 'Dona glass con Chispas Sabor Fresa ', 19.9, 'donas_05', 4),
(20, 'Dona glass con Chocolate ', 19.9, 'donas_06', 4),
(21, 'Dona de Chocolate con MÁS Chocolate ', 19.9, 'donas_07', 4),
(22, 'Paquete de 3 donas de Chocolate ', 39.9, 'donas_08', 4),
(23, 'Paquete de 3 donas con Vainilla y Chocolate ', 39.9, 'donas_09', 4),
(24, 'Paquete de 6 Donas', 69.9, 'donas_10', 4),
(25, 'Paquete de 3 Variadas', 39.9, 'donas_11', 4),
(26, 'Dona Natural con Chocolate', 19.9, 'donas_12', 4),
(27, 'Paquete de 3 Donas de Chocolate con Chispas', 39.9, 'donas_13', 4),
(28, 'Dona Chocolate y Coco', 19.9, 'donas_14', 4),
(29, 'Paquete Galletas de Chocolate', 29.9, 'galletas_01', 6),
(30, 'Paquete Galletas de Chocolate y Avena', 39.9, 'galletas_02', 6),
(31, 'Paquete de Muffins de Vainilla', 39.9, 'galletas_03', 6),
(32, 'Paquete de 4 Galletas de Avena', 24.9, 'galletas_04', 6),
(33, 'Galletas de Mantequilla Variadas', 39.9, 'galletas_05', 6),
(34, 'Galletas de sabores frutales', 39.9, 'galletas_06', 6),
(35, 'Hamburguesa Sencilla', 59.9, 'hamburguesas_01', 2),
(36, 'Hamburguesa de Pollo', 59.9, 'hamburguesas_02', 2),
(37, 'Hamburguesa de Pollo y Chili', 59.9, 'hamburguesas_03', 2),
(38, 'Hamburguesa Queso y  Pepinos', 59.9, 'hamburguesas_04', 2),
(39, 'Hamburguesa Cuarto de Libra', 59.9, 'hamburguesas_05', 2),
(40, 'Hamburguesa Doble Queso', 69.9, 'hamburguesas_06', 2),
(41, 'Hot Dog Especial', 49.9, 'hamburguesas_07', 2),
(42, 'Paquete 2 Hot Dogs', 69.9, 'hamburguesas_08', 2),
(43, '4 Rebanadas de Pay de Queso', 69.9, 'pastel_01', 5),
(44, 'Waffle Especial', 49.9, 'pastel_02', 5),
(45, 'Croissants De la casa', 39.9, 'pastel_03', 5),
(46, 'Pay de Queso', 19.9, 'pastel_04', 5),
(47, 'Pastel de Chocolate', 29.9, 'pastel_05', 5),
(48, 'Rebanada Pastel de Chocolate', 29.9, 'pastel_06', 5),
(49, 'Pizza Spicy con Doble Queso', 69.9, 'pizzas_01', 3),
(50, 'Pizza Jamón y Queso', 69.9, 'pizzas_02', 3),
(51, 'Pizza Doble Queso', 69.9, 'pizzas_03', 3),
(52, 'Pizza Especial de la Casa', 69.9, 'pizzas_04', 3),
(53, 'Pizza Chorizo', 69.9, 'pizzas_05', 3),
(54, 'Pizza Hawaiana', 69.9, 'pizzas_06', 3),
(55, 'Pizza Tocino', 69.9, 'pizzas_07', 3),
(56, 'Pizza Vegetales y Queso', 69.9, 'pizzas_08', 3),
(57, 'Pizza Pepperoni y Queso', 69.9, 'pizzas_09', 3),
(58, 'Pizza Aceitunas y Queso', 69.9, 'pizzas_10', 3),
(59, 'Pizza Queso, Jamón y Champiñones', 69.9, 'pizzas_11', 3);
