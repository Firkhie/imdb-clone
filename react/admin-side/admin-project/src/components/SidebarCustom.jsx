import { NavLink, useNavigate } from "react-router-dom";

export default function SidebarCustom() {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }
  return (
    <>
      <section className="sidebar">
        <div className="sidebar-content">
          <div className="sidebar-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" alt="imdb-logo" />
          </div>
          <div className="sidebar-menu">
            <ul>
              <NavLink to="/" className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}>
                <li>
                  <i className="bx bxs-dashboard"></i>
                  <span>Dashboard</span>
                </li>
              </NavLink>
              <NavLink to="/genres" className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}>
                <li>
                  <i className="bx bxs-book-content"></i>
                  <span>Genres</span>
                </li>
              </NavLink>
              <NavLink to="/casts" className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}>
                <li>
                  <i className="bx bx-male-female"></i>
                  <span>Casts</span>
                </li>
              </NavLink>
              <NavLink to="/register" className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}>
                <li>
                  <i className="bx bxs-user-plus"></i>
                  <span>Register Admin</span>
                </li>
              </NavLink>
                <li onClick={handleLogout}>
                  <i className="bx bx-log-out"></i>
                  <span>Logout</span>
                </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
