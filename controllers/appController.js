const inicio = async (req, res) => {
    const {pagina: paginaActual} = req.query;
    const expresion = /^[1-9]\d*$/
    if(!expresion.test(paginaActual)){
        return res.redirect('/catalogo?pagina=1')
    }
    try {
        const respuesta = await fetch('http://localhost:3000/codigos/');
        const datos = await respuesta.json();
        const limit = 25;
        const offset = ((paginaActual * limit) - limit) 
        const primeros = datos.slice(offset, offset + limit);
        const codigosConTotal = primeros.map(c => ({
            ...c,
            TOTAL_EXISTENCIA: Number(c.EXISTENCIA_A) + Number(c.EXISTENCIA_T)
        }));
        res.render('catalogo', {
            pagina: 'Catálogo',
            barra: true,
            codigos: codigosConTotal,
            paginas: Math.ceil(datos.length / limit), //83
            paginaActual: Number(paginaActual), //actual
            total: datos.length, //2069
            offset, //inicio de contador
            limit //25
        });

    } catch (error) {
        console.log(error);
        res.render('catalogo', {
            pagina: 'Catálogo',
            barra: true,
            codigos: []
        });
    }
}
const crearPedido = async(req, res) => {
        const {pagina: paginaActual} = req.query;
    const expresion = /^[1-9]\d*$/
    if(!expresion.test(paginaActual)){
        return res.redirect('/crearPedido?pagina=1')
    }
    try {
        const respuesta = await fetch('http://localhost:3000/codigos/');
        const datos = await respuesta.json();
        const limit = 25;
        const offset = ((paginaActual * limit) - limit) 
        const primeros = datos.slice(offset, offset + limit);
        const codigosConTotal = primeros.map(c => ({
            ...c,
            TOTAL_EXISTENCIA: Number(c.EXISTENCIA_A) + Number(c.EXISTENCIA_T)
        }));
        res.render('crearPedido', {
            pagina: 'Crear Pedido',
            barra: true,
            codigos: codigosConTotal,
            paginas: Math.ceil(datos.length / limit), //83
            paginaActual: Number(paginaActual), //actual
            total: datos.length, //2069
            offset, //inicio de contador
            limit //25
        });

    } catch (error) {
        console.log(error);
        res.render('crearPedido', {
            pagina: 'Crear Pedido',
            barra: true,
            codigos: []
        });
    }
}
export {
    inicio,
    crearPedido
}