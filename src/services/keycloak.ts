import Keycloak from "keycloak-js";
import log from "loglevel";

const MINIMUM_TOKEN_VALIDITY = 5;
const AS_URI = process.env.REACT_APP_AS_URI;

const keycloak = Keycloak({
  url: AS_URI,
  realm: "sesame",
  clientId: "rusty",
});

keycloak.onTokenExpired = () => {
  log.info("onTokenExpired: token is expired");
  keycloak.updateToken(MINIMUM_TOKEN_VALIDITY).then(
    () => {
      log.info("onTokenExpired: successfully refreshed token");
    },
    (reason) => {
      log.error("onTokenExpired: failed to refreshed token =", reason);
    },
  );
};

export default keycloak;
