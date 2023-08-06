import CastsTable from "../components/CastsTable";
import { Link } from "react-router-dom";

export default function CastsPage() {
  return (
    <>
      <section className="casts">
        <div className="casts-content">
          <div className="casts-header">
            <h4>Cast List</h4>
            <Link to="/casts/new">
              <i className="bx bx-plus-medical"></i>
              <p>New Cast</p>
            </Link>
          </div>
          <div className="casts-table">
            <CastsTable />
          </div>
        </div>
      </section>
    </>
  );
}
