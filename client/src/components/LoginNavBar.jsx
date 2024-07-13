import { useNavigate } from "react-router-dom";
export default function LoginNavBar () {
    const navigate = useNavigate();

  return (
    <div className="nav-container">
      <div>SplitMate</div>
      <div className="button-container">
        <button onClick={() => navigate(`/login`)}>Log in</button>
        <button onClick={() => navigate(`/signup`)}>Sign Up</button>
      </div>
    </div>
  )
}