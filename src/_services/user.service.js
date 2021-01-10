import config from "config";

export const userService = {
  login,
  logout,
  register,
};

function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  return fetch(`${config.apiUrl}/login`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: user.username,
      password: user.password,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      country: user.country.name,
    }),
  };
  return fetch(`${config.apiUrl}/signup`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.json().then((data) => {
    if (!response.ok) {
      const { username, password } = data.errors;
      const error = username ? username : password;
      return Promise.reject(error);
    }
    return data;
  });
}
