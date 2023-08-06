import GenresTableRow from "./GenresTableRow";

export default function GenresTable() {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <GenresTableRow />
        </tbody>
      </table>
    </>
  );
}
