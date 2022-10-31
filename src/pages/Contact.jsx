import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Input from "../components/Input";
import { message } from "antd";
import Breadcrumb from "../components/Breadcrumb";

function Contact() {
  const [username, setUsername] = useState("");
  const [usermail, setUsermail] = useState("");
  const [subject, setSubject] = useState("");
  const [note, setNote] = useState("");

  const [err, setErr] = useState(false);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    if (!username || !usermail || !subject || !message) {
      setErr(true);
    } else {
      setErr(false);
      emailjs
        .sendForm(
          "service_nwk6hfp",
          "template_frof5mo",
          form.current,
          "wfhZd2KapJ1s_-79b"
        )
        .then(
          () => {
            message.success("Gửi mail thành công!");
          },
          (error) => {
            message.success(error.text);
          }
        );
    }
  };

  return (
    <>
      {/* BREADCRUMB */}
      <nav className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Breadcrumb */}
              <Breadcrumb name="Contact Us" />
            </div>
          </div>
        </div>
      </nav>
      {/* CONTENT */}
      <section className="pt-7 pb-12">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 className="mb-10 text-center">Contact Us</h3>
            </div>
          </div>
          <div className="row justify-content-between">
            <div className="col-12 col-md-4 col-xl-3">
              <aside className="mb-9 mb-md-0">
                <h6 className="mb-6">
                  <i className="fe fe-phone text-primary mr-4" /> Call to Us:
                </h6>
                <p className="text-gray-500">
                  We're available from 10 am - 10 pm EST, 7 days a week.
                </p>
                <p>
                  <strong>Customer Service:</strong> <br />
                  <a className="text-gray-500" href="tel:077-574-6186">
                    077-574-6186
                  </a>
                </p>
                <p className="mb-0">
                  <strong>Careers:</strong>
                  <br />
                  <a className="text-gray-500" href="tel:077-574-6186">
                    077-574-6186
                  </a>
                </p>
                <hr />
                <h6 className="mb-6">
                  <i className="fe fe-mail text-primary mr-4" /> Write to Us:
                </h6>
                <p className="text-gray-500">
                  Fill out our form and we will contact you within 24 hours.
                </p>
                <p>
                  <strong>Customer Service:</strong>
                  <br />
                  <a
                    className="text-gray-500"
                    href="mailto:hdphuc201@gmail.com"
                  >
                    hdphuc201@gmail.com
                  </a>
                </p>
                <p className="mb-0">
                  <strong>Careers:</strong>
                  <br />
                  <a
                    className="text-gray-500"
                    href="mailto:hdphuc201@gmail.com"
                  >
                    hdphuc201@gmail.com
                  </a>
                </p>
                <hr />
                <h6 className="mb-6">
                  <i className="fe fe-mail text-primary mr-4" /> Find Us:
                </h6>
                <p className="mb-0 text-gray-500">
                  Want to visit our Offline Stores?
                </p>
                <p className="mb-0">
                  <a
                    className="btn btn-link px-0 text-body"
                    href="store-locator.html"
                  >
                    Go to Store Locator <i className="fe fe-arrow-right ml-2" />
                  </a>
                </p>
              </aside>
            </div>
            <div className="col-12 col-md-8">
              <form ref={form} onSubmit={sendEmail}>
                {err && <p style={{ color: "red" }}>Điền vào chỗ trống</p>}
                <div className="form-group">
                  <Input
                    type="text"
                    placeholder="Your Name *"
                    required=""
                    name="user_name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <Input
                    type="text"
                    placeholder="Your Email *"
                    required=""
                    name="user_email"
                    value={usermail}
                    onChange={(e) => setUsermail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <Input
                    type="text"
                    placeholder="Title"
                    required=""
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
                <div className="form-group mb-7">
                  <textarea
                    className="form-control form-control-sm"
                    id="contactMessage"
                    rows={5}
                    placeholder="Message *"
                    required=""
                    name="message"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
                <button className="btn btn-dark">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
