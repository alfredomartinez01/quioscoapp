import Layout from "../layout/Layout"
import useQuiosco from "../hooks/useQuiosco"
import ResumenProducto from "../components/ResumenProducto";

export default function resumen() {

    const { pedidos } = useQuiosco()
  return (
    <Layout pagina="Resumen">
      <h1 className="text-4xl font-black">Resumen</h1>
      <p className="text-2xl my-10">Revisa tu pedido</p>

      {
        pedidos.length === 0 
        ? <p className="text-center text-2xl text-amber-500">Agrega productos a tu pedido para verlos aquí</p>
        : (
          pedidos.map(producto => (
            <ResumenProducto key={producto.id} producto={producto} />
          ))
        )
      }
    </Layout>
  )
}
