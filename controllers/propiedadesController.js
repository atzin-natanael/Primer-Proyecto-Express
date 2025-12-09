import {unlink} from 'node:fs/promises'
import {validationResult} from 'express-validator'
// import Precio from '../models/Precio.js'
// import Categoria from '../models/Categoria.js'
import {Precio, Categoria, Propiedad, Mensaje} from '../models/index.js'
import {esVendedor} from '../helpers/index.js'

const admin = async(req, res)=>{
    //Leer query string
    const {pagina: paginaActual} = req.query

    const expresion = /^[1-9]$/
    if(!expresion.test(paginaActual)){
        return res.redirect('/mis-propiedades?pagina=1')
    }
    try {
        const {id} = req.usuario
        
        //Limites y offset para el paginador
        const limit = 3
        const offset = ((paginaActual * limit) - limit) 

        const [propiedades, total] = await Promise.all([
            Propiedad.findAll({
            limit, //limit sql = limit variable
            offset,
            where: {
                usuarioId: id
            },
            include: [
                {model: Categoria, as: 'categoria'},
                {model: Precio, as: 'precio'}
            ],
        }),
        Propiedad.count({
            where: {
                usuarioId: id
            }
        }) 

        ])
        console.log(total)
        res.render('propiedades/admin',{
            pagina:'Mis Popiedades',
            propiedades,
            paginas: Math.ceil(total / limit),
            paginaActual: Number(paginaActual),
            total,
            offset,
            limit
        })
        
    } catch (error) {
        console.log(error)
    }
}
const crear = async (req, res)=>{
    //consultar modelo de precio y categorias
    const [categorias, precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])

    res.render('propiedades/crear',{
        pagina:'Crear Propiedad',
        categorias,
        precios,
        datos: {}
    })
}
const guardar = async(req, res)=>{
    //Validacion
    
    let resultado = validationResult(req)
    if(!resultado.isEmpty()){
        //consultar modelo de precios y categoria
        const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
        ])
        return  res.render('propiedades/crear',{
            pagina:'Crear Propiedad',
            categorias,
            precios,
            errores: resultado.array(),
            datos: req.body
    })
    }
    //Crear registro
    const {titulo, descripcion, habitaciones, estacionamiento, wc, calle, lat, lng, precio: precioId, categoria: categoriaId} = req.body
    const {id: usuarioId} = req.usuario
    try{
        const propiedadGuardada = await Propiedad.create({
            titulo,
            descripcion,
            habitaciones,
            estacionamiento,
            wc,
            calle,
            lat,
            lng,
            precioId,
            categoriaId,
            usuarioId,
            imagen: ''
        })
        const {id} = propiedadGuardada
        res.redirect(`/propiedades/agregar-imagen/${id}`)

    }catch(error){
        console.log(error)
    }
}
const agregarImagen= async(req, res)=>{
    const {id} = req.params
    // // //Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id)
    console.log(propiedad)
    if(!propiedad){
        return res.redirect('/mis-propiedades')
    }
    //Validar propiedad no este publicada
    if(propiedad.publicado){
        return res.redirect('/mis-propiedades')
    }
    //propiedad pertenece a quien visita la pagina
    console.log(req.usuario.id.toString())
    console.log(propiedad.usuarioId.toString())
    if(req.usuario.id.toString() !== propiedad.usuarioId.toString()){
            return res.redirect('/mis-propiedades')
    }
    res.render('propiedades/agregar-imagen',{
        pagina: `Agregar Imagen:`,
        propiedad
    })
}
const almacenarImagen= async(req, res, next)=>{
     const {id} = req.params
    //Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id)
    //console.log(propiedad)
    if(!propiedad){
        return res.redirect('/mis-propiedades')
    }
    //Validar propiedad no este publicada
    if(propiedad.publicado){
        return res.redirect('/mis-propiedades')
    }
    //propiedad pertenece a quien visita la pagina
    if(req.usuario.id.toString() !== propiedad.usuarioId.toString()){
            return res.redirect('/mis-propiedades')
    }
    try{
        console.log(req.file)
        //almacenar imagen y publicar
        propiedad.imagen = req.file.filename
        propiedad.publicado = 1
        await propiedad.save()
        next()
    }catch(error){
        console.log(error)
    }
}
const editar=async(req,res)=>{
    const {id} = req.params
    //valida que exista la propiedad
    const propiedad= await Propiedad.findByPk(id)
    if(!propiedad){
        return res.redirect('/mis-propiedades')
    }
    //Revisa que quien visita la URL, es quien creó la propiedad
    if(propiedad.usuarioId.toString() !== req.usuario.id.toString()){
        return res.redirect('/mis-propiedades')
    }
    const [categorias, precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ])
    res.render('propiedades/editar',{
        pagina:`Editar Propiedad: ${propiedad.titulo}`,
        categorias,
        precios,
        datos: propiedad
    })
}
const guardarCambios= async(req, res)=>{
    //verificar la validacion
    let resultado = validationResult(req)
    if(!resultado.isEmpty()){
        //consultar modelo de precios y categoria
        const [categorias, precios] = await Promise.all([
            Categoria.findAll(),
            Precio.findAll()
        ])
        return  res.render('propiedades/editar',{
            pagina:'Editar Propiedad',
            categorias,
            precios,
            errores: resultado.array(),
            datos: req.body
    })
    }
    const {id} = req.params
    //valida que exista la propiedad
    const propiedad= await Propiedad.findByPk(id)
    if(!propiedad){
        return res.redirect('/mis-propiedades')
    }
    //Revisa que quien visita la URL, es quien creó la propiedad
    if(propiedad.usuarioId.toString() !== req.usuario.id.toString()){
        return res.redirect('/mis-propiedades')
    }
    //Reescrivir el objeto y actualizarlo
    try {
        const {titulo, descripcion, habitaciones, estacionamiento, wc, calle, lat, lng, precio: precioId, categoria: categoriaId} = req.body
        propiedad.set({
            titulo,
            descripcion,
            habitaciones,
            estacionamiento,
            wc,
            calle,
            lat,
            lng,
            precioId,
            categoriaId
        })
        await propiedad.save()
        res.redirect('/mis-propiedades')
    } catch (error) {
        console.log(error)
    }
}
const eliminar= async(req, res)=>{
     const {id} = req.params
    //valida que exista la propiedad
    const propiedad= await Propiedad.findByPk(id)
    if(!propiedad){
        return res.redirect('/mis-propiedades')
    }
    //Revisa que quien visita la URL, es quien creó la propiedad
    if(propiedad.usuarioId.toString() !== req.usuario.id.toString()){
        return res.redirect('/mis-propiedades')
    }

    //eliminar la imagen
    await unlink(`public/uploads/${propiedad.imagen}`)
    console.log(`Se eliminó la imagen: ${propiedad.imagen}`)

    //Eliminar la propiedad
    await propiedad.destroy()
    res.redirect('/mis-propiedades')


}
//Muestra propiedad
const mostrarPropiedad= async(req, res)=>{
    const {id} = req.params

    //comprobar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id,{
        include: [
            {model: Categoria, as: 'categoria'},
            {model: Precio, as: 'precio'}
        ]
    })
    if(!propiedad){
        return res.redirect('/404')
    }
    res.render('propiedades/mostrar',{
        propiedad,
        pagina: propiedad.titulo,
        usuario: req.usuario,
        esVendedor: esVendedor(req.usuario?.id, propiedad.usuarioId) //optional chaning importante
    })
}
const enviarMensaje= async(req, res)=>{
    const {id} = req.params

    //comprobar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id,{
        include: [
            {model: Categoria, as: 'categoria'},
            {model: Precio, as: 'precio'}
        ]
    })
    if(!propiedad){
        return res.redirect('/404')
    }
    //renderizar errores
    let resultado = validationResult(req)
    if(!resultado.isEmpty()){
        return res.render('propiedades/mostrar',{
        propiedad,
        pagina: propiedad.titulo,
        usuario: req.usuario,
        esVendedor: esVendedor(req.usuario?.id, propiedad.usuarioId), //optional chaning importante
        errores: resultado.array()
    })
    }
    //Almacenar mensaje
    const {mensaje} = req.body
    const {id: propiedadId} = req.params
    const {id: usuarioId}  = req.usuario
    await Mensaje.create({
        mensaje,
        propiedadId,
        usuarioId
    })
    // res.render('propiedades/mostrar',{
    //     propiedad,
    //     pagina: propiedad.titulo,
    //     usuario: req.usuario,
    //     esVendedor: esVendedor(req.usuario?.id, propiedad.usuarioId), //optional chaning importante
    //     enviado: true
    // })
    res.redirect('/')
}
export{
    admin,
    crear,
    guardar,
    agregarImagen,
    almacenarImagen,
    editar,
    guardarCambios,
    eliminar,
    mostrarPropiedad,
    enviarMensaje
}