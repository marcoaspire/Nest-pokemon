<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```
yarn install
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```

4. Levantar la base de datos
```
docker-compose up -d
```

5. CLONAR EL ARCHIVO __.env.template__ y renombrar a __.env__

6. Llenar las variables de entorno definidas en __.env__

7. Run app
```
nest start --watch
```

8. Reconstruir la db con la semilla, cuando la db se encuentre vacia
```
Get: http://localhost:3000/api/v2/seed
```


## Stack usado
* MongoDB
* Nest