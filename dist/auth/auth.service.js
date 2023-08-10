"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const jwt = require("jsonwebtoken");
const configuration_1 = require("../config/configuration");
const response_data_1 = require("../utils/response_data");
let AuthService = class AuthService {
    verifyApiKey(apiKey) {
        try {
            const secret = process.env.JWT_SECRET;
            return jwt.verify(apiKey, secret);
        }
        catch (error) {
            return false;
        }
    }
    async generateApiKey(body) {
        const secret = (0, configuration_1.configuration)().jwt.secret;
        const jwtExpiresIn = (0, configuration_1.configuration)().jwt.expiresIn;
        const masterApiUrl = process.env.MASTER_API_URL;
        try {
            const response = await axios_1.default.post(`${masterApiUrl}/validate_access_code`, body);
            if (response.data.status === true) {
                const apiKey = jwt.sign({}, secret, { expiresIn: jwtExpiresIn });
                return (0, response_data_1.generateResponse)(true, 200, "API key generated successful", {
                    apiKey: apiKey,
                });
            }
            else {
                return (0, response_data_1.generateResponse)(false, 400, "API key generation failed", {
                    apiKey: null,
                });
            }
        }
        catch (error) {
            return (0, response_data_1.generateResponse)(false, 400, "API key generation failed", {
                apiKey: null,
            });
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map