import { useEffect, useCallback } from 'react'
import Layout from "../layout/Layout"
import useQuiosco from "../hooks/useQuiosco"
import { formatearDinero } from '../helpers'

export default function total() {

  const { pedidos, nombre, setNombre, colocarOrden, total } = useQuiosco()

  const comprobarPedido = useCallback(() => {
    const deshabilitado = pedidos.length === 0 || nombre === ''
    return deshabilitado
  }, [pedidos, nombre])

  return (
    <Layout pagina="Total y confirmar pedido">
      <h1 className="text-4xl font-black">Total y confirmar pedido</h1>
      <p className="text-2xl my-10">Confirma tu pedido a continuación</p>

      <form
        onSubmit={colocarOrden}
      >
        <div>
          <label
            htmlFor="nombre"
            className="block uppercase text-slate-800 text-xl font-bold mb-2"
          >Nombre</label>

          <input
            type="text"
            id="nombre"
            placeholder="Tu nombre"
            className="bg-gray-200 w-full lg:w-1/3 p-2 rounded"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>

        <div className="mt-10">
          <p className="text-2xl">Total a pagar: {''} <span className="font-bold">{formatearDinero(total)}</span></p>
        </div>

        <div>
          <input
            type="submit"
            value="Confirmar pedido"
            className={` ${comprobarPedido() ? 'bg-gray-500 hover:bg-gray-500' :  'bg-amber-500 hover:bg-amber-600'} w-full lg:w-1/3 mt-10 p-2 text-white uppercase font-bold rounded cursor-pointer`}
            disabled={comprobarPedido()}
          />
        </div>
      </form>
    </Layout>
  )
}
