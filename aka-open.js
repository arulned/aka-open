#!/usr/bin/env node

var EdgeGrid = require('edgegrid');
var untildify = require('untildify');
var fs = require('fs');

// Supply the path to your .edgerc file and name
// of the section with authorization to the client
// you are calling (default section is 'default')
require('sywac')
    .command("get <url>", {
        description: "Issues a GET request for the specified url",
        run: options => {
            call(options, 'GET');
        }
    })
    .command("put <url>", {
        description: "Issues a PUT request to the specified url",
        run: options => {
            call(options, 'PUT');
        }
    })
    .command("post <url>", {
        description: "Issues a POST request to the specified url",
        run: options => {
            call(options, 'POST');
        }
    })
    .string('--section <section>', { desc: 'Section name in edgerc file', required: false })
    .string('--edgerc <edgerc>', { desc: 'edgerc file path', required: false })
    .help('-h, --help')
    .version('-v, --version')
    .showHelpByDefault()
    .outputSettings({ maxWidth: 75 })
    .parseAndExit()
    .then(argv => {
        //console.log(JSON.stringify(argv, null, 2))
    });

function call(options, method) {
    switch(method) {
        case 'GET':
            run(options, method);
            break;
        case 'PUT':
        case 'POST':
            if (options._[0] && options._[0].indexOf('@') == 0) {
                options.data = JSON.parse(fs.readFileSync(options._[0].substring(1), 'utf8'));
                run(options, method);
            } else {
                console.error('Did you provide a file name prefixed with "@"? ' + JSON.stringify(options));
            }
            break;
        case 'DELETE':
            throw "Not implemented";
    }
}

function run(options, method) {
    console.log('Options: ' + JSON.stringify(options));
    var eg = new EdgeGrid({
        path: options.edgerc ? untildify(options.edgerc) : untildify('~/.edgerc'),
        section: options.section || 'default'
    });

    eg.auth({
        path: options.url,
        method: method,
        headers: {
            "Content-Type":"application/json"
        },
        body: options.data
    });

    eg.send(function (error, response, body) {
        console.log(JSON.stringify(JSON.parse(body),null,2));
    });
}
