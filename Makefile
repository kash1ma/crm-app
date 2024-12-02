setup:
	npm ci
test:
	npx test
server:
	node server.js  && npx vite
seed:
	node seed.js
frontend:
	npx vite