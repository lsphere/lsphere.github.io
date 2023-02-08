import { useNavigate } from "react-router-dom";

function Slider() {
  const navigate = useNavigate();
  return (
    <section id="hero" className="d-flex align-items-center">
      <div className="container">
        <h1>
          Welcome to <span>LearnSphere</span>
        </h1>
        <h2>
          If you are a computer science either student or a job seeker, this is
          the right place to start
        </h2>
        <div className="d-flex">
          <a
            onClick={() => navigate("/register")}
            className="btn-get-started scrollto"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}

export default Slider;
