'use pants'

var servers = {
    "23.253.108.126": {
        user: "root",
        sshOptions: [ '-p 80' ]
    }
};

module.exports = {
    environments: {
        production: {
            "23.253.108.126": servers["23.253.108.126"]
        }
    }
};
