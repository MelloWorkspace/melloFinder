# Стейдж для сборки
FROM node:22-alpine as build

WORKDIR /app

COPY package*.json ./ 

# FIXME Устанавливаем зависимости (легаси депенденсы из-за 19го реакта)
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build 

FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]