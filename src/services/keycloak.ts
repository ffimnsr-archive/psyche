import Keycloak from "keycloak-js";
import log from "loglevel";

const MINIMUM_TOKEN_VALIDITY = 5;
const AS_URI = process.env.REACT_APP_AS_URI;

const keycloak = Keycloak({
  url: AS_URI,
  realm: "sesame",
  clientId: "rusty",
});

keycloak.init({
  pkceMethod: "S256",
});

keycloak.onTokenExpired = () => {
  log.info("Token is expired");
  keycloak.updateToken(MINIMUM_TOKEN_VALIDITY).then(
    () => {
      log.info("Successfully refreshed token");
    },
    (reason) => {
      log.info("Failed to refreshed token", reason);
    },
  );
};

export default keycloak;
