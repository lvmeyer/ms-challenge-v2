# ms-challenge-v2

A micro services project for an e-commerce site.
We provide the environment to deploy it on any cloud provider.

## Run Locally

⚠️ To setup your project localy, create 2 `.env` inside `apis` and `vite-front` repositories, based on their respective `.env.local`. Only the mailer won't work as you need specific credentials for it.

Build the project

```bash
  make build
```

Seeders

```bash
  make seed
```

Tests

```bash
  make test
```

## API Reference

```
  POST http://0.0.0.0:3000/api/v1/auth/register
```

```
  POST http://0.0.0.0:3000/api/v1/auth/login
```

#### example of admin role endpoint

```
  GET http://0.0.0.0:3000/api/v1/users
```

```
  DELETE http://0.0.0.0:3000/api/v1/users/{id}
```

| Header   | Type                    | Description                    |
| :------- | :---------------------- | :----------------------------- |
| `Bearer` | `access_token` `string` | **Required**. Token from login |

| Parameter | Type   | Description                       |
| :-------- | :----- | :-------------------------------- |
| `id`      | `uuid` | **Required**. Id of item to fetch |

#### example of user role endpoint

```
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
| PostgreSQL     |             | Database                                        |
| React          | npm v18.2.0 | Javascript library                              |
| AWS            |             | Cloud Platform                                  |
| Terraform      | npm v1.5.0  | Infrastructure As Code                          |
| Kubernetes     | npm v4.5.7  | Automating deployment                           |
| Helm           | npm v3.12.0 | Automating deployment                           |
| Github Actions |             | Automate software workflows                     |

## Authors

[@lvmeyer](https://www.github.com/lvmeyer)
[@OdessaCh](https://github.com/OdessaCh)
