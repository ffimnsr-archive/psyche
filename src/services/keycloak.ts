import Keycloak from "keycloak-js";

const keycloak = Keycloak({
  url: "http://localhost:8080/auth",
  realm: "sesame",
  clientId: "rusty",
});

export default keycloak;
