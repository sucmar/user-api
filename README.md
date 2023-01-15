# user-api
This project contains a basic user-api request `CRUD` and has been created using the following stacks `nodejs`, `javascript`, `postgres` and been deployed on `render` services
## author
 dev: marco baltazar
 email: mabsbaltazar@gmail.com
 cel: 60717546
### github Repository
https://github.com/sucmar/user-api

### Instalation
In order to run app you have to clone the code then run the following scripts: 
```sh
npm install
node main.js
```
### sql script
to create the usuarios table on the db
```sql
create table usuarios (
   id serial primary key,
   nombreCompleto varchar (1000) not null,
   edad integer not null
);
```
### Description
the user-api project has been deployed on render services 
the hosting name is https://user-api-qij9.onrender.com/

### user-api endpoints
### GET 
https://user-api-qij9.onrender.com/usuarios
https://user-api-qij9.onrender.com/usuarios/promedio-edad
https://user-api-qij9.onrender.com/usuarios/status
### POST
`req.body` example 
```json
{
    "nombreCompleto": "el pepe",
    "edad": 35
}
```
https://user-api-qij9.onrender.com/usuarios
### PUT
the `id` needs to be sent as `req.params`
`body` example 
```json
{
    "nombreCompleto": "el pepe new update",
    "edad": 35
}
```
https://user-api-qij9.onrender.com/usuarios/:id
### DELETE
the `id` needs to be sent as `req.params` 
https://user-api-qij9.onrender.com/usuarios/:id
