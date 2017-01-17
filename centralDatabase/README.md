# PostgrSQL Docker Image
## Get started


### From run individual docker container
* Install docker onto server
* Start an instance of the postgreSQL/PostGIS docker image from mdillon
`docker run --name <POSTGRES_DB_NAME> -e POSTGRES_PASSWORD=<YOUR_PASSWORD> -e POSTGRES_USER=<ADMIN_USER> -d mdillon/postgis`

<!-- TODO: set up docker compose file -->
### From docker compose file
* Install docker onto server
* Clone master repo into server
* Run docker compose file
`docker-compose up -d`



> https://hub.docker.com/r/mdillon/postgis/
> https://github.com/sameersbn/docker-postgresql
