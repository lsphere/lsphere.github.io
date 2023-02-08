import FacebookIcon from "../../icons/facebook-icon";
import InstagramIcon from "../../icons/instagram-icon";
import LinkedinIcon from "../../icons/linkedin-icon";

function Footer() {
  return (
    <footer id="footer">
      <div className="footer-newsletter">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <h4>Join Our Newsletter</h4>
              <p>Subscribe to our newsletter to keep you up to date</p>
              <form action="" method="post">
                <input type="email" name="email" />
                <input type="submit" value="Subscribe" />
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 footer-contact">
              <h3>
                LearnSphere<span>.</span>
              </h3>
              <p>
                Lebanon, Saida
                <br />
             
                <br />
                <strong>Phone:</strong> +961 76866786
                <br />
                <strong>Email:</strong> learnsphere12@gmail.com
                <br />
              </p>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Our Social Networks</h4>
              <p>Here are our links to our social media networks</p>
              <div className="social-links mt-3">
                <a href="#" className="facebook">
                  <FacebookIcon color="#fff" />
                </a>
                <a href="#" className="instagram">
                  <InstagramIcon color="#fff" />
                </a>

                <a href="#" className="linkedin">
                  <LinkedinIcon color="#fff" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="copyright">
          &copy; Copyright{" "}
          <strong>
            <span>LearnSphere</span>
          </strong>
          . All Rights Reserved
        </div>
      </div>
    </footer>
  );
}

export default Footer;
