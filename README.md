# Mediumclaps


## Setup

Para iniciar o projeto no modo de desenvolvimento utilize os seguintes comandos:

```sh
yarn dev
```

## Docker
Para criar a imagem do docker utlize o comando:

```sh
docker build -t next-image . --file="./Dockerfile"
```

Para executar a imagem:
```sh
docker run -v $(pwd):/home/node/app -p 3000:3000 --rm --name next-container next-image
```

Verificar a aplicação

```sh
localhost:3000
```