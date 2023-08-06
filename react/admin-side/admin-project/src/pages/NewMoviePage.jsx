import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createUpdateMovie, fetchGenres, fetchMovie, fetchMovies } from "../store/actions/actionCreator";

export default function NewMoviePage() {
  const { id } = useParams();
  const { movie } = useSelector((state) => {
    return state.movie;
  });
  const { genres } = useSelector((state) => {
    return state.genre;
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newMovie, setNewMovie] = useState({
    title: "",
    synopsis: "",
    trailerUrl: "",
    imgUrl: "",
    rating: 0,
    releaseYear: "",
    genreId: 0,
    casts: [],
  });

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      dispatch(fetchMovie(id))
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id && !isLoading) {
      setNewMovie({
        title: movie.data.title || "",
        synopsis: movie.data.synopsis || "",
        trailerUrl: movie.data.trailerUrl || "",
        imgUrl: movie.data.imgUrl || "",
        releaseYear: movie.data.releaseYear || "",
        genreId: movie.data.genreId,
        rating: movie.data.rating || 0,
        casts: movie.data.Casts || [],
      });
    } else {
      setNewMovie({
        title: "",
        synopsis: "",
        trailerUrl: "",
        imgUrl: "",
        rating: "",
        releaseYear: "",
        genreId: "",
        casts: [],
      });
    }
  }, [id, movie, isLoading]);

  let fetchMethod = id ? "put" : "post";
  function addUpdateMovie(event) {
    event.preventDefault();
    try {
      dispatch(createUpdateMovie(id, fetchMethod, newMovie));
      dispatch(fetchMovies());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNewMovie((prevMovie) => ({ ...prevMovie, [name]: value }));
  }

  function handleCastChange(event, index) {
    const { name, value } = event.target;
    setNewMovie((prevMovie) => {
      const newCasts = [...prevMovie.casts];
      newCasts[index] = { ...newCasts[index], [name]: value };
      return { ...prevMovie, casts: newCasts };
    });
  }

  function addNewCast() {
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      casts: [...prevMovie.casts, { movieId: id || 0, name: "", profilePict: "" }],
    }));
  }

  function removeCast(index) {
    setNewMovie((prevMovie) => {
      const newCasts = [...prevMovie.casts];
      newCasts.splice(index, 1);
      return { ...prevMovie, casts: newCasts };
    });
  }

  return (
    <>
      <section className="new-movie">
        <div className="new-movie-content">
          {id ? <h2>Edit Movie</h2> : <h2>New Movie</h2>}
          <form id="new-movie-form" onSubmit={addUpdateMovie}>
            <div className="input-box">
              <label htmlFor="new-movie-title">Title</label>
              <input type="text" id="new-movie-title" name="title" value={newMovie.title} onChange={handleChange} placeholder="Enter movie title ..." autoComplete="off" required />
            </div>

            <div className="input-box">
              <label htmlFor="new-movie-sypnopsis">Sypnopsis</label>
              <input type="text" id="new-movie-sypnopsis" name="synopsis" value={newMovie.synopsis} onChange={handleChange} placeholder="Enter movie sypnopsis ..." autoComplete="off" required />
            </div>

            <div className="input-box">
              <label htmlFor="new-movie-trailer-url">Trailer URL</label>
              <input type="text" id="new-movie-trailer-url" name="trailerUrl" value={newMovie.trailerUrl} onChange={handleChange} placeholder="Enter movie trailer url ..." autoComplete="off" required />
            </div>

            <div className="input-box">
              <label htmlFor="new-movie-img-url">Image URL</label>
              <input type="text" id="new-movie-img-url" name="imgUrl" value={newMovie.imgUrl} onChange={handleChange} placeholder="Enter movie image url ..." autoComplete="off" required />
            </div>

            <div className="input-box">
              <label htmlFor="new-movie-rating">Rating</label>
              <input type="number" id="new-movie-rating" name="rating" value={newMovie.rating} onChange={handleChange} placeholder="Enter movie rating from 1 to 10 ..." autoComplete="off" required />
            </div>

            <div className="input-box">
              <label htmlFor="new-movie-release-year">Release Year</label>
              <input type="number" id="new-movie-release-year" name="releaseYear" value={newMovie.releaseYear} onChange={handleChange} placeholder="Enter movie release year ..." autoComplete="off" required />
            </div>

            <div className="input-box">
              <label htmlFor="new-movie-genre">Genre</label>
              <select id="new-movie-genre" name="genreId" value={newMovie.genreId} onChange={handleChange} required>
                <option value="" disabled>
                  -- Select Genre --
                </option>
                {genres.data &&
                  genres.data.map((el) => {
                    return (
                      <option key={el.id} value={el.id}>
                        {el.name}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="input-box casts">
              {newMovie.casts.map((cast, index) => (
                <div className="cast-box" key={index}>
                  <div className="cast-content">
                    <label htmlFor={`new-movie-cast-name${index + 1}`}>Cast Name {index + 1}</label>
                    <input type="text" id={`new-movie-cast-name${index + 1}`} name="name" value={cast.name} onChange={(event) => handleCastChange(event, index)} placeholder="Enter cast name ..." autoComplete="off" required />
                  </div>
                  <div className="cast-content">
                    <label htmlFor={`new-movie-cast-profile${index + 1}`}>Profile Picture {index + 1}</label>
                    <input
                      type="text"
                      id={`new-movie-cast-profile${index + 1}`}
                      name="profilePict"
                      value={cast.profilePict}
                      onChange={(event) => handleCastChange(event, index)}
                      placeholder="Enter profile picture URL ..."
                      autoComplete="off"
                      required
                    />
                  </div>

                  {index > 1 && (
                    <button type="button" onClick={() => removeCast(index)}>
                      Remove Cast
                    </button>
                  )}
                </div>
              ))}
              <button type="button" id="add-cast" onClick={addNewCast}>
                Add Cast
              </button>
            </div>

            <button type="submit">Add</button>
            <Link to="/">
              <button>Cancel</button>
            </Link>
          </form>
        </div>
      </section>
    </>
  );
}
