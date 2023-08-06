import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteMovieById, fetchMovies } from "../store/actions/actionCreator";

export default function MoviesTableRow() {
  const { movies } = useSelector((state) => {
    return state.movie;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchMovies()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  const handleClickEdit = (id) => {
    let url = `/movies/${id}`;
    navigate(url);
  };

  const handleClickDelete = async (id) => {
    await dispatch(deleteMovieById(id));
    dispatch(fetchMovies());
  };

  return (
    <>
      {isLoading ? (
        <tr>
          <td>Loading...</td>
        </tr>
      ) : (
        <>
          {movies.data &&
            movies.data.map((el, index) => {
              return (
                <tr key={el.id}>
                  <td>{++index}</td>
                  <td>{el.title}</td>
                  <td>{el.synopsis}</td>
                  <td>{el.trailerUrl}</td>
                  <td>{el.imgUrl}</td>
                  <td>{el.releaseYear}</td>
                  <td>{el.rating}</td>
                  <td>{el.Genre.name}</td>
                  <td>{el.User.username}</td>
                  <td>
                    <a onClick={() => handleClickEdit(el.id)}>Edit</a>
                    <a onClick={() => handleClickDelete(el.id)}>Delete</a>
                  </td>
                </tr>
              );
            })}
        </>
      )}
    </>
  );
}
