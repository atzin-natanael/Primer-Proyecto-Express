import Lineas from './Lineas.js'
import Categoria from './Categorias.js'
import Articulos from './Articulo.js'
import Usuario from './Usuario.js'

Articulos.belongsTo(Lineas, {foreignKey: 'LINEA_ID'})
Articulos.belongsTo(Categoria, {foreignKey: 'CATEGORIA_ID'})


export{
    Articulos,
    Lineas,
    Categoria,
    Usuario
}