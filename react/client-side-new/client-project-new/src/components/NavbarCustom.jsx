import { Link } from "react-router-dom";

export default function NavbarCustom() {
  return (
    <>
      <header>
        <Link to='/' className="logo">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" alt="logo_img" style={{ width: "100%" }} />
        </Link>
        <a className="menu">
          <i className="bx bx-menu"></i>
          <span>Menu</span>
        </a>
        <div className="search-bar">
          <form className="search-form">
            <label htmlFor="search-input">All</label>
            <input type="text" placeholder="Search IMDb" className="search-input" disabled />
            <i className="bx bx-search-alt-2"></i>
          </form>
        </div>
        <a style={{ width: "70px" }}>
          <img src="src/assets/imdb-pro.png" alt="" style={{ width: "100%" }} />
        </a>
        <a className="watchlist">
          <i className="bx bxs-bookmark-plus"></i>
          <span>Watchlist</span>
        </a>
        <a className="sign-in">
          <span>Sign In</span>
        </a>
        <a className="language">
          <span>EN</span>
        </a>
      </header>
    </>
  );
}
