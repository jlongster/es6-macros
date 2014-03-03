
test: 
	grunt
	grunt sweetjs
	mocha --harmony -b -R tap tests
