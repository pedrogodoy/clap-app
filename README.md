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

Para conectar e utilizar o SSR do next, deve-ve descobrir o ip do container da API node, executando comando:

```sh
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' node-container
```

O ip deve ser colocado na constante API_URL, dentro do arquivo pages/api/claps/index.ts

Para executar a imagem:
```sh
docker run -v $(pwd):/home/node/app -p 3000:3000 --rm --name next-container next-image
```

Verificar a aplicação

```sh
localhost:3000
```