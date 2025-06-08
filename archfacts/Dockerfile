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

# Instalando o envsubst para substituir variaveis de ambiente no Nginx
RUN apk add --no-cache gettext

# Copia o template do Nginx
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Copia os arquivos do frontend para o Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]