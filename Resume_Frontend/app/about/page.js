"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import aboutImg from "../assets/images/resume1.webp";

export default function AboutPage() {
  return (
    <section className="about-section py-5">
      <Container>
        <Row className="align-items-center">
          {/* Left Side Image */}
          <Col md={6} className="mb-4 mb-md-0 text-center">
            <Image
              src={aboutImg}
              alt="About Resume Builder"
              width={500}
              height={600}
              className="about-img"
            />
          </Col>

          {/* Right Side Content */}
          <Col md={6}>
            <h2 className="fw-bold mb-3 about-title">About Resumify</h2>
            <p className="about-text">
              Resumify is a modern resume builder designed to help you create
              professional resumes in minutes. Our platform allows you to fill
              in your details on the left and instantly preview your formatted
              resume on the right.
            </p>
            <p className="about-text">
              With multiple templates, export options, and a simple interface,
              Resumify ensures your resume stands out to recruiters. Build,
              edit, and download your personalized resume effortlessly.
            </p>

            <a href="/template" className="btn build-res-btn p-2 rounded-3">
              <span className="fw-bold"> Build My Resume</span>
            </a>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
