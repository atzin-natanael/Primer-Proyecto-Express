import bcrypt from 'bcrypt'
const usuarios=[
    {
        nombre: 'Atzin',
        email: 'atzin_pacheco@live.com',
        confirmado: 1,
        clave: 100000,
        password: bcrypt.hashSync('password', 10),

    }
]
export default usuarios