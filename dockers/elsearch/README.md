# Elasticsearch Docker Image
## Get started

* Install docker from docker website.
* CD into this dir and create a docker image with `docker build -t esdocker .`
* Create a volume to store elasticsearch's data persistently with `docker volume create --name esdata`
* Run elasticsearch in a docker with the esdata volume by `docker run -d -ti -p 9200:9200 -v esdata:/usr/share/elasticsearch/data esdocker`
