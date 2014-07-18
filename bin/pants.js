#!/usr/bin/env node
(function() {
  'use strict';
  var LibPants, Pants, Pantsfile, PantsfilePath, cliExit, commander, environment, fs, opts;

  PantsfilePath = process.cwd() + '/Pantsfile.js';

  fs = require('fs');

  commander = require('commander');

  LibPants = require('../lib/pants.js');

  cliExit = function() {
    console.log('Exiting...');
    return process.exit();
  };

  if (!fs.existsSync(PantsfilePath)) {
    console.log('No pants file found! Try "pants init ."', PantsfilePath);
    cliExit();
  }

  Pantsfile = require(PantsfilePath);

  opts = commander.command('*').option('deploy [tag]').option('rollback [tag]').option('prep [tag]').option('activate <tag>').option('state [state]').option('list [type]').option('highstate').option('-t, --test').option('-k, --key <key>').parse(process.argv);

  environment = opts.args[0];

  Pants = new LibPants(Pantsfile);

  if (opts.key != null) {
    if (fs.existsSync(opts.key)) {
      Pants.options.key = fs.readFileSync(opts.key);
    } else {
      console.log('No such key file: "' + opts.key + '"');
      cliExit();
    }
  }

  if (opts.test != null) {
    Pants.test = opts.test;
  }

  if (opts.deploy != null) {
    Pants.deploy(environment, opts.deploy);
  } else if (opts.rollback != null) {
    Pants.rollback(environment, opts.rollback);
  } else if (opts.activate != null) {
    Pants.activate(environment, opts.activate);
  } else if (opts.prep != null) {
    Pants.prep(environment, opts.prep);
  } else if (opts.state != null) {
    Pants.state(environment, opts.state);
  } else if (opts.list != null) {
    Pants.list(environment, opts.list);
  } else if (opts.highstate != null) {
    Pants.highstate(environment);
  }

}).call(this);
