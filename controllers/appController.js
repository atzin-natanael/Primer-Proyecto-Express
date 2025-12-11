import { Precio, Categoria, Propiedad} from '../models/index.js'
import { Sequelize } from 'sequelize'
const inicio = async (req, res) =>{
    const [categorias, precios, casas, departamentos] = await Promise.all([
        Categoria.findAll({raw: true}),
        Precio.findAll({raw: true}),
        Propiedad.findAll({
            limit:3,
            where:{
                categoriaId: 1,
                publicado: 1
            },
            include:[
                {
                    model: Precio,
                    as: 'precio'
                }
            ],
            order:[
                ['createdAt', 'DESC']
            ]
        }),
         Propiedad.findAll({
            limit:3,
            where:{
                categoriaId: 2,
                publicado: 1
            },
            include:[
                {
                    model: Precio,
                    as: 'precio'
                }
            ],
            order:[
                ['createdAt', 'DESC']
            ]
        })

    ])
    res.render('inicio',{ //el pug
        pagina: 'Inicio',
        categorias,
        precios,
        casas,
        departamentos
    })

}
const categoria = async (req, res) =>{
    const {id} =req.params
    //Comprobar que la categoria exista
    const categoria = await Categoria.findByPk(id)
    if(!categoria){
        return res.redirect('/404')
    }
    //obtener las propiedades de la categoria
    const propiedades = await Propiedad.findAll({
        where:{
            categoriaId: id,
            publicado: 1
        },
        include:[
            {model: Precio, as: 'precio'}
        ]
    })
    res.render('categoria',{
        pagina: `${categoria.nombre}s en Venta`,
        propiedades
    })
}
const noEncontrado = (req, res)=>{
    res.render('404',{
        pagina: 'No encontrado'
    })
}
const buscador= async(req, res)=>{
    const {termino} = req.body
    //validar si está vacio
    const backURL = req.get('Referer') || '/'; // ← si no hay referer, vuelve al inicio
    if(!termino.trim()){
        console.log(backURL)
        return res.redirect(backURL)
    }
    //Consultar las propiedades
    const propiedades= await Propiedad.findAll({
        where:{
            titulo:{
                [Sequelize.Op.like] : '%' + termino + '%'
            }
        },
        include: [
            {model: Precio, as: 'precio'}
        ]
    })
    res.render('busqueda',{
        pagina: 'Resultados de la busqueda',
        propiedades
    })

}
export {
    inicio,
    categoria,
    noEncontrado,
    buscador
}