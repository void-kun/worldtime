FROM nginx:latest

WORKDIR /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=worldtime-wtbui /app/dist .

EXPOSE 80
