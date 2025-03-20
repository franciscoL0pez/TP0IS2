
# 📌 Tabla de Contenido
1. [Introducción](#introducci%C3%B3n)
2. [Desafíos del Proyecto](#desaf%C3%ADos-del-proyecto)
3. [Pre-requisitos](#pre-requisitos)
4. [Guía de Pruebas](#gu%C3%ADa-de-pruebas)
5. [Docker](#docker)
   - [Construcción de la Imagen y los containers](#construcci%C3%B3n-de-la-imagen)
   - [Correr la Base de Datos](#correr-la-base-de-datos)
   - [Correr la Imagen del Servicio](#correr-la-imagen-del-servicio)

---

## 📌 Introducción
Este proyecto es una API RESTful desarrollada en Node.js con Express y MongoDB, diseñada para la gestión de cursos en una plataforma educativa. La solución permite crear, leer, actualizar y eliminar cursos, siguiendo principios de buenas prácticas en arquitectura de software y pruebas automatizadas.

---

## 🚀 Desafíos del Proyecto
El mayor desafio que tuve durante el proyecto fue aplicar una base de datos NoSql y docker, ya que no habia teniado expriencia usado ninguna de las dos. Sobre todo el uso de docker, ya que lo habia intentado antes de la clase y no podia conectar la api con la base de datos al principio, pero despues de realizar muchas pruebas (y leer bastante la docu) se logro. Al final decidi desplegar docker con un docker-compose para facilitar la creacion de la imagen y de los contenedores.

---

## 🔧 Pre-requisitos en caso de usarlo a nivel local
Antes de ejecutar el proyecto, asegúrate de tener instalado:

- **Node.js** 
- **npm** 
- **Docker** y **Docker Compose**
- **MongoDB**
- **Express**
- **Dotenv**
- **Winston**

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

## 📌 Guía de Pruebas
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

## 🐳 Docker

### 🔨 Construcción de la Imagen y los contenedores
Para construir la imagen Docker del servicio y los contenedores de la base de datos y el server:

```sh
docker compose build 
```

### 🚀 Correr la Base de Datos
Para levantar la imagen y conectar los contenedores creados:

```sh
docker compose up
```

## 💻 Correr la

¡Listo! Ahora tu API debería estar corriendo en `http://localhost:7070`. 🚀


