'use strict'

# Path where we expect to see a Pantsfile
PantsfilePath = process.cwd() + '/Pantsfile.js'

# Libraries
fs = require 'fs'
commander = require 'commander'
LibPants = require '../lib/pants.js'

cliExit = () ->
    console.log 'Exiting...'
    process.exit()

# Read Pantsfile:
unless fs.existsSync PantsfilePath
    console.log 'No pants file found! Try "pants init ."', PantsfilePath
    cliExit()

Pantsfile = require PantsfilePath

# Collect CLI arguments:
opts = commander.command '*'
    .option 'deploy [tag]'
    .option 'rollback [tag]'
    .option 'prep [tag]'
    .option 'activate <tag>'
    .option 'state [state]'
    .option 'list [type]'
    .option 'highstate'
    .option '-t, --test'
    .option '-k, --key <key>'
    .parse process.argv

Pants = new LibPants Pantsfile

# Load SSH key is one was provided:
if opts.key?
    if fs.existsSync opts.key
        Pants.options.key = fs.readFileSync opts.key
    else
        console.log 'No such key file: "' + opts.key + '"'
        cliExit()

if opts.test? then Pants.test = opts.test

if opts.deploy?
    Pants.deploy opts.deploy
else if opts.rollback?
    Pants.rollback opts.rollback
else if opts.activate?
    Pants.activate opts.activate
else if opts.prep?
    Pants.prep opts.prep
else if opts.state?
    Pants.state opts.state
else if opts.list?
    Pants.list opts.list
else if opts.highstate?
    Pants.highstate()
