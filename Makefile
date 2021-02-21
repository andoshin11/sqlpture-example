.PHONY: start-db
start-db:
	docker-compose up -d db

.PHONY: restore-db
restore-db:
	docker exec -i db-container pg_restore -U postgres -d dvdrental /tmp/dvdrental.tar

.PHONY: backup-db
backup-db:
	pg_dump -h localhost -p 15432 -U postgres --password --format=t dvdrental > dvdrental.tar

.PHONY: start-server
start-server:
	cd server; yarn run start
