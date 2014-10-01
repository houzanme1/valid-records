#!/usr/bin/env node 
'use strict';

var ndj = require('ndjson'),
    thru = require('through2'),
    argv = require('minimist')(process.argv.slice(2)),
    Validator = require('../');

var valid = new Validator(argv.constraints),
    i = 0;

var invalidFilter = thru.obj(function (rec, enc, next) {

    var errors = valid.validateRec(rec);
    if (errors) {
        this.push({ index: i, errors: errors });
    }
    i++;
    next();
});

process.stdin
    .pipe(ndj.parse())
    .pipe(invalidFilter)
    .pipe(ndj.serialize())
    .pipe(process.stdout);
