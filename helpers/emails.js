import nodemailer from 'nodemailer'

const emailRegistro = async (datos) =>{
    // Crea el transporte SMTP con la configuración de seguridad correcta
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT, // Valor: 587
        // **IMPORTANTE:** Cuando se usa el puerto 587 (STARTTLS):
        secure: false, // Debe ser 'false' para STARTTLS
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        // **RECOMENDADO:** Forzar el uso de TLS para el puerto 587
        tls: {
            rejectUnauthorized: false // Deshabilitar la verificación de certificado (puede ser necesario en entornos de prueba o si el certificado es autofirmado)
        }
    });

    const {email, nombre, token} = datos

    try {
        // Usa await en sendMail para capturar errores de la promesa
        await transport.sendMail({
            from: '"BienesRaices.com" <no-reply@papeleriacornejo.com>', // Usa el formato correcto con el correo de origen
            to: email,
            subject: 'Confirma tu cuenta en BienesRaices.com',
            text: 'Confirma tu cuenta en BienesRaices.com',
            html: `
                <p>Hola ${nombre}, Comprueba tu cuenta en BienesRaices.com</p>
                <p>Tu cuenta ya esta lista, solo debes confirmarlo en el siguiente enlace:
                <a href= "${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}">Confirmar Cuenta</a> </p>
                <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
            `
        });
        console.log(`✅ Correo de registro enviado a ${email}`);
    } catch (error) {
        // **¡AQUÍ DEBERÍA APARECER EL ERROR DE CONEXIÓN O AUTENTICACIÓN!**
        console.log("❌ ERROR al enviar el correo:", error); 
    }
}
const emailOlvidePassword = async (datos) =>{
    // Looking to send emails in production? Check out our Email API/SMTP product!
const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
});
    const {email, nombre, token} = datos
    await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'Restablece tu Contraseña en BienesRaices.com',
        text: 'Confirma tu cuenta en BienesRaices.com',
        html: `
            <p>Hola ${nombre}, Has solicitado reestableber tu contraseña en BienesRaices.com</p>
            <p>Sigue el siguiente enlace para reestablecer la contraseña:
            <a href= ${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/olvide-password/${token}>Reestablecer Contraseña</a> </p>
            <p>Si tu no solicitaste el cambio de contraseña, puedes ignorar el mensaje</p>
        `
    })
}
export{
    emailRegistro,
    emailOlvidePassword
}