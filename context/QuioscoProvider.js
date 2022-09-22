import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export const QuioscoContext = createContext()

const QuioscoProvider = ({ children }) => {
  const router = useRouter()

  const [categorias, setCategorias] = useState([])
  const [categoriaActual, setCategoriaActual] = useState()
  const [producto, setProducto] = useState({})
  const [modal, setModal] = useState(false)
  const [pedidos, setPedidos] = useState([])
  const [nombre, setNombre] = useState('');
  const [total, setTotal] = useState(0);

  /* Hacemos la consulta de categorias */
  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const { data } = await axios('api/categorias')
        setCategorias(data.categorias)
        //setCategoriaActual(categorias[0]) // Esto no se puede hacer porque puede ejecutarse antes de que se asigne el otro estado
      } catch (error) {
        console.log(error)
      }
    }
    obtenerCategorias()
  }, [])

  useEffect(() => {
    setCategoriaActual(categorias[0])
  }, [categorias])

  /* Calculamos el total de los pedidos */
  useEffect(() => {
    const nuevoTotal = pedidos.reduce((total, pedido) => total + (pedido.precio * pedido.cantidad), 0)
    setTotal(nuevoTotal)
  }, [pedidos])

  /* Detectando a qué categoría fue la que se dio click */
  const handleClickCategoria = (id) => {
    const categoria = categorias.find((categoria) => categoria.id === id)
    router.push("/")
    setCategoriaActual(categoria)
  }

  /* Detectando el producto */
  const handleClickProducto = (producto) => {
    setProducto(producto)
  }

  /* Cambiando el estado del modal */
  const handleClickModal = () => {
    setModal(!modal)
  }

  /* Función para agregar productos al pedido */
  const agregarProducto = ({ categoriaId, ...pedido }) => {
    // Desestructuramos el objeto para no agregar la categoría y la imagen
    const existe = pedidos.some((producto) => producto.id === pedido.id)

    if (existe) {
      const pedidoActualizado = pedidos.map((ped) =>
        ped.id === pedido.id ? ped + pedido : ped,
      )
      setPedidos(pedidoActualizado)
    } else {
      setPedidos([...pedidos, pedido])
    }
    /* Mandamos a mostrar la notificación */
    toast.success('Producto agregado correctamente', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  /* Función para manejar el editar del resumen */
  const editarProducto = (id, cantidad) => {
    const pedidoActualizado = pedidos.map((ped) =>
      ped.id === id ? { ...ped, cantidad } : ped,
    )
    setPedidos(pedidoActualizado)
  }

  /* Función para eliminar un producto del resumen */
  const eliminarProducto = (id) => {
    const pedidoActualizado = pedidos.filter((ped) => ped.id !== id)
    setPedidos(pedidoActualizado)
  }

  /* Función para coloar la orden */
  const colocarOrden = async (e) => {
    e.preventDefault()
    try {
      await axios.post('api/ordenes', {
        nombre,
        total,
        pedido: pedidos,
        fecha: Date.now().toString()
      })

      // Reiniciando app
      setPedidos([])
      setNombre('')
      setTotal(0)
      setCategoriaActual(categorias[0])

      /* Mandamos a mostrar la notificación */
      toast.success('Orden colocada correctamente', {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

      setTimeout(() => {
        router.push('/')
      }, 5000);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        producto,
        handleClickProducto,
        modal,
        handleClickModal,
        agregarProducto,
        pedidos,
        editarProducto,
        eliminarProducto,
        nombre,
        setNombre,
        colocarOrden,
        total,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  )
}

export default QuioscoProvider
