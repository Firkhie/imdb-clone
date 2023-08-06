import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../store/actions/actionCreator";

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: ""
  });

  function login(event) {
    event.preventDefault();
    try {
      dispatch(userLogin(newUser)).then(() => {
        navigate('/');
      });
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  }
  return (
    <>
      <section className="login">
        <div className="login-content">
          <h2>Login</h2>
          <form id="login-form" onSubmit={login}>
            <label htmlFor="login-email">Email</label>
            <input type="email" id="login-email" name="email" value={newUser.email} onChange={handleChange} placeholder="Enter email address ..." autoComplete="off" required />
            <label htmlFor="login-password">Password</label>
            <input type="password" id="login-password" name="password" value={newUser.password} onChange={handleChange} placeholder="Enter password ..." autoComplete="off" required />
            <button type="submit">Login</button>
          </form>
        </div>
      </section>
    </>
  );
}
