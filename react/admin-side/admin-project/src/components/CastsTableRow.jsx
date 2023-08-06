import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCasts } from "../store/actions/actionCreator";

export default function CastsTableRow() {
  const { casts } = useSelector((state) => {
    return state.casts;
  });
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchCasts()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <tr>
          <td>Loading...</td>
        </tr>
      ) : (
        <>
          {casts.data &&
            casts.data.map((el, index) => {
              return (
                <tr key={el.id}>
                  <td>{++index}</td>
                  <td>{el.name}</td>
                  <td>{el.profilePict}</td>
                </tr>
              );
            })}
        </>
      )}
    </>
  );
}
