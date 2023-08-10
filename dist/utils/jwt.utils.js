"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyApiKey = void 0;
const jwt = require("jsonwebtoken");
const configuration_1 = require("../config/configuration");
function verifyApiKey(apiKey) {
    try {
        const secret = (0, configuration_1.configuration)().jwt.secret;
        return jwt.verify(apiKey, secret);
    }
    catch (error) {
        return false;
    }
}
exports.verifyApiKey = verifyApiKey;
//# sourceMappingURL=jwt.utils.js.map