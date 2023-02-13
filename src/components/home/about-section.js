import about from "../../assets/about.jpg";

function AboutSection() {
  return (
    <section id="about" className="about section-bg">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>About</h2>
          <h3>
            Find Out More <span>About Us</span>
          </h3>
          <p>
            LearnSphere is the space where you can start if you are computer
            scientist beginner
          </p>
        </div>

        <div className="row">
          <div className="col-lg-6" data-aos="fade-right" data-aos-delay="100">
            <img src={about} className="img-fluid" alt="" />
          </div>
          <div
            className="col-lg-6 pt-4 pt-lg-0 content d-flex flex-column justify-content-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h3>
              We can lead you step by step to acheive the best and required
              experience
            </h3>
            <p className="fst-italic">BY JUST FEW CLCIKS</p>
            <ul>
              <li>
                <i className="bx bx-store-alt"></i>
                <div>
                  <h5>Student Plan</h5>
                  <p>
                    You can solve coding exercises using our advanced editor,
                    solve quizzes and more
                  </p>
                </div>
              </li>
              <li>
                <i className="bx bx-images"></i>
                <div>
                  <h5>Job Seeker Plan</h5>
                  <p>
                    We'll assist you to be familiar with job interviews either
                    HR or technical
                  </p>
                </div>
              </li>
            </ul>
            <p>
              We're using OpenAI to create dynamic environment. You'll get bored
              as our content is changed everytime you visit us
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
