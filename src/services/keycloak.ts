import Keycloak from "keycloak-js";
import log from "loglevel";

const keycloak = Keycloak({
  url: "http://157.245.74.124:18080/auth",
  realm: "sesame",
  clientId: "rusty",
});

keycloak.onTokenExpired = () => {
  log.info("Token is expired");
  keycloak.updateToken(5).then(
    () => {
      log.info("Successfully refreshed token");
    },
    (reason) => {
      log.info("Failed to refreshed token", reason);
    },
  );
};

export default keycloak;