import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaProjectDiagram } from "react-icons/fa";
import { FaAddressBook, FaPlaneDeparture } from "react-icons/fa6";

const AtsSection = () => {
  return (
    <div className="ats-sec-bg py-5">
      <Container>
        <Row>
          <Col lg={6}>
            <h1 className="text-white">
              Resumes optimized for applicant tracking systems (ATS)
            </h1>
            <h5 className="text-white pt-3 pb-5">
              Enhancv resumes and cover letters are vigorously tested against
              major ATS systems to ensure complete parsability
            </h5>
            <a
              href="/template"
              className="py-3 font-roboto build-res-btn text-decoration-none"
            >
              <span className="fw-bold">Build an ATS-Friendly Resume</span>
            </a>
          </Col>
          <Col lg={6}>
            <div className="w-50 bg-ats-card p-3 d-flex align-items-center flex-nowrap">
              {/* Icon container */}
              <div className="p-3 bg-light me-2 rounded p-2 d-flex align-items-center justify-content-center">
                <FaAddressBook className="icon-color h3 m-0" />
              </div>

              {/* Text */}
              <div className="fw-bold text-white">
                Readable contact information
              </div>
            </div>

            <div className="w-50 bg-ats-card-2 p-3 d-flex align-items-center flex-nowrap">
              {/* Icon container */}
              <div className="p-3 bg-light me-2 rounded p-2 d-flex align-items-center justify-content-center">
                <FaProjectDiagram className="icon-color h3 m-0" />
              </div>

              {/* Text */}
              <div className="fw-bold text-white">
                Full experience section parsing
              </div>
            </div>


            <div className="w-50 bg-ats-card-3 p-3 d-flex align-items-center flex-nowrap">
              {/* Icon container */}
              <div className="p-3 bg-light me-2 rounded p-2 d-flex align-items-center justify-content-center">
                <FaPlaneDeparture className="icon-color h3 m-0" />
              </div>

              {/* Text */}
              <div className="fw-bold text-white">
                Optimized skills section
              </div>
            </div>


          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AtsSection;
