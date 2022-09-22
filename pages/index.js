import Head from 'next/head'
import Image from 'next/image'
import Layout from '../layout/Layout'
import useQuiosco from '../hooks/useQuiosco'
import Producto from '../components/Producto'

export default function Home({ categorias }) {
  const { categoriaActual } = useQuiosco()

  return (
    <Layout
      pagina={`Menu - ${categoriaActual ? categoriaActual?.nombre : 'Inicio'}`}
    >
      <h1 className="text-4xl font-black">{categoriaActual?.nombre}</h1>

      <p className="text-2xl my-10">
        Elige y personaliza tu pedido a continuación.
      </p>

      {/* Mostramos cada uno de los productos de la categoria */}
      <div className="grid grid-cols-2 xl:grid-cols-4 md:grid-cols-3">
        {categoriaActual?.productos?.map((producto) => (
          <Producto key={producto.id} producto={producto} />
        ))}
      </div>
    </Layout>
  )
}
