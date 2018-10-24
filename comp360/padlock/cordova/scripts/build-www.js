/* eslint-env node */

"use strict";

var { buildCordova } = require("../../lib/build");
var path = require("path");

module.exports = function(context) {
    const platforms = context.opts.cordova.platforms;
    if (platforms.length > 1) {
        console.error("Can't build for more than one platform at once!");
        process.exit(1);
    }
    return buildCordova(platforms[0], path.resolve(context.opts.projectRoot, "www"));
};
