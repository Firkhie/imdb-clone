import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createUpdateGenre, fetchGenre, fetchGenres } from "../store/actions/actionCreator";

export default function NewGenrePage() {
  const { id } = useParams();
  const { genre } = useSelector((state) => {
    return state.genre;
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newGenre, setNewGenre] = useState({
    name: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      dispatch(fetchGenre(id))
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
    if (id && !isLoading && genre && genre.data) {
      setNewGenre({
        name: genre.data.name || "",
      });
    } else {
      setNewGenre({
        name: "",
      });
    }
  }, [id, isLoading, genre]);

  let fetchMethod = id ? "put" : "post";
  function addUpdateGenre(event) {
    event.preventDefault();
    try {
      dispatch(createUpdateGenre(id, fetchMethod, newGenre));
      dispatch(fetchGenres());
      navigate("/genres");
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNewGenre((prevGenre) => ({ ...prevGenre, [name]: value }));
  }

  return (
    <>
      <section className="new-genre">
        <div className="new-genre-content">
          {id ? <h2>Edit Genre</h2> : <h2>New Genre</h2>}
          <form id="new-genre-form" onSubmit={addUpdateGenre}>
            <div className="input-box">
              <label htmlFor="new-genre-name">Name</label>
              <input type="text" id="new-genre-name" name="name" value={newGenre.name} onChange={handleChange} placeholder="Enter genre name ..." autoComplete="off" required />
            </div>
            <button type="submit">Add</button>
            <Link to="/genres">
              <button>Cancel</button>
            </Link>
          </form>
        </div>
      </section>
    </>
  );
}
