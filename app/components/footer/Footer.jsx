"use client";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/images/logo.png";
import googlePlay from "../../assets/images/google-play.png";
import appStore from "../../assets/images/app-store.png";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <Row className="gy-4">
          {/* Logo + Brand + Description */}
          <Col md={3}>
            <Link
              href="/"
              className="footer-logo d-flex align-items-center mb-3"
            >
              <Image src={logo} alt="logo" width={50} height={40} />
              <span className="brand-name ms-2 fw-bold">Resumify</span>
            </Link>
            <p className="footer-desc">
              Create a standout professional resume in just minutes with our
              easy-to-use tool. It’s designed to be simple, fast, and fully
              optimized for Applicant Tracking Systems (ATS).
            </p>
            <button className="btn btn-dark rounded-5">
              <span className="responsive-font-footer">Know More</span>
              <span>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"></path>
                </svg>
              </span>
            </button>
          </Col>

          {/* Quick Links */}
          <Col md={3} className="d-flex justify-content-center">
            <ul className="footer-links flex-column">
              <h5 className="footer-title">Quick Links</h5>
              <li>
                <Link href="#">Customer Review</Link>
              </li>
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="#">Return & Exchange</Link>
              </li>
              <li>
                <Link href="#">Contact Us</Link>
              </li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col md={3}>
            <h5 className="footer-title">Contact With Us</h5>
            <div className="d-flex justify-content-center align-items-center ">
              <FaLocationDot className="fs-2 me-2" /> 9th Floor, Nathubhai
              Tower, Jivan jyot, Front of Honda showroom, Udhna, Surat, Gujarat
              394210
            </div>
            <p>
              <FaPhone className="fs-6 me-2" /> +91 7777960192
            </p>
            <p>
              <MdEmail className="fs-5 me-2" /> info.resumefy@kesariatextile.com
            </p>

            {/* Social Media */}
            <div className="social-icons">
              <a href="#">
                <i className="bi bi-youtube"></i>
              </a>
              <a href="#">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#">
                <i className="bi bi-pinterest"></i>
              </a>
              <a href="#">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </Col>
          <Col md={3}>
            <div className="store-buttons text-center">
              <div className="py-2">
                <Link href="#">
                  <Image
                    src={googlePlay}
                    alt="Google Play"
                    width={140}
                    height={45}
                    className="rounded-1"
                  />
                </Link>
              </div>
              <div className="py-2">
                <Link href="#">
                  <Image
                    src={appStore}
                    alt="App Store"
                    width={140}
                    height={45}
                    className="rounded-1"
                  />
                </Link>
              </div>
            </div>
          </Col>
        </Row>

        <hr />

        {/* App Store Buttons */}
        <Row className="text-center mt-3">
          <Col>
            <p className="mt-3 mb-0">
              © {new Date().getFullYear()} Resumify. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
