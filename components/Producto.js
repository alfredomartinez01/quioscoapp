import Image from 'next/image'
import { formatearDinero } from '../helpers'
import useQuiosco from '../hooks/useQuiosco'

function Producto({ producto }) {
  const { nombre, precio, imagen } = producto
  const { handleClickProducto, handleClickModal } = useQuiosco()

  return (
    <div className="border p-3">
      <Image
        src={`/assets/img/${producto.imagen}.jpg`}
        width={400}
        height={500}
        alt="imagen producto"
      />

      <div className="p-5">
        <h3 className="text-2xl font-bold">{nombre}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatearDinero(precio)}
        </p>
        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
          onClick={() => {
            handleClickProducto(producto)
            handleClickModal()
          }}
        >
          Agregar al pedido
        </button>
      </div>
    </div>
  )
}

export default Producto
