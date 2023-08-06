import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMovies } from "../store/actions/actionCreator";

export default function MovieCard() {
  const { movies } = useSelector((state) => {
    console.log(state, "INI STATE MOVIE");
    return state.movie;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchMovies())
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [dispatch]);

  const handleClick = (id) => {
    let url = `/detail/${id}`;
    navigate(url);
  };
  return (
    <>
      {isLoading ? (
        <section className="loading">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif" />
        </section>
      ) : (
        <>
          {movies.data &&
            movies.data.map((el) => {
              return (
                <div className="movie-card" onClick={() => handleClick(el.id)} key={el.id}>
                  <div className="top-card">
                    <img src={el.imgUrl} alt="" />
                  </div>
                  <div className="bottom-card">
                    <span>
                      <i className="bx bx-star"></i> {el.rating}
                    </span>
                    <h4>{el.title}</h4>
                    <a>
                      <i className="bx bx-plus"></i>
                      <p>Watchlist</p>
                    </a>
                  </div>
                </div>
              );
            })}
        </>
      )}
    </>
  );
}
