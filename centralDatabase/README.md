# PostgrSQL Docker Image
## Get started

* Install docker from docker website.
* Start an instance of the postgreSQL/PostGIS docker image from mdillon
`docker run --name <POSTGRES_DB_NAME> -e POSTGRES_PASSWORD=<YOUR_PASSWORD> -e POSTGRES_USER=<ADMIN_USER> -d mdillon/postgis`
* Run elasticsearch in a docker with the esdata volume by
`docker run -it --link <POSTGRES_DB_NAME>:postgres --rm postgres \
    sh -c 'exec psql -h "$POSTGRES_PORT_5432_TCP_ADDR" -p "$POSTGRES_PORT_5432_TCP_PORT" -U postgres'`


> https://hub.docker.com/r/mdillon/postgis/
> https://github.com/sameersbn/docker-postgresql
