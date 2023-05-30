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
	docker run -p 3002:3002 --name products_c -t -d products

stopcont:
	docker rm products_c -f

# Dockerhub 
img:
	docker build -t products:1.0 -f ./apis/apps/products/Dockerfile ./apis

tag:
	docker tag products:1.0 danlevypro/products:1.0

pushimg:
	docker push danlevypro/products:1.0

sendtohub: img tag pushimg