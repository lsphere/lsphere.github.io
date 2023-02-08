import EmailIcon from "../../icons/email-icon";
import LocationIcon from "../../icons/location-icon";
import PhoneIcon from "../../icons/phone-icon";

function ContactUsSection() {
  return (
    <section id="contact" className="contact">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Contact</h2>
          <h3>
            <span>Contact Us</span>
          </h3>
          <p>Don't hesitate to contact us in case of any inquiry</p>
        </div>

        <div className="row" data-aos="fade-up" data-aos-delay="100">
          <div className="col-lg-6">
            <div className="info-box mb-4">
              <div className="bx bx-map">
                <LocationIcon color="#106eea" />
              </div>
              <h3>Our Address</h3>
              <p> Lebanon, Saida</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="info-box  mb-4">
              <div className="bx bx-map">
                <EmailIcon color="#106eea" />
              </div>
              <h3>Email Us</h3>
              <p>learnsphere12@gmail.com</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="info-box  mb-4">
              <div className="bx bx-map">
                <PhoneIcon color="#106eea" />
              </div>
              <h3>Call Us</h3>
              <p>+961 76866786</p>
            </div>
          </div>
        </div>

        <div className="row contactus-form" data-aos="fade-up" data-aos-delay="100">
          <div className="col-lg-6">
            <form
              action="forms/contact.php"
              method="post"
              role="form"
              className="php-email-form"
            >
              <div className="row">
                <div className="col form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="col form-group">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="subject"
                  id="subject"
                  placeholder="Subject"
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  name="message"
                  rows="5"
                  placeholder="Message"
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button type="submit">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUsSection;
