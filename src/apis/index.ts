export const signIn = (email: string, password: string) => {
  return fetch("http://192.168.99.100:4000/api/sign_in", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then(response => response.json());
};

export const signUp = (email: string, password: string) => {
  return fetch("http://192.168.99.100:4000/api/sign_up", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then(response => response.json());
};
