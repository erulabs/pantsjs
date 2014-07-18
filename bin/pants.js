#!/usr/bin/env node
(function() {
  'use strict';
  var LibPants, Pants, Pantsfile, PantsfilePath, cliExit, commander, fs, opts;

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
    Pants.deploy(opts.deploy);
  } else if (opts.rollback != null) {
    Pants.rollback(opts.rollback);
  } else if (opts.activate != null) {
    Pants.activate(opts.activate);
  } else if (opts.prep != null) {
    Pants.prep(opts.prep);
  } else if (opts.state != null) {
    Pants.state(opts.state);
  } else if (opts.list != null) {
    Pants.list(opts.list);
  } else if (opts.highstate != null) {
    Pants.highstate();
  }

}).call(this);
