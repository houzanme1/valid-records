(function() {

    function Validator(constraints) {
        if (typeof constraints === 'string') {
            constraints = require(constraints);
        }
        this.constraints = constraints;
        this.records = [];
        this.report = { 
            invalid: 0,     // total invalid records
            errors: {}      // errors keyed by record number
        }
    };

    Validator.prototype.validateRec = function(rec) {

        var errors = [];

        for (var field in this.constraints) {
            var value = rec[field];
            var error = this.constraints[field](value);
            if (error) {
                errors.push(error);
            } 
        };

        if (errors.length) { return errors };   // undefined unless errors
    };

    Validator.prototype.validate = function(records) {

        this.records = records;
        for (var i = 0, len = records.length; i < len; i++) {
            var rec = records[i];
            var errors = this.validateRec(rec);
            var invalid = errors ? errors.length : 0;
            if (invalid != 0) {
                this.report.invalid += invalid
                if (! this.report.errors.hasOwnProperty(i)) {
                    this.report.errors[i] = [];
                }
                for (var _i = 0, _len = errors.length; _i < _len; _i++) {
                    this.report.errors[i].push(errors[_i]);
                }
            } 
        }
        return this;
    };

    Validator.prototype.printReport = function() {

        console.log(this.report.invalid + " invalid values");
        for (var num in this.report.errors) {
            error = this.report.errors[num];
            console.log("\nREC " + num + ":");
            for (var i = 0; i < error.length; i++) {
                var err = error[i];
                if (typeof err != 'string') {
                    err = JSON.stringify(error[i]);
                }
                console.log("  " + err);
            }
        }
    };

    module.exports = Validator;

})();
