# 📌 Tabla de Contenido
1. [Solución planteada](#-solucion-planteada)  
2. [Desafíos del Proyecto](#-desafios-del-proyecto)  
3. [Pre-requisitos](#-pre-requisitos-en-caso-de-usarlo-a-nivel-local)  
4. [Guía de Pruebas](#-guia-de-pruebas)  
5. [Base de Datos](#-base-de-datos)  
6. [Docker](#-docker)  
   - [Construcción de la Imagen y los Contenedores](#-construccion-de-la-imagen-y-los-contenedores)  

---

## 📌 Solucion planteada
Este proyecto es una API RESTful desarrollada en Node.js con Express y MongoDB, diseñada para la gestión de cursos en una plataforma educativa. La solución fue implementada conforme a la especificación de OpenAPI 3.0.

Se aplicaron pruebas automatizadas, tanto unitarias como E2E, utilizando Jest, y se integró Docker para facilitar su despliegue. Además, se implementó un manejo de errores basado en RFC 7807 y una arquitectura organizada bajo el enfoque "package by layers". Para pruebas adicionales, se utilizó Postman.

Como complemento, se creó un archivo Docker Compose para simplificar la creación y el lanzamiento de la API. También se definieron dos archivos .env que permiten configurar dos entornos diferenciados:

Desarrollo, para ejecutar el proyecto de manera local.
Producción, para ejecutarlo dentro de Docker.
Ambos contienen todo lo necesario para la correcta configuracion de la base de datos y el servidor.


---

## 🚀 Desafios del Proyecto
El mayor desafio que tuve durante el proyecto fue aplicar una base de datos NoSql y docker, ya que no habia teniado experiencia usado ninguna de las dos. Sobre todo el uso de docker, ya que lo habia intentado antes de la clase y no podia conectar la api con los contenedor de la base de datos al principio, pero despues de realizar muchas pruebas (y leer bastante la docu) se logro. Al final decidi desplegar docker con un docker-compose para facilitar la creacion de la imagen, los contenedores y su conexion.

---

## 🔧 Pre-requisitos en caso de usarlo a nivel local
Antes de ejecutar el proyecto, asegúrate de tener instalado:

- **Node.js (v18.19.1)** 
- **npm (9.2.0)** 
- **Docker (28.0.1)** y **Docker Compose (v2.30.3)**
- **MongoDB (v8.0.5)**
- **Express (4.21.2)**
- **Dotenv (16.4.7)**
- **Winston (3.17.0)**

Para instalar dependencias, ejecutar:

```sh
npm install node
```

```sh
npm install express
```

```sh
npm i nodemon -D
```

```sh
npm i mongoose
```

```sh
npm i dotenv
```

```sh
npm install winston
```

---

## 📌 Guia de Pruebas
Este proyecto utiliza **Jest** y **Supertest** para realizar pruebas E2E.

- Documentación de Jest: [https://jestjs.io/docs/getting-started](https://jestjs.io/docs/getting-started)
- Supertest: [https://github.com/visionmedia/supertest](https://github.com/visionmedia/supertest)

Para ejecutar las pruebas tanto ejecucion a nivel local como utilizando los contonedores de docker:

```sh
npm test
```
Para ver la cobertura del codigo:
```sh
npm run testCoverage
```
---
## 💻 Local
Si queremos correr nuestra api a nivel local, una vez que tengamos todos los [Pre-requisitos](#-pre-requisitos-en-caso-de-usarlo-a-nivel-local) instalados ejecutamos:

```sh
npm start 
```
Importante que, como se esta ignorando la carpeta node_modules con un gitignore tal vez pida instalar express.

De esta forma se ejecutara el servidor en el puerto 8080 y conenctara nuestra base de datos, asi mismo abriendo otra terminal podremos operar sobre la db o
utilizandos postman para testear.

## 🐳 Docker

### 🔨 Construcción de la Imagen y los contenedores
Para construir la imagen Docker del servicio y los contenedores de la base de datos y el server:

```sh
docker compose build 
```
Para levantar todo:
```sh
docker compose up
```
### Para poder realizar cualquier operacion debemos ingresar a los contenedores

Para listar nuestros contenedores:
```sh
docker ps
```
Para abrir una bash en alguno de nuestros contenedores:
```sh
docker exec -it <nombre_del_contenedor> bash
```

Para poder detener el programa se creo un archivo make, utilizando el comando:
```sh
make docker-down
```
se detendra docker por completo.

En el contenedor de "server" estara nuestra api y en el de "mongodb" nuestra base de datos, podremos ejecutar los test y interactuar con la db de manera normal.

## 🗄️ Base de Datos

Puedes ejecutarse de dos maneras:

🔹 Usando una instalación local de MongoDB

Estando a nivel local alcanza con tener instaladas las dependencias para que todos se ejecute correctamente. 
Una vez iniciado la api podemos aplicar algunos comandos a nuestra db como:

Conectarnos al gestor:
```sh
mongosh 
```

Mostrar nuestras bases de datos:
```sh
show databases
```
Acceder a una especifica (en nuestro caso coursesDB):
```sh
use coursesDB
```
Listar nuestras colleciones:
```sh
show collections
```
Mostar que hay dentro de ellas (en nuestro caso queremos ver courses):
```sh
db.courses.find().pretty()
```
Para aplicar cualquier tipo de operacion crud en mongo podemos consultar: [MongoDB](https://www.mongodb.com/es/resources/products/fundamentals/crud)

🔹 Usando Docker

En el caso de usar docker se utilizar directamente la imagen "mongo" de dockerHub, por lo que una vez ejecutado el dockerCompose ya se podria acceder a la db.
Para acceder al contenedor utilizaremos los pasos en la seccion de [Docker](#-docker) y una vez nos encontremos dentro podremos operar sobre la db con las mismas operaciones nombradas anteriormente.



