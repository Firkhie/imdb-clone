import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchCasts, createCast, fetchMovies } from "../store/actions/actionCreator";

export default function NewCastPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => {
    return state.movie;
  });

  const [newCast, setNewCast] = useState({
    name: "",
    profilePict: "",
    movieId: ""
  });

  function addCast(event) {
    event.preventDefault();
    try {
      console.log(newCast, 'PAYLOAD DARI NEWCAST')
      dispatch(createCast(newCast));
      dispatch(fetchCasts());
      navigate("/casts");
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch]);

  function handleChange(event) {
    const { name, value } = event.target;
    setNewCast((prevCast) => ({ ...prevCast, [name]: value }));
  }

  return (
    <>
      <section className="new-cast">
        <div className="new-cast-content">
          <h2>New Cast</h2>
          <form id="new-cast-form" onSubmit={addCast}>
            <div className="input-box">
              <label htmlFor="new-cast-name">Name</label>
              <input type="text" id="new-cast-name" name="name" value={newCast.name} onChange={handleChange} placeholder="Enter cast name ..." autoComplete="off" required />
            </div>
            <div className="input-box">
              <label htmlFor="new-cast-profile-pict">Profile Picture</label>
              <input type="text" id="new-cast-profile-pict" name="profilePict" value={newCast.profilePict} onChange={handleChange} placeholder="Enter profile picture ..." autoComplete="off" required />
            </div>
            <div className="input-box">
              <label htmlFor="new-cast-movie">Movie</label>
              <select id="new-cast-movie" name="movieId" value={newCast.movieId} onChange={handleChange} required>
                <option value="" disabled>
                  -- Select movie --
                </option>
                {movies.data &&
                  movies.data.map((el) => {
                    return (
                      <option key={el.id} value={el.id}>
                        {el.title}
                      </option>
                    );
                  })}
              </select>
            </div>
            <button type="submit">Add</button>
            <Link to="/casts">
              <button>Cancel</button>
            </Link>
          </form>
        </div>
      </section>
    </>
  );
}
