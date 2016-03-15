#!/usr/bin/env bash
./cp_docker_compose_dev.sh
./cp_env_dev.sh
chmod -R 777 storage
chmod -R 777 bootstrap/cache
docker-compose build
docker-compose stop
docker-compose rm --force
docker-compose up -d
docker-compose run composer install
docker-compose run artisan key:generate
docker-compose run artisan migrate
docker-compose run artisan update:products
docker-compose run artisan update:cities
docker-compose run artisan update:suburbs