# foxentry-petr-lisak
 
Backend application to help mr. Petr Lisak manage his store

## Running application

First, install node packages with `npm install`. Then you need to create ***.env*** file. There is an example of env file in the solution.
Env file should contain MongoDB connection string and application port if needed. To execute unit tests, you need to create ***.env.test*** file, which can be similar.
However, your unit test database user needs a database deletion rights to clean up after running tests.

### Development

1) `npm run dev`

### Distro

1) `npm run build`
2) `npm run start`

### Unit tests

1) `npm run test`

### Docker

Application contains a _dockerfile_ alongside with _docker-compose.yaml_. Can be ran using docker if needed.

1) `docker-compose up --build`

## OpenAPI

After application is running, the API documentation can be found on endpoint `/api/reference`

## Used technologies

- Node.js runtime
- Typescript
- Express.js as web application library
- TSOA as REST API/Swagger doc builder
- MongoDB as database
- mongoose as ORM
- pino for logging
- jest for unit testing
