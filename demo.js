var fs = require('fs');
var ndj = require('ndjson');    // split-and-parse each newline-delim json record
var Validator = require('./');

var dataFile = './records.ndj';
var constraints = './rec.constraints.js';

var valid = new Validator(constraints);

var i = 0;
var report = [];   // log of invalid records

fs.createReadStream(dataFile)
    .pipe(ndj.parse())  
    .on('data', function (rec) {
        var err = valid.validateRec(rec)
        if (err) { 
            report.push({ index: i, errors: err }) 
        }
        i++
    })
    .on('end', function () {
        console.log(report);
    })
