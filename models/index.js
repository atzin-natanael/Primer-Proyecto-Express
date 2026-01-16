import Lineas from './Lineas.js'
import Categoria from './Categorias.js'
import Articulos from './Articulo.js'
import Usuario from './Usuario.js'
import Clientes from './Clientes.js'
import Cotizacion from './Cotizacion.js'

Articulos.belongsTo(Lineas, {foreignKey: 'LINEA_ID'})
Articulos.belongsTo(Categoria, {foreignKey: 'CATEGORIA_ID'})
Clientes.hasMany(Cotizacion, {foreignKey: 'CLIENTE_ID'})
Cotizacion.belongsTo(Clientes, {foreignKey: 'CLIENTE_ID'})

export{
    Articulos,
    Lineas,
    Categoria,
    Usuario,
    Clientes,
    Cotizacion
}