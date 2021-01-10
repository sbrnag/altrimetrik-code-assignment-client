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

  return fetch(`https://nag-test-server.herokuapp.com/login`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      console.log(`user in login response : ${JSON.stringify(user)}`);
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
  return fetch(
    `https://nag-test-server.herokuapp.com/signup`,
    requestOptions
  ).then(handleResponse);
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
