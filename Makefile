.PHONY: install build test run
install:
	cd .scripts/ ; \
	npm i
build:
	cd .scripts/ ; \
	npm run build
test:
	cd .scripts/ ; \
	npm test
run:
	cd .scripts/ ; \
	npm start
