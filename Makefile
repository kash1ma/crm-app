setup:
	npm ci
test:
	npx jest
server:
	node server.js
seed:
	node seed.js