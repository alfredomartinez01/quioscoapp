import { useRouter } from 'next/router'
import useQuiosco from '../hooks/useQuiosco'

const pasos = [
  { paso: 1, nombre: 'Menú', url: '/' },
  { paso: 2, nombre: 'Resumen', url: '/resumen' },
  { paso: 3, nombre: 'Datos y total', url: '/total' },
]

function Pasos() {
  const router = useRouter()
  const { handleChangePaso, paso } = useQuiosco()

    const calcularProgreso = () =>{ 
        const paso = pasos.findIndex(paso => paso.url === router.pathname)

        const anchos = ['w-2/6', 'w-4/6', 'w-full']
        return anchos[paso]
    }

  return (
    <>
      <div className="flex justify-between mb-5">
        {pasos.map((paso) => (
          <button
            key={paso.paso}
            className="text-2xl font-bold"
            onClick={() => {
              router.push(paso.url) // Agregamos la página al router para generar redirección
            }}
          >
            {paso.nombre}
          </button>
        ))}
      </div>

      {/* Barra de progreso */}
      <div className="bg-gray-100 mb-10 w-full">
        <div className={`rounded-full bg-amber-500 text-xs leading-none text-center h-2 text-white ${calcularProgreso()}`}></div>
      </div>
    </>
  )
}

export default Pasos
