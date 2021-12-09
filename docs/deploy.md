# prod
- [ ] install docker and docker compose
- [ ] copy contrib/docker/docker-compose.prod.yaml to docker-compose.yaml
- [ ] copy contrib/docker/.env.prod.template ot .env
- [ ] change the ports (80 and 443) to something else since these are already being used by your webserver. let said webserver (nginx) handle ssl so we need only the web entrypoint. remove redirections, especially when there is no enabled target or matching certificate.
  - [ ] (docker-compose.yaml/reverse-proxy/ports:)
    ```
    command:
      - --log.level=WARN
      - --providers.docker
      - --entryPoints.web.address=:80
    ports:
      - "82:80"
    ```

  - [ ] create subdomains for play.workadventure and pusher.workadventure including *matching* certificates
  - [ ] reroute the subdomains so they point to the traefik entrypoint. it is advisable to create a server each (location /room).
    ```
    server {
            listen 443 ssl ;
            server_name play.workadventure.my.domain.tld;
            ssl_certificate      /etc/pki/tls/certs/play.workadventure.my.domain.tld.bundle;
            ssl_certificate_key  /etc/pki/tls/private/play.workadventure.my.domain.tld.key;

            location / {
                    proxy_pass  https://127.0.0.1:82;
                    include proxy.inc;
            }
    server {
            listen 443 ssl ;
            server_name pusher.workadventure.my.domain.tld;
            ssl_certificate      /etc/pki/tls/certs/pusher.workadventure.my.domain.tld.bundle;
            ssl_certificate_key  /etc/pki/tls/private/pusher.workadventure.my.domain.tld.key;

            location / {
                    proxy_pass  https://127.0.0.1:82;
                    include proxy.inc;
            }
    ```
  - [ ] location /room in server pusher.workadventure.my.domain.tld is a websocket, so upgrade that connection. since all incomping traffic is handled by play.workadventure.my.domain.tld, listening on :80 is optional.
    ```
    location /room {
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "Upgrade";
            proxy_set_header Proxy "";
            proxy_set_header Host $http_host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_pass http://localhost:82;
    }
    ```
- [ ] create a map server using github.io
  - [thecodingmachine/workadventure-map-starter-kit](https://github.com/thecodingmachine/workadventure-map-starter-kit)
- [ ] integrate map server into .env (START_ROOM_URL)
- [ ] get the map editor [tiled](https://thorbjorn.itch.io/tiled?download) by [thorbjørn](https://itch.io/profile/thorbjorn), maybe follow him on (twitter)[https://twitter.com/thorbjorn81?lang=en]
