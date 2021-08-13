install:
	npm ci
publish:
	npm pablish --dry-run
lint:
	npx eslint .
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8
.PHONY: test