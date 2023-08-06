import MoviesTable from "../components/MoviesTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchMovies, fetchGenres, fetchCasts } from "../store/actions/actionCreator";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const { movies } = useSelector((state) => {
    return state.movie;
  });
  const { genres } = useSelector((state) => {
    return state.genre;
  });
  const { casts } = useSelector((state) => {
    return state.casts;
  });
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([dispatch(fetchMovies()), dispatch(fetchGenres()), dispatch(fetchCasts())])
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <section className="dashboard">
            <div className="dashboard-content">
              <div className="dashboard-counter">
                <div className="counter-box">
                  <i className="bx bxs-movie"></i>
                  <div className="text-box">
                    <h4>{movies.data.length}</h4>
                    <p>Movies</p>
                  </div>
                </div>
                <div className="counter-box">
                  <i className="bx bxs-book-content"></i>
                  <div className="text-box">
                    <h4>{genres.data.length}</h4>
                    <p>Genres</p>
                  </div>
                </div>
                <div className="counter-box">
                  <i className="bx bx-male-female"></i>
                  <div className="text-box">
                    <h4>{casts.data.length}</h4>
                    <p>Casts</p>
                  </div>
                </div>
              </div>
              <div className="dashboard-movies">
                <div className="movies-header">
                  <h4>Movie List</h4>
                  <Link to="/movies/new">
                    <i className="bx bx-plus-medical"></i>
                    <p>New Movie</p>
                  </Link>
                </div>
                <div className="movies-table">
                  <MoviesTable />
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
