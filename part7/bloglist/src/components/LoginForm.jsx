import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(loginUser(username, password));
    setUsername("");
    setPassword("");
    navigate("/");
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username:
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          password:
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
