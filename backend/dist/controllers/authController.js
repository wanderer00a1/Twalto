"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.signup = exports.login = void 0;
const login = (req, res) => {
    res.send("Login Page");
};
exports.login = login;
const signup = (req, res) => {
    res.send("Sign Up Page");
};
exports.signup = signup;
const logout = (req, res) => {
    res.send("Logout Page");
};
exports.logout = logout;
