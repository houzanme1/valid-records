#!/usr/bin/env node 
var ndj = require('ndjson');
var thru = require('through2');
var argv = require('minimist')(process.argv.slice(2))
var Validator = require('../');

var valid = new Validator(argv.constraints);
var i = 0;

var invalidFilter = thru.obj(function (rec, enc, next) {

    var errors = valid.validateRec(rec);
    if (errors) {
        this.push({ index: i, errors: errors });
    }
    i++
    next();
});

process.stdin
    .pipe(ndj.parse())
    .pipe(invalidFilter)
    .pipe(ndj.serialize())
    .pipe(process.stdout);
