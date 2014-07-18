(function() {
  'use strict';
  var Pants, SSH2, control, fs;

  fs = require('fs');

  control = require('control');

  SSH2 = require('ssh2');

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

    Pants.prototype.deploy = function(env, tag) {
      var conn, connectOpts, server, serverName, ssh, _ref, _results;
      if (this.options.environments[env] == null) {
        console.log('No such environment', env);
        return false;
      }
      env = this.options.environments[env];
      _ref = env.servers;
      _results = [];
      for (serverName in _ref) {
        server = _ref[serverName];
        conn = new SSH2();
        connectOpts = {
          host: server.host,
          port: server.port,
          username: server.username,
          password: server.password,
          privateKey: env.key
        };
        console.log('connecting to', connectOpts);
        ssh = conn.on('ready', function() {
          console.log('connection ready');
          return ssh.exec('uptime', function(err, stream) {
            console.log(err);
            stream.on('data', function(data) {
              return console.log(data.toString());
            });
            return stream.end('ls -l');
          });
        });
        ssh.connect(connectOpts);
        control.task('production', 'production cluster', (function(_this) {
          return function() {
            return control.controllers(_this.options.environments.production);
          };
        })(this));
        control.task('date', 'get the date', function(controller) {
          return console.log(controller);
        });
        console.log(control);
        _results.push(control.perform('date', 'production'));
      }
      return _results;
    };

    Pants.prototype.rollback = function(env, tag) {
      return console.log('rolling back to', tag);
    };

    Pants.prototype.activate = function(env, tag) {
      return console.log('activating', tag);
    };

    Pants.prototype.prep = function(env, tag) {
      return console.log('prepping', tag);
    };

    Pants.prototype.state = function(env, state) {
      return console.log('running state', state);
    };

    Pants.prototype.list = function(env, type) {
      return console.log('listing', type);
    };

    Pants.prototype.highstate = function(env) {
      return console.log('running highstate');
    };

    return Pants;

  })();

}).call(this);
