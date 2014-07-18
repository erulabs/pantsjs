Pants.js [![Build Status](https://travis-ci.org/erulabs/pantsjs.png?branch=master)](https://travis-ci.org/erulabs/pantsjs)
=======
_An application deployment tool for the Cloud Era!_

by Seandon 'Eru' Mooy -> seandon.mooy@gmail.com -> http://github.com/erulabs


pants.js

	deploy:
		-> Warn if uncommited changes exist
		-> read Pantsfile
		-> npm test - warn/stop if failed tests
		-> ssh to systems
		-> if Pantsfile specifies system requirements or state, run them
		-> pull repo
		-> npm install
		-> npm test - warn/stop if failed tests
		-> change symlink (cap structure)

	prep:
		-> all of deploy, does not activate symlink

	rollback:
		-> ssh to systems
		-> change symlink back one deployment (or to specified deployment)

	highstate:
		-> ssh to systems
		-> run highstate

	state:
		-> ssh to systems
		-> run specified state

	list:
		-> ssh to systems
		-> list available deployments

	activate:
		-> ssh to systems
		-> change symlink to specified deployment

	
	EXAMPLES
		-> pants production deploy
		-> pants production rollback

		-> pants production test highstate
		-> pants production test state nginx
		-> pants production test prep v0.0.1
		-> pants production prep v0.0.1
		-> pants production list
		-> pants production activate v0.0.1
		-> pants production rollback
		-> pants production deploy v0.0.2


		deploy, prep, activate, rollback all take a TAGNAME argument. If not specified, will use the longform date
		


		
pants = require 'pants'

production = pants.stage 'production', {
	provider: 'rackspace'
	username: 'SOMENAME'
	apiKey: 'SOME_API_TOKEN'
}

production.stack = {
	os: 'Linux'
	flavor: 'Ubuntu'
	version: '14.04'
	# Or, if you know your provider uses exact IDs for images:
	imageID: 'SOME-UUID-GOES-HERE'
	# You can also define required specs, in a vague sense:
	flavor: '4gb'
	# Or, as above, by UUID if you know the exact provider details:
	flavorID: 'SOME-UUID-GOES-HERE'
}

production.scale = (network) ->


dev = pants.stage 'testing', {
	provider: 'ssh'
	target: 'deploy@testing.server.com'
}

















