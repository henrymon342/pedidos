# MiniBackend Pedidos

🔹 Minibackend usando el modelo 3 capas, considerando la arquitectura multitenant para el requerimiento de la vista adjunta.
Utiliza JavaScript, MongoDB, Nodejs Express.

## Características principales (Funcionalidades)
- Para resolver el tema multitenant se debe añadir en la cabeceza de la peticion el objeto, siendo value El identificador del tenant

**Importante:**  Todos las operaciones dependeran de este objeto en la cabecera.

```json
{
    "key":"x-tenant-id",
    "value":"Tienda 1"
}
```

- Creacion de un pedido, requiere el siguiente objeto
POST
http://localhost:3030/orders

```json
{
  "client": "Xavier",
  "total": 20.00,
  "items": [
    { "name": "Café Latte", "quantity": 2, "price": 10 }
  ]
}
```

- Modificar pedido
PUT
http://localhost:3030/orders/686340afddb368839c811401


```json
{
  "client": "Xavier",
  "total": 20.00,
  "items": [
    { "name": "Café Latte", "quantity": 2, "price": 10 }
  ]
}
```

- Listar pedidos
GET
http://localhost:3030/orders


- Obtener pedido por Id
GET
http://localhost:3030/orders/686340afddb368839c811401

- Eliminar pedido
 DELETE
http://localhost:3030/orders/686340afddb368839c811401

- Obtener pedidos por estado si es "Cerrado" o "En Curso"
GET
    - http://localhost:3030/orders/status/Cerrado
    - http://localhost:3030/orders/status/En%20Curso

- Asignar estado de pedido
POST
    http://localhost:3030/orders/status/686340afddb368839c811401
```json
{
  "status": "Cerrado"
}
```

## Requisitos
- Node.js v20
- express v5
- MongoDB v8

## Instalación
```bash
npm install
npm run dev