'use strict'
fs = require 'fs'
control = require 'control'

module.exports = class Pants
    constructor: (@options) ->
        if @options.test? then @test = @options.test else @test = false
        if @options.verbosity? then @verbosity = @options.verbosity else @verbosity = 1
        # Use key defined via CLI or via Pantsfile, if non, assume a default
        if !@options.key?
            defaultKeyPath = '~/.ssh/id_rsa'
            if fs.existsSync defaultKeyPath
                console.log defaultKeyPath, 'exists'
                @options.key = fs.readFileSync defaultKeyPath
        # default user is whoever you are currently.
        if !@options.user?
            @options.user = process.env['USER']
        # default ssh port is 22
        if !@options.sshPort?
            @options.sshPort = 22
    deploy: (tag) ->
        #server = @options.servers['test']
        #conn = new SSH2()
        #connectOpts =
        #    host: server.host
        #    port: server.port
        #    username: server.username
        #    password: server.password
        #    privateKey: @options.key
        #console.log 'connecting to', connectOpts
        #ssh = conn.on 'ready', () ->
        #    console.log 'connection ready'
        #    ssh.exec 'uptime', (err, stream) ->
        #        console.log err
        #        stream.on 'data', (data) ->
        #            console.log data
        #        stream.end 'ls -l'
        #ssh.connect connectOpts
        #control.task 'production', 'production cluster', () =>
        #    return control.controllers @options.environments.production
        #control.task 'date', 'get the date', (controller) ->
        #    console.log controller
        #console.log control
        #control.perform('date', 'production')
    rollback: (tag) ->
        console.log 'rolling back to', tag
    activate: (tag) ->
        console.log 'activating', tag
    prep: (tag) ->
        console.log 'prepping', tag
    state: (state) ->
        console.log 'running state', state
    list: (type) ->
        console.log 'listing', type
    highstate: () ->
        console.log 'running highstate'
