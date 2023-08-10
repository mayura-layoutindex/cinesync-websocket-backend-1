import { Injectable } from "@nestjs/common";
import axios from "axios";
import * as jwt from "jsonwebtoken";
import { configuration } from "src/config/configuration";
import { generateResponse } from "src/utils/response_data";

@Injectable()
export class AuthService {
  verifyApiKey(apiKey: string) {
    try {
      const secret = process.env.JWT_SECRET;
      return jwt.verify(apiKey, secret);
    } catch (error) {
      return false;
    }
  }

  async generateApiKey(body: { access_code: string; device: string }) {
    const secret = configuration().jwt.secret;
    const jwtExpiresIn = configuration().jwt.expiresIn;
    const masterApiUrl = process.env.MASTER_API_URL;
    try {
      const response = await axios.post(
        `${masterApiUrl}/validate_access_code`,
        body
      );

      if (response.data.status === true) {
        const apiKey = jwt.sign({}, secret, { expiresIn: jwtExpiresIn });

        return generateResponse(true, 200, "API key generated successful", {
          apiKey: apiKey,
        });
      } else {
        return generateResponse(false, 400, "API key generation failed", {
          apiKey: null,
        });
      }
    } catch (error) {
      return generateResponse(false, 400, "API key generation failed", {
        apiKey: null,
      });
    }
  }
}
