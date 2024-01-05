import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../reducers/userReducer";

const NavigationBar = () => {
  const appUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div>
      <Link to={"/blogs"}>blogs</Link>
      <Link to={"/users"}>users</Link>
      <em>{appUser.name}</em> logged in
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default NavigationBar;
