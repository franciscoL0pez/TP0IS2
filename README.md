
# 📌 Tabla de Contenido
1. [Introducción](#introducci%C3%B3n)
2. [Desafíos del Proyecto](#desaf%C3%ADos-del-proyecto)
3. [Pre-requisitos](#pre-requisitos)
4. [Guía de Pruebas](#gu%C3%ADa-de-pruebas)
5. [Docker](#docker)
   - [Construcción de la Imagen](#construcci%C3%B3n-de-la-imagen)
   - [Correr la Base de Datos](#correr-la-base-de-datos)
   - [Correr la Imagen del Servicio](#correr-la-imagen-del-servicio)

---

## 📌 Introducción
Este proyecto es una API RESTful desarrollada en Node.js con Express y MongoDB, diseñada para la gestión de cursos en una plataforma educativa. La solución permite crear, leer, actualizar y eliminar cursos, siguiendo principios de buenas prácticas en arquitectura de software y pruebas automatizadas.

---

## 🚀 Desafíos del Proyecto
Uno de los mayores desafíos fue estructurar la aplicación bajo un enfoque de "package by layer" y garantizar que la API fuera fácilmente desplegable utilizando Docker. Además, implementar pruebas E2E con Jest y manejar transacciones en MongoDB mediante sesiones fue un reto significativo.

---

## 🔧 Pre-requisitos
Antes de ejecutar el proyecto, asegúrate de tener instalado:

- **Node.js** (v18 o superior)
- **npm** o **yarn**
- **Docker** y **Docker Compose**
- **MongoDB** (puedes usar una instancia local o en contenedor)

Para instalar dependencias, ejecuta:

```sh
npm install
```

O si usas yarn:

```sh
yarn install
```

---

## 📌 Guía de Pruebas
Este proyecto utiliza **Jest** y **Supertest** para realizar pruebas E2E.

- Documentación de Jest: [https://jestjs.io/docs/getting-started](https://jestjs.io/docs/getting-started)
- Supertest: [https://github.com/visionmedia/supertest](https://github.com/visionmedia/supertest)

Para ejecutar las pruebas, usa:

```sh
npm test
```

---

## 🐳 Docker

### 🔨 Construcción de la Imagen
Para construir la imagen Docker del servicio, ejecuta:

```sh
docker build -t classconnect-api .
```

### 🛢 Correr la Base de Datos
Para levantar una instancia de MongoDB con Docker:

```sh
docker run -d --name mongodb -p 27017:27017 mongo
```

O si prefieres usar **Docker Compose**, crea un archivo `docker-compose.yml` y levántalo con:

```sh
docker-compose up -d
```

### 🚀 Correr la Imagen del Servicio
Una vez construida la imagen, ejecuta:

```sh
docker run -d -p 7070:7070 --env-file .env classconnect-api
```

Si la API usa variables de entorno, asegúrate de tener un archivo `.env` con la configuración necesaria antes de ejecutar el contenedor.

---

¡Listo! Ahora tu API debería estar corriendo en `http://localhost:7070`. 🚀


