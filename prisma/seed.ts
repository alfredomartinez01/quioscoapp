import {categorias} from './data/categorias'
import {productos} from './data/productos'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
    try {
        // Hacemos la insersión de múltiples categorias
        await prisma.categoria.createMany({
            data: categorias
        })
        // Hacemos la insersión de múltiples productos
        await prisma.producto.createMany({
            data: productos
        })
    } catch (error) {
        console.log(error);
    }
}
main();