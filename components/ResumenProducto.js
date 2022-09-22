import Image from 'next/image'
import { formatearDinero } from '../helpers'
import useQuiosco from '../hooks/useQuiosco'

const ResumenProducto = ({ producto }) => {
  const { editarProducto, eliminarProducto } = useQuiosco()

  return (
    <div className="shadow p-5 mb-3 flex gap-10 items-center">
      <div className="md:w-1/6">
        <Image
          src={`/assets/img/${producto.imagen}.jpg`}
          alt={`Imagen producto ${producto.nombre}`}
          width={300}
          height={400}
        />
      </div>

      <div className="md:w-4/6">
        <p className="text-3xl font-bold">{producto.nombre}</p>
        <p className="text-xl font-bold mt-2">Cantidad: {producto.cantidad}</p>
        <p className="text-xl font-bold text-amber-500 mt-2">
          Precio: {formatearDinero(producto.precio)}
        </p>

        <p className="text-sm text-gray-700 mt-2">
          Subtotal: {formatearDinero(producto.precio * producto.cantidad)}
        </p>
      </div>

      <div>
        <div className="flex gap-4 mt-5 justify-between">
          {/* Botón de recudir cantidad */}
          <button
            onClick={() => {
              if (producto.cantidad > 1) {
                editarProducto(producto.id, producto.cantidad - 1)
                return
              }
              eliminarProducto(producto.id)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15"
              />
            </svg>
          </button>

          {/* Cantidad */}
          <span className="text-3xl">{producto.cantidad}</span>

          {/* Botón de aumentar cantidad */}
          <button
            onClick={() => {
              if (producto.cantidad < 10) {
                editarProducto(producto.id, producto.cantidad + 1)
                return
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>

        <button
          type="button"
          className="bg-red-700 flex gap-2  px-5 py-2 text-white rounded-md font-bold uppercase shadow-md w-full text-center mt-3"
          onClick={() => eliminarProducto(producto.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default ResumenProducto
