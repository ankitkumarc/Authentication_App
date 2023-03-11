import React, { useState } from "react";

const AuthScreen = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={handlePasswordChange}
          required
        />
        <p className="link">Don't have an account? Signup instead</p>
        <button className="btnn" type="submit">
          Submit
        </button>
        <h2> OR </h2>
        <p className="liw"> Login with Google</p>
        <div className="icons">
          <a href="#">
            <ion-icon name="logo-Google"></ion-icon>
          </a>
        </div>
      </form>
      <script src="https://unpkg.com/ionicons@5.4.0/dist/ionicons.js "></script>
    </div>
  );
};

export default AuthScreen;
