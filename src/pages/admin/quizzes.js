import { useLocation, useNavigate } from "react-router-dom";
import AdminLayout from "../../components/dashboard/admin-layout";
import Table from "react-bootstrap/Table";

function Quizzes() {
  const { state } = useLocation();
  const navigate = useNavigate();
  return (
    <AdminLayout>
     <div className="content-title">
      Quizzes
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
            // window.open(
            //   "/#/admin/quiz-questions",
            //   "LearnSphere Coding Editor",
            //   "width=1000, height=1000"
            // )
            navigate("/admin/quiz-questions")
          }
        >
          New Quiz
        </button>
      </div>
    </AdminLayout>
  );
}

export default Quizzes;
