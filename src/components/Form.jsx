import React, { useState } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css";
import api from "../api";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const pageTitle = method === "login" ? "Login" : "Register";

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      console.log("RES" + res);
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert("Error occured, check dev tools for details.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{pageTitle}</h1>
      <input
        className="form-input"
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Username"
      />
      <input
        className="form-input"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
      />
      <button className="form-button" type="submit">
        Submit
      </button>
    </form>
  );
}

export default Form;
