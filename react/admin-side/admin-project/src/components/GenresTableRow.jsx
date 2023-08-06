import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteGenreById, fetchGenres } from "../store/actions/actionCreator";

export default function GenresTableRow() {
  const { genres } = useSelector((state) => {
    return state.genre;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchGenres()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  const handleClickEdit = (id) => {
    let url = `/genres/${id}`;
    navigate(url);
  };

  const handleClickDelete = async (id) => {
    await dispatch(deleteGenreById(id));
    dispatch(fetchGenres());
  };

  return (
    <>
      {isLoading ? (
        <tr>
          <td>Loading...</td>
        </tr>
      ) : (
        <>
          {genres &&
            genres.data.map((el, index) => {
              return (
                <tr key={el.id}>
                  <td>{++index}</td>
                  <td>{el.name}</td>
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
