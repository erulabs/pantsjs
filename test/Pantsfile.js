'use pants'

var fs = require('fs');

module.exports = {
    environments: {
        production: {
            key: fs.readFileSync('/Users/sean6011/.ssh/id_rsa'),
            servers: {
                'cloud-server': {
                    host: '10.69.245.169',
                    username: 'seandon',
                    port: 22
                }
            }
        }
    }
};
