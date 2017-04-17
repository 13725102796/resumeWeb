const crypto = require('crypto');

module.exports = {
    MD5_SUFFIX: 'jsankjdas!@#%$^%sdfdsas',
    md5: function (str) {
        var obj = crypto.createHash('md5');
        obj.update(str);

        return obj.digest('hex');
    }
};

//# sourceMappingURL=common-compiled.js.map