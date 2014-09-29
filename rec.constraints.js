// helper function to format reply for invalid values
invalidReply = function(col, val, reason) {
    value = '`' + val + '`';
    return [col, '=', value, reason].join(' ');
};

// column pattern constraints
module.exports = {

    LRB: function(v) {
        column = 'LRB';
        if (v) {
            if (!/^[LRB](?:\+[LRB])*$/.test(v)) {
                return invalidReply(column, v, 'is an invalid value')
            }
        }
    },

    XYZ: function(v) {
        column = 'XYZ';
        if (v) {
            if (!/^[xyz]$/.test(v)) {
                return invalidReply(column, v, 'is an invalid value')
            }
        }
    }

};
