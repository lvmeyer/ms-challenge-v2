# ms-challenge-v2

This project is a small micro services project for an e-commerce site.
We provide the environment to deploy it on any cloud provider.

## Run Locally

Build the project

```bash
  make build
```

```bash
  make start
```

Use your own .env based on the .env.local we provide
Database is not provided with docker-compose

Tests

```bash
  make test
```

## API Reference

#### HTTP: Salons (admin)

```http
  POST http://0.0.0.0:3000/api/v1/auth/register
```

```http
  POST http://0.0.0.0:3000/api/v1/auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

example of admin role endpoint

```http
  GET http://0.0.0.0:3000/api/v1/users
```

```http
  DELETE http://0.0.0.0:3000/api/v1/users/{id}
```

| Header   | Type                    | Description                    |
| :------- | :---------------------- | :----------------------------- |
| `Bearer` | `access_token` `string` | **Required**. Token from login |

| Parameter | Type   | Description                       |
| :-------- | :----- | :-------------------------------- |
| `id`      | `uuid` | **Required**. Id of item to fetch |

example of admin role endpoint

```http
  PATCH http://0.0.0.0:3000/api/v1/users/updateprofile
```

| Header   | Type                    | Description                    |
| :------- | :---------------------- | :----------------------------- |
| `Bearer` | `access_token` `string` | **Required**. Token from login |

| Body        | Type     | Description   |
| ----------- | -------- | ------------- |
| `firstname` | `string` | **Optionnal** |
| `lastname`  | `string` | **Optionnal** |

## Ecosystem

| Project        | Status      | Description                                     |
| -------------- | ----------- | ----------------------------------------------- |
| NestJS         | npm v9.4.0  | Framework for building Node.js web applications |
| Typeorm        | npm v9.0.1  | Object-relational mapping ou ORM                |
| Nestjs/jwt     | npm v10.1.0 | JSON Web Token                                  |
| MySQL          | npm v8.0    | Database                                        |
| React          | npm v18.2.0 | Javascript library                              |
| AWS            |             | Cloud Platform                                  |
| Terraform      | npm v1.5.0  | Infrastructure As Code                          |
| Kubernetes     | npm v4.5.7  | Automating deployment                           |
| Helm           | npm v3.12.0 | Automating deployment                           |
| Github Actions |             | Automate software workflows                     |

## Authors

- [@DanLevyM](https://www.github.com/DanLevyM)
- [@OdessaCh](https://github.com/OdessaCh)
