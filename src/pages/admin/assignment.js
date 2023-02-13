import { useLocation } from "react-router-dom";
import AdminLayout from "../../components/dashboard/admin-layout";
import Table from "react-bootstrap/Table";

function Assignment() {
  const { state } = useLocation();

  return (
    <AdminLayout>
     <div className="content-title">
      Assignments
     </div>
      <Table responsive striped="columns">
        <thead>
          <tr>
            <th>#</th>
            <th>Creation Date</th>
            <th>Expirt Date</th>
            <th>Locked</th>
            <th>Invite</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </Table>
      <div className="d-flex w-100 justify-content-end">
        <button
        className="btn-fill pull-right btn btn-info"
          onClick={() =>
            window.open(
              "/#/admin/code-editor/ASSIGNMENT",
              "LearnSphere Coding Editor",
              "width=1000, height=1000"
            )
          }
        >
          New Assignment
        </button>
      </div>
    </AdminLayout>
  );
}

export default Assignment;
