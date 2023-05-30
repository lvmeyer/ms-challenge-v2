.PHONY: start stop restart

build:
	docker-compose up --build -V

start:
	docker-compose up

stop:
	docker-compose down --remove-orphans

restart: stop start

img:
	docker build -t products -f ./apis/apps/products/Dockerfile ./apis

runcont:
	docker run -p 3002:3002 --name products_c -t -d products

stopcont:
	docker rm products_c -f
	