# 📌 Table of Contents
1. [Proposed Solution](#-proposed-solution)  
2. [Project Challenges](#-project-challenges)  
3. [Prerequisites for Local Usage](#-prerequisites-for-local-usage)  
4. [Testing Guide](#-testing-guide)  
5. [Database](#-database)  
6. [Docker](#-docker)  
   - [Building the Image and Containers](#-building-the-image-and-containers)
7. [Postman](#-postman)

---

## 📌 Proposed Solution
This project is a RESTful API developed in Node.js with Express and MongoDB, designed for course management in an educational platform. The solution was implemented according to the OpenAPI 3.0 specification.

Automated tests were applied, both unit and E2E, using Jest, and Docker was integrated to facilitate deployment. Additionally, error handling based on RFC 7807 was implemented along with an organized architecture under the "package by layers" approach. For additional testing, Postman was used.

As a complement, a Docker Compose file was created to simplify the creation and launch of the API. Two .env files were also defined that allow configuring two different environments:

Development, to run the project locally.
Production, to run it within Docker.
Both contain everything necessary for the correct configuration of the database and server. Since two different environments are used, two databases were utilized.

---

## 🚀 Project Challenges
The biggest challenge I had during the project was implementing a NoSQL database and Docker, since I had no previous experience using either of them. Especially using Docker, as I had tried it before the class and couldn't connect the API with the database container at first, but after performing many tests (and reading a lot of documentation) it was achieved. In the end, I decided to deploy Docker with a docker-compose to facilitate the creation of the image, containers, and their connection.

---

## 🔧 Prerequisites for Local Usage
Before running the project, make sure you have installed:

- **Node.js (v18.19.1)** 
- **npm (9.2.0)** 
- **Docker (28.0.1)** and **Docker Compose (v2.30.3)**
- **MongoDB (v8.0.5)**
- **Express (4.21.2)**
- **Dotenv (16.4.7)**
- **Winston (3.17.0)**

To install dependencies, run:

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

## 📌 Testing Guide
This project uses **Jest** and **Supertest** to perform E2E tests.

- Jest Documentation: [https://jestjs.io/docs/getting-started](https://jestjs.io/docs/getting-started)
- Supertest: [https://github.com/visionmedia/supertest](https://github.com/visionmedia/supertest)

To run tests both locally and using Docker containers:

```sh
npm test
```
To see code coverage:
```sh
npm run testCoverage
```
---
## 💻 Local
If we want to run our API locally, once we have all the [Prerequisites](#-prerequisites-for-local-usage) installed, we execute:

```sh
npm start 
```
Important note: since the node_modules folder is being ignored with gitignore, it might ask to install express.

This way the server will run on port 8080 and connect to our database. Similarly, by opening another terminal we can operate on the db or use Postman for testing.

## 🐳 Docker

### 🔨 Building the Image and Containers
To build the Docker image of the service and the database and server containers:

```sh
docker compose build 
```
To start everything:
```sh
docker compose up
```
### To perform any operation we must enter the containers

To list our containers:
```sh
docker ps
```
To open a bash in one of our containers:
```sh
docker exec -it <container_name> bash
```

To stop the program, a make file was created, using the command:
```sh
make docker-down
```
will stop Docker completely.

In the "server" container will be our API and in the "mongodb" container our database. We can run tests and interact with the db normally.

## 🗄️ Database

It can be executed in two ways:

🔹 Using a local MongoDB installation

Being at the local level, it's enough to have the dependencies installed for everything to run correctly. 
Once the API is started, we can apply some commands to our db such as:

Connect to the manager:
```sh
mongosh 
```

Show our databases:
```sh
show databases
```
Access a specific one (in our case coursesDB):
```sh
use coursesDB
```
List our collections:
```sh
show collections
```
Show what's inside them (in our case we want to see courses):
```sh
db.courses.find().pretty()
```
To apply any type of CRUD operation in mongo we can consult: [MongoDB](https://www.mongodb.com/es/resources/products/fundamentals/crud)

🔹 Using Docker

In the case of using Docker, the "mongo" image from dockerHub is used directly, so once the dockerCompose is executed, the db could be accessed.
To access the container we will use the steps in the [Docker](#-docker) section and once we are inside we can operate on the db with the same operations mentioned above.

## 📬 Postman
In case you want to test the app by sending requests through Postman, here are the corresponding HTTP endpoints:

Local execution:
```sh
http://localhost:8080/api/courses
```

Docker execution:
```sh
http://localhost:3000/api/courses
```
