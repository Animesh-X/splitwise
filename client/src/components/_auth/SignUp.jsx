import { useState } from "react";
import { gql, useMutation } from '@apollo/client';
import LoginNavBar from "../LoginNavBar";

const SIGNUP = gql`
    mutation signup($firstName: String!,$lastName: String, $email: String!, $password: String!) {
        createUser(firstName: $firstName,lastName: $lastName, email: $email, password: $password) {
            id,
            email
        }
    }
`

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [createUser, {data, loading, error}] = useMutation(SIGNUP);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await createUser({ variables: {firstName, lastName, email, password}});
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
          <LoginNavBar />
          <div className="login-form-container">
            <form className="login-form" onSubmit={handleSubmit}>
              <h2>Sign Up</h2>
              <label className="form-label">Firstname:
                <input type="text" placeholder="Firstname" value={firstName} onChange={handleFirstNameChange} required/>
              </label>
              <label className="form-label">Lastname:
                <input type="text" placeholder="Lastname" value={lastName} onChange={handleLastNameChange}/>
              </label>
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
              {error && <p className="error-message">{error.message}</p>}
              {/* {error && error.graphQLErrors.map(({ message }, i) => (
                <span key={i}>{message}</span>
            ))} */}
            </form>
          </div>
        </div>
      );
}