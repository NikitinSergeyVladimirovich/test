init:
	sudo apt install docker-compose && \
	sudo usermod -aG docker $$USER && \
	sudo service docker restart

rm:
	docker-compose stop \
	&& docker-compose rm \

up:
	docker-compose -f docker-compose.yml up --force-recreate && \
	npm i && \
	npx prisma migrate dev --name init