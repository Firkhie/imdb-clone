import { useState } from "react";
import { useDispatch } from "react-redux";
import { userRegister } from "../store/actions/actionCreator";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  function register(event) {
    event.preventDefault();
    try {
      dispatch(userRegister(newUser)).then(() => {
        setNewUser({
          username: "",
          email: "",
          password: "",
          phoneNumber: "",
          address: "",
        });
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
      <section className="register">
        <div className="register-content">
          <h2>Register New User</h2>
          <form id="register-form" onSubmit={register}>
            <div className="input-box">
              <label htmlFor="register-username">Username</label>
              <input type="text" id="register-username" name="username" value={newUser.username} onChange={handleChange} placeholder="Enter your username ..." autoComplete="off" required />
            </div>
            <div className="input-box">
              <label htmlFor="register-email">Email</label>
              <input type="email" id="register-email" name="email" value={newUser.email} onChange={handleChange} placeholder="Enter your email ..." autoComplete="off" required />
            </div>
            <div className="input-box">
              <label htmlFor="register-password">Password</label>
              <input type="password" id="register-password" name="password" value={newUser.password} onChange={handleChange} placeholder="Enter your password ..." autoComplete="off" required />
            </div>
            <div className="input-box">
              <label htmlFor="register-phone">Phone Number</label>
              <input type="text" id="register-phone" name="phoneNumber" value={newUser.phoneNumber} onChange={handleChange} placeholder="Enter your phone number (optional) ..." autoComplete="off" />
            </div>
            <div className="input-box">
              <label htmlFor="register-address">Address</label>
              <textarea id="register-address" name="address" value={newUser.address} onChange={handleChange} rows="3" placeholder="Enter your address (optional) ..." autoComplete="off"></textarea>
            </div>
            <button type="submit">Add</button>
            <button>Cancel</button>
          </form>
        </div>
      </section>
    </>
  );
}
