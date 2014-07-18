var Connection = require('ssh2');

var conn = new Connection();
conn.on('ready', function() {
  console.log('Connection :: ready');
  conn.exec('uptime', function(err, stream) {
    if (err) throw err;
    stream.on('exit', function(code, signal) {
      console.log('Stream :: exit :: code: ' + code + ', signal: ' + signal);
    }).on('close', function() {
      console.log('Stream :: close');
      conn.end();
    }).on('data', function(data) {
      console.log('STDOUT: ' + data);
    }).stderr.on('data', function(data) {
      console.log('STDERR: ' + data);
    });
  });
}).on('error', function (i, a, r) {
  console.log('wtf is going on');	
}).connect({
  host: '23.253.108.126',
  port: 80,
  username: 'root',
  privateKey: require('fs').readFileSync('/Users/sean6011/.ssh/id_rsa')
});
