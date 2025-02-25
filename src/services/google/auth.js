import { google } from "googleapis";
import { config } from "../../config/config.js";

export const googleAuth = async () => {
    const scopes = ["https://www.googleapis.com/auth/spreadsheets"];
    const credentials = {
      type: config.googleCredentials.type,
      project_id: config.googleCredentials.project_id,
      private_key_id: config.googleCredentials.private_key_id,
      private_key: config.googleCredentials.private_key,
      client_email: config.googleCredentials.client_email,
      client_id: config.googleCredentials.client_id,
      auth_uri: config.googleCredentials.auth_uri,
      token_uri: config.googleCredentials.token_uri,
      auth_provider_x509_cert_url:config.googleCredentials.auth_provider_x509_cert_url,
      client_x509_cert_url: config.googleCredentials.client_x509_cert_url,
      universe_domain: config.googleCredentials.universe_domain,
    };

    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes
    });
    
    return auth;
}