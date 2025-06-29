# Nodepop

Nodepop es un sitio web de ventas de productos de segunda mano. Los usuarios pueden agregar productos, visualizarlos y eliminarlos.

## Instalación

1. Clona el repositorio en tu máquina local:

```bash
git clone https://github.com/jessicalcd/Practica_Backend_Avanzado_Jess.git
cd nodepop
```


2. Instala las dependencias con:

```sh
npm install
```

3. Copiar variables de entorno de ejemplo a .env:

```sh
cp .env.example .env
```

4. Revisa los nuevos valores .env para que coincidan con su configuración.
   

5. Usa el siguiente comando para inicializar la base de datos:

```sh
npm run initDB
```

6. Inicia el servidor:

```sh
npm run dev
```

7. Abre tu navegador y ve a http://localhost:3000 para ver la lista de productos.


## API

Base URL: http://localhost:3000/api

## Lista de productos

GET /api/products

```json
{
    "results": [
        {
            "_id":"685d8849b1121c04377cee6c",
            "name":"iPhone 13 Pro Max",
            "owner":"685d8849b1121c04377cee63",
            "price":1100,
            "tags":["mobile"],
            "__v":0
        },
        {
            "_id":"685d8849b1121c04377cee6a",
            "name":"Zapatillas Nike Air Max",
            "owner":"685d8849b1121c04377cee63",
            "price":100,
            "tags":["lifestyle"],
            "__v":0
        },
    ]
}
```

## Producto por su ID

GET /api/products/:productId


## Producto con imagen

POST /api/products


## Actualizar un producto

PUT /api/products/:productId


## Eliminar un producto

DELETE /api/products/:productId

