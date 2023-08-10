import * as jwt from "jsonwebtoken";
import { configuration } from "src/config/configuration";

export function verifyApiKey(apiKey: string) {
  try {
    const secret = configuration().jwt.secret;
    return jwt.verify(apiKey, secret);
  } catch (error) {
    return false;
  }
}
