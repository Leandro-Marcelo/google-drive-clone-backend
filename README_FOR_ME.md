LEANDRO, REVISAR LOS TODO: xdd

HACER BIEN LOS DTOS,
AGREGAR ESTO

if (req.params === undefined || req.params === null) {
throw new MissingFieldInParamsException()
} y no solamente pasa con el params sino
mas con el body

Ya que el zod no valida bien cuando recibe
un json totalmente vacio o no le damos un json

Un repository tiene metodos y los params de
esos metodos deberían ser todos interfaces
para que dentro del código se respecte el
nombre y sea mas facil de entender

No debería haber un delete file by id, sino
DeleteManyFiles, lo mismo con las carpetas

Los archivos de las clases empiezan por mayúscula, los archivos de las funciones por minúscula.

API Docs: https://documenter.getpostman.com/view/19311828/2s93RWMq5U

Hice un video de como obtener las credenciales para hacer el auth provider con google

Hice un video de como crear un bucket en cloud storage, crear una cuenta de servicio y que esta cuenta de servicio pueda hacer acciones en el bucket, como obtener un object, subir un objecto, eliminar, etc.

Si clonan este repo las credenciales en formato JSON que da google para acceder al cloud storage debe llamarse "credentials-gcloud.json"
