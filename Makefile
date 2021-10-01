prod-up:
	docker-compose --file docker-compose.prod.yml up --detach --remove-orphans --force-recreate --build

prod-down:
	docker-compose --file docker-compose.prod.yml down
