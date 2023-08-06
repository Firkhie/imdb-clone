import MoviesTableRow from "./MoviesTableRow";

export default function MoviesTable() {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Synopsis</th>
            <th>Trailer URL</th>
            <th>Image URL</th>
            <th>Release Year</th>
            <th>Rating</th>
            <th>Genre</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <MoviesTableRow />
        </tbody>
      </table>
    </>
  );
}
