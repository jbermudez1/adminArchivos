#!/usr/bin/env bash
./cp_docker_compose_pro.sh
./cp_env_prod.sh
chmod -R 777 storage
docker-compose build
docker-compose stop
docker-compose up -d --force-recreate
docker-compose run composer install
docker-compose run artisan key:generate
docker-compose run artisan migrate