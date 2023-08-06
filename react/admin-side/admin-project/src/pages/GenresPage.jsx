import GenresTable from "../components/GenresTable";
import { Link } from "react-router-dom";

export default function GenresPage() {
  return (
    <>
      <section className="genres">
        <div className="genres-content">
          <div className="genres-header">
            <h4>Genre List</h4>
            <Link to="/genres/new">
              <i className="bx bx-plus-medical"></i>
              <p>New Genre</p>
            </Link>
          </div>
          <div className="genres-table">
            <GenresTable />
          </div>
        </div>
      </section>
    </>
  );
}
