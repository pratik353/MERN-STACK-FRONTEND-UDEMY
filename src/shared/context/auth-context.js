const { createContext } = require("react");

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logOut: () => {},
});

