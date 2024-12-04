setup:
	npm ci
test:
	npx test
start:
	npm start
server:
	node server.js
seed:
	node backendUtils/seed.js
frontend:
	npx vite
clear:
	node backendUtils/clearDb.js
reset:
	make clear && make seed && make server
test:
	npm run test