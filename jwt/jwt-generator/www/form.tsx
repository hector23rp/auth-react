import React, { useState } from "react";

import { FormProps, ValidationStatus } from "./form.type";

const Form: React.FC<FormProps> = ({ authService, hasConfirmPassword }) => {
  const [username, setUsername] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [confirmPassword, setConfirmPassword] = useState<String>("");
  const [validationStatus, setValidationStatus] = useState<ValidationStatus>();
  const [error, setError] = useState<String>("");
  const [token, setToken] = useState<String>("");
  const [message, setMessage] = useState<String>("");
  const inputUsername = "username";
  const inputPassword = "password";
  const inputConfirmPassword = "confirm-password";

  const handleChange = ({ target }) => {
    if (target.name === inputUsername) {
      setUsername(target.value);
    }
    if (target.name === inputPassword) {
      setPassword(target.value);
    }
    if (hasConfirmPassword && target.name === inputConfirmPassword) {
      setConfirmPassword(target.value);
    }
  };

  const handleSumbit = async (event) => {
    event.preventDefault();
    setError("");
    setToken("");
    setMessage("");
    if (!validateForm()) {
      return;
    }
    try {
      authService.setBody({username, password});
      const response = await authService.authService();
      if (response.data.token) {
        setToken(response.data.token)
      }
      if (response.data.message) {
        setMessage(response.data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const validateForm = (): Boolean => {
    if (!username || username === "") {
      setValidationStatus(ValidationStatus.EMPTY_USERNAME);
      return false;
    }
    if (!password || password === "") {
      setValidationStatus(ValidationStatus.EMPTY_PASSWORD);
      return false;
    }
    if (hasConfirmPassword && password !== confirmPassword) {
      setValidationStatus(ValidationStatus.PASSWORD_NOT_EQUAL);
      return false;
    }
    setValidationStatus(undefined)
    return true
  }

  return (
    <form onSubmit={handleSumbit}>
      <label htmlFor="username-input">Username</label>
      <input
        id="username-input"
        name={inputUsername}
        type="text"
        placeholder="Write here..."
        onChange={handleChange}
        required
      />
      <label htmlFor="password-input">Password</label>
      <input
        id="password-input"
        name={inputPassword}
        type="text"
        placeholder="Write here..."
        onChange={handleChange}
        required
      />
      { hasConfirmPassword &&
        <> 
          <label htmlFor="confirm-password-input">Confirm Password</label>
          <input
            id="confirm-password-input"
            name={inputConfirmPassword}
            type="text"
            placeholder="Write here..."
            onChange={handleChange}
            required
          />
        </>
      }
      <button type="submit">Submit</button>
      {validationStatus &&
        <strong style={{color: "red"}}>{validationStatus}</strong>
      }
      {error &&
        <strong id="error" style={{color: "red"}}>{error}</strong>
      }
      {token &&
        <strong id="token" style={{color: "green"}}>{token}</strong>}
      {message &&
        <strong id="message" style={{color: "green"}}>{message}</strong>}
    </form>
  );
};

export default Form;
