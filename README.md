# QuiscoAPP

An app developed using Next.js

## Install and configuring TailwindCSS with Next.js

---

Para instalarlo hacemos uso de las siguientes dependencias:

```bash
npm i -D tailwindcss postcss autoprefixer
```

Iniciamos el proyecto de tailwind usando

```bash
npx tailwindcss init -p
```

Abrimos el archivo `tailwind.config.js` y agregamos la siguiente configuración:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js, jsx, ts, tsx}',
    './components/**/*.{js, jsx, ts, tsx}',
    './layout/**/*.{js, jsx, ts, tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

```

Ahora agregamos las siguientes lineas al archivo globals.css:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Prisma

---

Prisma es un ORM (es un modelo o capa de programación que permite mapear estructuras de base de datos relacional en objetos de programación orientada a objetos) que nos permite conectarnos a una base de datos y realizar operaciones CRUD de una manera muy sencilla.

### Pasos para instalar Prisma

En el caso de postgreSQL, debemos instalarlo y configurarlo, más tarde creamos la base de datos. Y es todo en PostgreSQL, el resto lo trabajaremos con Prisma.

Después procedemos a instalar Prisma en el proyecto, uno como dependencia de desarrollo (-D) y otro para poder usarlo en el deploy.

```bash
npm i -D prisma
```

```bash
npm i @prisma/client
```

Y finalmente inicializamos el proyecto de prisma

```bash
npx prisma init
```

### Pasos para configurar Prisma

Primero debemos configurar la base de datos en el .env, ya que esa variable de conexión es usada en el archivo `schema.prisma` para poder conectarnos a la base de datos.

```env
DATABASE_URL="postgresql://postgres:admin@localhost:5432/quioscoapp?schema=public"
```

Después vamos creando nuestros modelos en el archivo `schema.prisma` los cuales representarán tablas.

```prisma
model Producto{
  id Int @id @default(autoincrement())
  nombre String? // El ? hace que no sea obligatorio
  precio Float
  imagen String
}
```

Ahora podemos hacer la primera migración para actualizar nuestros modelos en la bd, para esto usamos el comando:

```bash
npx prisma migrate dev
```

**Nota:** En caso de que queramos eliminar las migraciones hechas, podemos usar el comando:

```bash
npx prisma migrate reset
```

**Nota:** Otra forma de ver datos es usando prisma studio, para esto usamos el comando:

```bash
npx prisma studio
```

### Pasos par hacer seeding usando prisma

Insertar datos de forma masiva en una base de datos se conoce como seeding.

1.- Para hacerlo con Prisma, debemos crear una nueva carpeta en prisma llamada data, en donde creamos dos archivos, cada uno para cada modelo, y exportamos en ambos un objeto con toda la info que queremos insertar.

2.- Más tarde, dentro de la carpeta prisma creamos un archivo llamado seed.js, en donde importamos los datos de los archivos que creamos anteriormente y los insertamos en la base de datos.

3.- Después instalamos una librería para poder ejecutar el archivo seed.ts

```bash
npm i ts-node
```

4.- En package.json agregamos el siguiente parámetro:

```json
"prisma": {
  "seed": "ts-node prisma/seed.ts"
}
```

5.- Finalmente ejecutamos el comando para hacer el seed:

```bash
npx prisma db seed
```

### Consultas a la base de datos usando Prisma

Para hacer consultas a la base de datos usando Prisma, debemos importar el cliente de prisma, acceder al modelo que queremos consultar y usar el método que queremos ejecutar.

Ejemplo consultando categorias:

```js
import { PrismaClient } from "@prisma/client"
.
.
.
const prisma = new PrismaClient()

const categorias = await prisma.categoria.findMany();
```

**NOTA:** Solo es posible hacerlo desde getServerSideProps o getStaticProps, ya que estos métodos se ejecutan en el servidor y no en el cliente, o también en la api de NextJS.

**EAGER LOADING:** Es cuando cargamos todos los datos, por ejemplo, trayendo los productos de cada categoria en prisma.

### getServerSideProps vs NextJS API routes

- Se usa getServerSideProps cuando queremos hacer una consulta a la base de datos y mostrar los datos en la página.
- Se usa NextJS API routes cuando queremos hacer una consulta a la base de datos y mostrar los datos en la página, pero además queremos hacer una consulta a la base de datos desde el cliente (para colocarlos en el state).

## Context en NextJS

---

El context se sigue haciendo de una manera muy similar, la diferencia más notoria es que el provider es usado en el archivo \_app.js.

## React-toastify

---

Es una librería últil para mostrar alertas en la aplicación.

```bash
npm i react-toastify
```

Y se coloca en el Layout el componente principal de la librería.
