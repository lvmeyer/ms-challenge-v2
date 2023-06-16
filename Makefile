.PHONY: build start stop restart img runcont stopcont tag pushimg sendtohub

# Local
build:
	docker-compose up --build -V

start:
	docker-compose up

stop:
	docker-compose down --remove-orphans

restart: stop start

runcont:
	docker run -p 80:80 --name front_c -t -d front:1.0
	docker run -p 3000:3000 --name gw_c -t -d gw:1.0
	docker run -p 3002:3002 --name products_c -t -d products:1.0

stopcont:
	docker rm products_c -f

# Dockerhub 
img:
#	docker build -t front:1.0 -f ./vite-front/Dockerfile ./vite-front
	docker build -t gw:1.0 -f ./apis/apps/gateway/Dockerfile ./apis
#	docker build -t products:1.0 -f ./apis/apps/products/Dockerfile ./apis

tag:
#	docker tag front:1.0 danlevypro/front:1.0
	docker tag gw:1.0 danlevypro/gw:1.0
#	docker tag products:1.0 danlevypro/products:1.0

pushimg:
#	docker push danlevypro/front:1.0
	docker push danlevypro/gw:1.0
#	docker push danlevypro/products:1.0

sendtohub: img tag pushimg

#	docker build -t front:1.0 -f ./Dockerfile . && docker tag front:1.0 danlevypro/front:1.0 && docker push danlevypro/front:1.0