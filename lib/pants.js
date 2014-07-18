(function() {
  'use strict';
  var Pants, control, fs;

  fs = require('fs');

  control = require('control');

  module.exports = Pants = (function() {
    function Pants(options) {
      var defaultKeyPath;
      this.options = options;
      if (this.options.test != null) {
        this.test = this.options.test;
      } else {
        this.test = false;
      }
      if (this.options.verbosity != null) {
        this.verbosity = this.options.verbosity;
      } else {
        this.verbosity = 1;
      }
      if (this.options.key == null) {
        defaultKeyPath = '~/.ssh/id_rsa';
        if (fs.existsSync(defaultKeyPath)) {
          console.log(defaultKeyPath, 'exists');
          this.options.key = fs.readFileSync(defaultKeyPath);
        }
      }
      if (this.options.user == null) {
        this.options.user = process.env['USER'];
      }
      if (this.options.sshPort == null) {
        this.options.sshPort = 22;
      }
    }

    Pants.prototype.deploy = function(tag) {};

    Pants.prototype.rollback = function(tag) {
      return console.log('rolling back to', tag);
    };

    Pants.prototype.activate = function(tag) {
      return console.log('activating', tag);
    };

    Pants.prototype.prep = function(tag) {
      return console.log('prepping', tag);
    };

    Pants.prototype.state = function(state) {
      return console.log('running state', state);
    };

    Pants.prototype.list = function(type) {
      return console.log('listing', type);
    };

    Pants.prototype.highstate = function() {
      return console.log('running highstate');
    };

    return Pants;

  })();

}).call(this);
