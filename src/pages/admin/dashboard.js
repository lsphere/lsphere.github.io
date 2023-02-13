import React, { useState } from "react";
// react-bootstrap components
import { Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/dashboard/admin-layout";
import Table from "react-bootstrap/Table";
import DownChevronIcon from "../../icons/downchevron-icon";
import UpChevronIcon from "../../icons/upchevron-icon";

function Dashboard() {
  const navigate = useNavigate();
  const [showAssignments, setShowAssignments] = useState(false);
  const [showQuizzes, setShowQuizzes] = useState(false);
  const [showIQTests, setShowIQTests] = useState(false);

  return (
    <AdminLayout>
      <Container fluid>
        <Row>
          <Col lg="4" sm="6">
            <Card
              onClick={() =>
                window.open(
                  "/#/admin/code-editor/ASSIGNMENT",
                  "LearnSphere Coding Editor",
                  "width=1000, height=1000"
                )
              }
              className="card-btns"
            >
              <Card.Body>
                <Card.Title as="h4">New Assignment</Card.Title>
                <p className="card-category">
                  Write code, compile, control language and more
                </p>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Start
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="4" sm="6">
            <Card
              onClick={() =>
                window.open(
                  "/#/admin/code-editor/EXPLAIN",
                  "LearnSphere Coding Editor",
                  "width=1000, height=1000"
                )
              }
              className="card-btns"
            >
              <Card.Body>
                <Card.Title as="h4">Explain Code</Card.Title>
                <p className="card-category">
                  Paste your code, select it and here you go
                </p>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Start
                </div>
              </Card.Footer>
            </Card>
          </Col>

          <Col lg="4" sm="6">
            <Card
              onClick={() =>
                window.open(
                  "/#/admin/code-editor/COMPLETE",
                  "LearnSphere Coding Editor",
                  "width=1000, height=1000"
                )
              }
              className="card-btns"
            >
              <Card.Body>
                <Card.Title as="h4">Complete Code</Card.Title>
                <p className="card-category">
                  Paste your code, describe it and here you go
                </p>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Start
                </div>
              </Card.Footer>
            </Card>
          </Col>
          
        </Row>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title className="d-flex justify-content-between">
                  <div className="d-flex align-items-center card-title">
                    <div> New Assignments</div>
                    <div onClick={() => setShowAssignments(!showAssignments)}>
                      {showAssignments ? (
                        <UpChevronIcon />
                      ) : (
                        <DownChevronIcon />
                      )}
                    </div>
                  </div>
                  <a
                    style={{ cursor: "pointer" }}
                    href="/#/admin/assignment"
                    className="card-category"
                  >
                    See more
                  </a>
                </Card.Title>
              </Card.Header>
              {showAssignments && (
                <Card.Body>
                  <Table responsive striped="columns">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Creation Date</th>
                        <th>Expirt Date</th>
                        <th>Locked</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              )}
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>

            <Card>
              <Card.Header>
                <Card.Title className="d-flex justify-content-between" as="h4">
                  <div className="d-flex align-items-center card-title">
                    <div> New Quizzes</div>
                    <div onClick={() => setShowQuizzes(!showQuizzes)}>
                      {showQuizzes ? <UpChevronIcon /> : <DownChevronIcon />}
                    </div>
                  </div>
                  <a
                    style={{ cursor: "pointer" }}
                    href="/#/admin/quizzes"
                    className="card-category"
                  >
                    See more
                  </a>
                </Card.Title>
              </Card.Header>
              {showQuizzes && (
                <Card.Body>
                  <Table responsive striped="columns">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Creation Date</th>
                        <th>Expirt Date</th>
                        <th>Locked</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              )}
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Header>
                <Card.Title className="d-flex justify-content-between" as="h4">
                  <div className="d-flex align-items-center card-title">
                    <div> New IQ Tests</div>
                    <div onClick={() => setShowIQTests(!showIQTests)}>
                      {showIQTests ? <UpChevronIcon /> : <DownChevronIcon />}
                    </div>
                  </div>
                  <a
                    style={{ cursor: "pointer" }}
                    href="/#/admin/assignment"
                    className="card-category"
                  >
                    See more
                  </a>
                </Card.Title>
              </Card.Header>
              {showIQTests && (
                <Card.Body>
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
                      <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              )}
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Email Statistics</Card.Title>
                <p className="card-category">Last Campaign Performance</p>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                ></div>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Open <i className="fas fa-circle text-danger"></i>
                  Bounce <i className="fas fa-circle text-warning"></i>
                  Unsubscribe
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock"></i>
                  Campaign sent 2 days ago
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </AdminLayout>
  );
}

export default Dashboard;
