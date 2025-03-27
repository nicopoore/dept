import "./index.scss";
import { login } from "../../api/admin";
import { useAuth } from "hooks/useAuth";

export const Login = () => {
  const { setToken } = useAuth();

  const handleLogin = async () => {
    try {
      //TODO: Change to actual email/pw
      const response = await login("default@example.com", "password");

      if (response && response.token) {
        setToken(response.token);
        //TODO: Redirect to Home page? Maybe done in AuthContext
      } else {
        console.error("Login failed: No token received");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-page">
      <img
        src="https://www.deptagency.com/wp-content/themes/dept/public/logo-light-new.svg"
        alt="DEPT®"
        title="DEPT®"
      />
      <button onClick={handleLogin} className="glow-on-hover">
        LOG IN
      </button>
    </div>
  );
};
