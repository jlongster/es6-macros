
test:
	grunt
	grunt sweetjs
	./node_modules/.bin/mocha --harmony -b -R tap tests
