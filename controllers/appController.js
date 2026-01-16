const inicio = async (req, res) => {
    let { pagina, termino = '' } = req.query;
    termino = termino.toUpperCase();
    if (!pagina) pagina = 1;
    const expresion = /^[1-9]\d*$/;
    if (!expresion.test(pagina)) {
        return res.redirect(`/catalogo?pagina=1&termino=${termino}`);
    }
    try {
        const respuesta = await fetch('http://localhost:3000/codigos/');
        let datos = await respuesta.json();
        // 🔎 FILTRO
        if (termino.trim()) {
            datos = datos.filter(c =>
                (c.NOMBRE ?? '').toString().includes(termino) ||
                (c.CLAVE_ARTICULO ?? '').toString().includes(termino)
            );

        }
        const limit = 25;
                const offset = (pagina - 1) * limit;

                const primeros = datos.slice(offset, offset + limit);

                const codigosConTotal = primeros.map(c => ({
                    ...c,
                    TOTAL_EXISTENCIA: Number(c.EXISTENCIA_A) + Number(c.EXISTENCIA_T)
                }));
        res.render('catalogo', {
            pagina: 'Catálogo',
            barra: false,
            codigos: codigosConTotal,
            paginas: Math.ceil(datos.length / limit),
            paginaActual: Number(pagina),
            total: datos.length,
            offset,
            limit,
            termino // 🔥 importante
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
const crearPedido = async (req, res) => {
    let { pagina, termino = '' } = req.query;
    termino = termino.toUpperCase();
    if (!pagina) pagina = 1;
    const expresion = /^[1-9]\d*$/;
    if (!expresion.test(pagina)) {
        return res.redirect(`/crearPedido?pagina=1&termino=${termino}`);
    }
    try {
        const respuesta = await fetch('http://localhost:3000/codigos/');
        let datos = await respuesta.json();

        // 🔎 FILTRO
        if (termino.trim()) {
            datos = datos.filter(c =>
                (c.NOMBRE ?? '').toString().includes(termino) ||
                (c.CLAVE_ARTICULO ?? '').toString().includes(termino)
            );

        }

        const limit = 25;
        const offset = (pagina - 1) * limit;

        const primeros = datos.slice(offset, offset + limit);

        const codigosConTotal = primeros.map(c => ({
            ...c,
            TOTAL_EXISTENCIA: Number(c.EXISTENCIA_A) + Number(c.EXISTENCIA_T)
        }));

        res.render('crearPedido', {
            pagina: 'Crear Pedido',
            barra: false,
            codigos: codigosConTotal,
            paginas: Math.ceil(datos.length / limit),
            paginaActual: Number(pagina),
            total: datos.length,
            offset,
            limit,
            termino
        });

    } catch (error) {
        console.log(error);
        res.render('crearPedido', {
            pagina: 'Crear Pedido',
            barra: true,
            codigos: []
        });
    }
};

export {
    inicio,
    crearPedido,
}