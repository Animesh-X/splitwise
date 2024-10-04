import { useState } from "react";
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import LoginNavBar from "../LoginNavBar";
import { LOGIN } from "../../graphql/mutations/login";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { data, loading, error }] = useMutation(LOGIN);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login({ variables: { email, password } });
      if(response.data){
        localStorage.setItem("splitwiseUser", JSON.stringify(response.data.login));
        navigate("/dashboard", {replace: true});
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <LoginNavBar />
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Log in</h2>
          <label className="form-label">
            Email Address:
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </label>
          <label className="form-label">
            Password:
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
          {error && <p className="error-message">"Invalid Email or Password!"</p>}
          {data && <p>Login successful! Welcome, {data.login.user.firstName}</p>}
        </form>
      </div>
    </div>
  );
}
