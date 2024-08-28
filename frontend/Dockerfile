# Usar una imagen base con Node.js
FROM node:18-alpine as build

# Crear un directorio para la aplicación
WORKDIR /usr/app

# Copiar el package.json y package-lock.json
COPY . /usr/app

# Instalar las dependencias
RUN npm ci

# Copiar el código fuente de la aplicación
# COPY . .

# Compilar la aplicación
RUN npm run build

FROM nginx:1.23.1-alpine

# Exponer el puerto en el que se servirá la aplicación (normalmente 5173 para Vite en desarrollo)
EXPOSE 80

COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/app/dist /usr/share/nginx/html

# Comando para ejecutar la aplicación
# CMD ["npm", "run", "serve"]