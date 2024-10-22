## Project setup

```bash
$ npm install
```
## Compile and run the project and bdd with docker (Recommended)

```bash
# start docker
$ npm run start:docker

# end docker
$ npm run end:docker
```

## Compile and run the project

```bash
# development
$ npm run start
```

## Run tests

```bash
# unit tests
$ npm run test
```

## Comments and relevant information

No alcancé a terminar la prueba. 

En el postman se puede probar de forma local, existen 3 endpoints disponibles:

add forms (POST): añadir un formulario, el endpoint es http://localhost:4200/forms y el body requerido de ejemplo es: 
```json
{
    "name": "Formulario de ejemplo",
    "description": "Detalle de casos",
    "fields": [
        {
            "name": "first_name 2",
            "label": "Primer nombre",
            "type": "text",
            "required": false
        },
        {
            "name": "option_1",
            "label": "Opciones",
            "type": "select",
            "required": true,
            "values": [
                "Sí",
                "No"
            ],
            "defaultValue": "No"
        }
    ]
}
```
get forms (GET): muestra todos los forms guardados, el endpoint es: http://localhost:4200/forms

find form (GET): busca un formulario en específico, el endpoint es: http://localhost:4200/forms/:id siendo el id el id del form.

Base de datos: La base de datos es una MySQL y está dockerizada con Docker Compose, por lo que solo basta levantarla con los script mencionados anteriormente. 