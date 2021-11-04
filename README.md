# Minesweeper API

Esta es una API desarrollada para el desafío técnico de TAP, utlizando NodeJs + ExpressJs con TypeScript y PostgreSQL.

## Entidades o tipos importantes

- Celda: Cada celda del tablero de una partida.
    ```typescript
    interface Cell {
        value: number;
        status: number;
    }
    ```
- Partida: Representa una partida de Buscaminas.

    ```typescript
    interface Game {
        id?: number;
        board: Cell[][];
        rows: number;
        columns: number;
        cellsCleared: number;
    }
    ```

- Status: Estado en el que se encuentra una celda.

    ```typescript
    enum Status {
        0 = 'Cubierta',
        1 = 'Descubierta',
        2 = 'Con bandera'
    }
    ```

- Value: Representa el valor de la celda, es decir cuántas minas hay alrededor o si es una mina.

    ```typescript
    enum Value {
        0 = 'La celda no tiene minas alrededor.',
        1 = 'La celda tiene 1 minas alrededor.',
        2 = 'La celda tiene 2 minas alrededor.',
        3 = 'La celda tiene 3 minas alrededor.',
        4 = 'La celda tiene 4 minas alrededor.',
        5 = 'La celda tiene 5 minas alrededor.',
        6 = 'La celda tiene 6 minas alrededor.',
        7 = 'La celda tiene 7 minas alrededor.',
        8 = 'La celda tiene 8 minas alrededor.',
        9 = 'La celda es una mina.'
    }
    ```

## Endpoints
### `[GET] /api/`
    Retorna una nueva partida, que contiene un tablero de 8x8 celdas, la cantidad de celdas descubiertas, la cantidad de celdas y la cantida de filas.

### `[GET] /api/:gameId`
    Retorna la partida con el id solicitado. En caso de no exitir, retorna un HTTP status 404.

### `[POST] /api/`
    Recibe una partida en el body. Si esta partida tiene un id, actualizará esa partida en la base de datos, de lo contrario creará una nueva partida y la guardará en la base de datos. Retorna la partida guardada, o un error 400 en caso de haber problemas en la base de datos o de recibir una partida con un formato incorrecto.


## Requerimientos para levantar el proyecto
 - NPM
 - Docker

## Variables de entorno

`PORT`: Puerto de la aplicación, si se elige otro distinto al puerto 3001 hay que actualizar .Dockerfile y docker-compose.yml si se va a levantar con docker-compose.
`DB_USER`: Usuario de la base de datos, actualizar también en docker-compose si se va a levantar con docker-compose.
`DB_PASSWORD`: Contraseña de la base de datos, actualizar también en docker-compose si se va a levantar con docker-compose.
`DB_HOSTNAME`:  `localhost` para la aplicación en local, `postgres` para la aplicación con docker-compose. Actualizar también en docker-compose.yml si se va a levantar con docker-compose.
`DB_NAME`: Nombre de la base de datos, actualizar también en docker-compose si se va a levantar con docker-compose


## Pasos para levantar el proyecto local

### Proyecto local y base de datos en Docker

1. Copiar el archivo .env.example en un nuevo archivo .env y completar los valores correspondientes

2. Dentro de la carpeta del proyecto `npm install`

3. Para levantar la base de datos 
`docker run --name postgresql -p 5432:5432 -e POSTGRES_PASSWORD=newPassword -e POSTGRES_USER=admin -e POSTGRES_DB=minesweeperdb --volume /srv/docker/postgresql:/var/lib/postgresql -d postgres:14-alpine`

Con esto levantamos un contenedor de docker con el nombre postgresql (el nombre se puede cambiar), publicamos el puerto 5432 en el puerto 5432 de nuestra computadora (es el puerto por defecto de PostgreSQL), seteamos las variables de entorno POSTGRES_PASSWORD, POSTGRES_USER y POSTGRES_DB, que utiliza la imagen para crear un usuario, contraseña y bases de datos. 

4. Dentro de la carpeta del proyecto `npm run dev`

### Docker compose

Para probar la aplicación simplemente podemos levantarla con 

`docker-compose up -d`