# prod
- [ ] install docker and docker compose
- [ ] change the ports (80 and 443) to something else since these ports are already being used by webserver
  - [ ] (docker-compose.yaml/reverse-proxy/ports:)
    ```
    ports:
      - "82:80"
      - "445:443"
    ```

  - [ ] reroute the subdomain so it points to the traefik entrypoints
    ```
    server {
            listen 443 ssl ;
            server_name workadventure.pintu.io *.workadventure.pintu.io;

            location / {
                    proxy_pass  https://127.0.0.1:445;
                    include proxy.inc;
            }
    ```
- [ ] create a map server using github.io
  - [thecodingmachine/workadventure-map-starter-kit](https://github.com/thecodingmachine/workadventure-map-starter-kit)
- [ ] integrate map server into .env (START_ROOM_URL)
