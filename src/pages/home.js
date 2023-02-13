import React from "react";
import AboutSection from "../components/home/about-section";
import ContactUsSection from "../components/home/contact-us-section";
import Footer from "../components/home/footer";
import NavBar from "../components/home/navbar";
import Slider from "../components/home/slider";
import TopbarSection from "../components/home/topbar-section";
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
      <TopbarSection />

      <NavBar scrollTo={scrollTo} />
      <Slider />
      <AboutSection />
      <ContactUsSection />
      <Footer />
    </>
  );
}

export default Home;
