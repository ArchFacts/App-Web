FROM node:23-slim as builder

WORKDIR /app

# Copiando os arquivos de config de dependencia para otimizar o cache
COPY package.json package-lock.json ./

RUN npm install

COPY . .

# Executando o comando de build do projeto
RUN npm run build

# Imagem de Nginx leve 
FROM nginx:stable-alpine3.21 as server

# Copianado os arquivos gerados no build para o diretório do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]