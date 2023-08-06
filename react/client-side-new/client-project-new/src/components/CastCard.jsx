import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchMovie } from "../store/actions/actionCreator";

export default function CastCard() {
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
      {movie.data && movie.data.Casts &&
        movie.data.Casts.map((el) => {
          return (
            <div className="cast-profile" key={el.id}>
              <img src={el.profilePict} alt="" />
              <p>{el.name}</p>
            </div>
          );
        })}
    </>
  );
}
