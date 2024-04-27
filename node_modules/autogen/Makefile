.PHONY: clean check test build

ALL: loop

configure:
	@node configure

loop:
	@npm i nan node-gyp
	@node_modules/node-gyp/bin/node-gyp.js rebuild

check:
	@npm t

test: check

build:
	@node_modules/node-gyp/bin/node-gyp.js build

clean:
	@rm -rf lib*.gyp build node_modules
