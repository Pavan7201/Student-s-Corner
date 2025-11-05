import React, { useState } from "react";
import axios from "axios";

const Auth = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = () => {
    axios
      .post("/signup", { name, email, password })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };

  const handleLogin = () => {
    axios
      .post("/login", { email, password })
      .then((response) => {
        setMessage(response.data.message);
        // Save token to local storage
        localStorage.setItem("token", response.data.token);
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };

  return (
    <div>
      <h1>User Signup/Login</h1>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <button onClick={handleSignUp}>Sign Up</button>
        <button onClick={handleLogin}>Log In</button>
      </div>
      <div>{message}</div>
    </div>
  );
};

export default Auth;
