import React from "react";
import AboutSection from "../components/home/about-section";
import ContactUsSection from "../components/home/contact-us-section";
import Footer from "../components/home/footer";
import NavBar from "../components/home/navbar";
import Slider from "../components/home/slider";
import "../styles/home.css";

function Home() {
  const scrollTo = (divID) => {
    let divElement = document.getElementById(divID);
    if (divElement) {
      divElement.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <section id="topbar" className="d-flex align-items-center">
        <div className="container d-flex justify-content-center justify-content-md-between">
          <div className="contact-info d-flex align-items-center">
            <i className="bi bi-envelope d-flex align-items-center">
              <a href="mailto:contact@example.com">learnsphere12@gmail.com</a>
            </i>
            <i className="bi bi-phone d-flex align-items-center ms-4">
              <span>+961 76866786</span>
            </i>
          </div>
          <div className="social-links d-none d-md-flex align-items-center">
            <a href="#" className="twitter">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="#" className="facebook">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="instagram">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#" className="linkedin">
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>
      </section>

      <NavBar scrollTo={scrollTo} />
      <Slider />
      <AboutSection />
      <ContactUsSection />
      <Footer />
    </>
  );
}

export default Home;
