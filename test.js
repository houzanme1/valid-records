var assert = require('assert');
var check = require('rec.constraints');

var test_constraints = function() {

    var test_LRB = function() {
        assert(check.LRB('') === undefined, "permit empty strings");
        assert(check.LRB('X') === 'LRB = `X` is an invalid value');
        assert(check.LRB('L') === undefined);
        assert(
            check.LRB(' L') === 'LRB = ` L` is an invalid value',
            "check for spacing"
        );
        assert(
            check.LRB('LL') === 'LRB = `LL` is an invalid value',
            "require prefix operators"
        );
        assert(check.LRB('L+L') === undefined, "permit multiple code chars");
        assert(check.LRB('L+R') === undefined);
        assert(check.LRB('L+R+B') === undefined);
        assert(
            check.LRB('L+X') === 'LRB = `L+X` is an invalid value',
            "only permit valid code chars"
        );
        assert(
            check.LRB('L + R') === 'LRB = `L + R` is an invalid value',
            "do not permit inline spacing"
        );
    };

    var test_XYZ = function() {
        assert(check.XYZ('') === undefined);
        assert(check.XYZ('x') === undefined);
        assert(check.XYZ('y') === undefined);
        assert(check.XYZ('z') === undefined);
        assert(check.XYZ('q') === 'XYZ = `q` is an invalid value');
    };

    test_LRB();
    test_XYZ();

}

var test_validate = function() {
    var Validator = require('./');
    var valid = new Validator(check);
    var records = [
        {"_ID":"22","ROW":"1","LRB":"L","XYZ":"x"},
        {"_ID":"22","ROW":"2","LRB":"L+L","XYZ":"y"},
        {"_ID":"22","ROW":"3","LRB":"L+ ","XYZ":"z"},
        {"_ID":"22","ROW":"4","LRB":"L+R+B","XYZ":"q"},
        {"_ID":"22","ROW":"5","LRB":"L+R+X","XYZ":"b"}
    ];
    var results = valid.validate(records);
    assert(results.report.invalid === 4);
    assert(Object.keys(results.report.errors).length === 3, "3 lines have errors");
}

// run all tests here
runTests = function() {
    test_constraints();
    test_validate();
    console.log('all tests passed!');
};

runTests()
