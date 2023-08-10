"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResponse = void 0;
function generateResponse(status, status_code, message, data) {
    return {
        status,
        status_code,
        message,
        data,
    };
}
exports.generateResponse = generateResponse;
//# sourceMappingURL=response_data.js.map