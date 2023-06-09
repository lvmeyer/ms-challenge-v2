.PHONY: build start stop restart img runcont stopcont tag pushimg hub seed test

# Local
build:
	docker-compose up --build -V

start:
	docker-compose up

stop:
	docker-compose down --remove-orphans

restart: stop start

runcont:
	docker run -p 80:80 --name front_c -t -d front:latest
	docker run -p 3000:3000 --name gw_c -t -d gw:latest
	docker run -p 3002:3002 --name products_c -t -d products:latest
	docker run -p 3003:3003 --name basket_c -t -d basket:latest
	docker run -p 3004:3004 --name payment_c -t -d payment:latest

stopcont:
	docker rm gw_c -f
	docker rm products_c -f
	docker rm basket_c -f
	docker rm payment_c -f

seed:
	npm install --prefix ./seed
	npm run start --prefix ./seed

test:
	npm run test --prefix ./apis

# Dockerhub 
img:
	docker build -t front:latest -f ./vite-front/Dockerfile ./vite-front
	docker build -t gw:latest -f ./apis/apps/gateway/Dockerfile ./apis
	docker build -t products:latest -f ./apis/apps/products/Dockerfile ./apis
	docker build -t basket:latest -f ./apis/apps/basket/Dockerfile ./apis
	docker build -t payment:latest -f ./apis/apps/payment/Dockerfile ./apis
	docker build -t billings:latest -f ./apis/apps/billings/Dockerfile ./apis

tag:
	docker tag front:latest danlevypro/front:latest
	docker tag gw:latest danlevypro/gw:latest
	docker tag products:latest danlevypro/products:latest
	docker tag basket:latest danlevypro/basket:latest
	docker tag payment:latest danlevypro/payment:latest
	docker tag billings:latest danlevypro/billings:latest

pushimg:
	docker push danlevypro/front:latest
	docker push danlevypro/gw:latest
	docker push danlevypro/products:latest
	docker push danlevypro/basket:latest
	docker push danlevypro/payment:latest
	docker push danlevypro/billings:latest

hub: img tag pushimg

#	docker build -t front:latest -f ./Dockerfile . && docker tag front:latest danlevypro/front:latest && docker push danlevypro/front:latest