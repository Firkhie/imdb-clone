import CastCard from "../components/CastCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchMovie } from "../store/actions/actionCreator";

export default function DetailPage() {
  const { id } = useParams();
  const { movie } = useSelector((state) => {
    return state.movie;
  });
  const dispatch = useDispatch();

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

  return (
    <>
      {isLoading ? (
        <section className="loading">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif" />
        </section>
      ) : (
        <>
          <section className="detail">
            <div className="detail-content">
              <div className="header">
                <div className="title-year">
                  <h4>{movie.data.title}</h4>
                  <p>{movie.data.releaseYear}</p>
                </div>
                <div className="rating-popularity">
                  <div className="rating">
                    <p>IMDb RATING</p>
                    <span>
                      <i className="bx bxs-star"></i> {movie.data.rating}
                    </span>
                  </div>
                  <div className="popularity">
                    <p>POPULARITY</p>
                    <span>
                      <i className="bx bxs-objects-vertical-bottom"></i> 5
                    </span>
                  </div>
                </div>
              </div>
              <div className="main">
                <img src={movie.data.imgUrl} alt="" />
                <iframe src={movie.data.trailerUrl} frameBorder="0" allowFullScreen></iframe>
                <div className="main-boxes">
                  <div className="box">
                    <i className="bx bxs-videos"></i>
                    <p>50 VIDEOS</p>
                  </div>
                  <div className="box">
                    <i className="bx bxs-photo-album"></i>
                    <p>99 PHOTOS</p>
                  </div>
                </div>
              </div>
              <div className="addition">
                <div className="genre-description">
                  <span>{movie.data.Genre.name}</span>
                  <p>{movie.data.synopsis}</p>
                  <p>Author - {movie.data.User.username}</p>
                </div>
                <div className="show-watchlist">
                  <a href="#" className="show">
                    <i className="bx bx-play-circle"></i>
                    Watch on Prime Video
                  </a>
                  <a href="#" className="watchlist">
                    <i className="bx bx-plus"></i>
                    Add to Watchlist
                  </a>
                </div>
              </div>
            </div>
          </section>
          <section className="casts">
            <div className="casts-content">
              <div className="main-box">
                <h3>Top Cast</h3>
                <div className="cast-boxes">
                  <CastCard />
                </div>
              </div>
              <div className="side-box">
                <h3>More To Explore</h3>
                <div className="poster">
                  <img src="https://media-cache.cinematerial.com/p/500x/nvzxjkhg/spider-man-across-the-spider-verse-movie-poster.jpg?v=1682534125" alt="" />
                  <img src="https://media-cache.cinematerial.com/p/500x/nvzxjkhg/spider-man-across-the-spider-verse-movie-poster.jpg?v=1682534125" alt="" />
                  <img src="https://media-cache.cinematerial.com/p/500x/nvzxjkhg/spider-man-across-the-spider-verse-movie-poster.jpg?v=1682534125" alt="" />
                </div>
                <div className="editorial">
                  <h3>Editorial List</h3>
                  <div className="list-box">
                    <div className="left-box">
                      <h4>Every Spider-Man movie ranked by IMDb users</h4>
                      <p>updated 6 days ago</p>
                    </div>
                    <div className="right-box">
                      <img src="https://media-cache.cinematerial.com/p/500x/nvzxjkhg/spider-man-across-the-spider-verse-movie-poster.jpg?v=1682534125" alt="" />
                    </div>
                  </div>
                  <div className="list-box">
                    <div className="left-box">
                      <h4>Every Spider-Man movie ranked by IMDb users</h4>
                      <p>updated 6 days ago</p>
                    </div>
                    <div className="right-box">
                      <img src="https://media-cache.cinematerial.com/p/500x/nvzxjkhg/spider-man-across-the-spider-verse-movie-poster.jpg?v=1682534125" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
