'use strict';

// helper function to format reply for invalid values
var invalidReply = function (col, val, reason) {

    var value = '`' + val + '`';
    return [col, '=', value, reason].join(' ');
};


// column pattern constraints
module.exports = {

    LRB: function (v) {

        var column = 'LRB';
        if (v) {
            if (!/^[LRB](?:\+[LRB])*$/.test(v)) {
                return invalidReply(column, v, 'is an invalid value');
            }
        }
    },


    XYZ: function (v) {

        var column = 'XYZ';
        if (v) {
            if (!/^[xyz]$/.test(v)) {
                return invalidReply(column, v, 'is an invalid value');
            }
        }
    }
};
