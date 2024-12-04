setup:
	npm ci
test:
	npx test
server:
	node server.js
seed:
	node seed.js
frontend:
	npx vite
clear:
	node clearDb.js
reset:
	make clear && make seed && make server