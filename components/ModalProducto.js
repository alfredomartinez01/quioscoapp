import useQuiosco from '../hooks/useQuiosco'
import Image from 'next/image'
import { formatearDinero } from '../helpers/'
import { useState } from 'react'

function ModalProducto() {
  const { producto, handleClickModal, agregarProducto } = useQuiosco()
  const [cantidad, setCantidad] = useState(1)

  return (
    <div className="md:flex gap-10">
      <div className="md:w-1/3">
        <Image
          src={`/assets/img/${producto.imagen}.jpg`}
          alt={`Imaden producto ${producto.nombre}`}
          width={300}
          height={400}
        />
      </div>

      <div className="md:w-2/3">
        {/* Bottón de cerrar modal */}
        <div
          className="flex justify-end hover:cursor-pointer"
          onClick={handleClickModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold mt-5">{producto.nombre}</h1>
        <p className="mt-5 font-black text-5xl text-amber-500">
          {formatearDinero(producto.precio)}
        </p>

        {/* Botones para aumenta o decrementar cantidades */}
        <div className="flex gap-4 mt-5">
          {/* Botón de recudir cantidad */}
          <button
            onClick={() => {
              if (cantidad > 0) setCantidad(cantidad - 1)
            }}
            disabled={cantidad === 0}
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
          <span className="text-3xl">{cantidad}</span>

          {/* Botón de aumentar cantidad */}
          <button
            onClick={() => {
              if (cantidad < 10) setCantidad(cantidad + 1)
            }}
            disabled={cantidad === 10}
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

        {/* Botón para agregar cantidad */}
        <button
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded mt-10"
          onClick={() => {
            agregarProducto({...producto, cantidad}) // Agregamos la cantidad al producto y lo agregamos al carrito
            handleClickModal()
          }}
        >
          Agregar al carrito
        </button>

      </div>
    </div>
  )
}

export default ModalProducto
