import CastsTableRow from "./CastsTableRow";

export default function CastsTable() {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Profile Picture</th>
          </tr>
        </thead>
        <tbody>
          <CastsTableRow />
        </tbody>
      </table>
    </>
  );
}
