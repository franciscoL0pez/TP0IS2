# Makefile para detener los contenedores y liberar los puertos

# Comando para detener los contenedores sin eliminar nada
docker-down:
	@echo "Deteniendo los contenedores..."
	@docker-compose down

	@echo "Los contenedores han sido detenidos y los puertos han sido liberados."

# Comando para detener Docker completamente (si estás usando systemd)
docker-stop:
	@echo "Deteniendo Docker..."
	@sudo systemctl stop docker

	@echo "Docker ha sido detenido."


