"use client";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { TbFountainFilled } from "react-icons/tb";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <Row className="gy-5">
          {/* Logo + Brand + Description */}
          <Col lg={3} md={6}>
            <Link
              href="/"
              className="footer-logo d-flex align-items-center mb-3"
            >
              <TbFountainFilled className="logo" />
              <span className="brand-name fs-3 ms-2">Resumify</span>
            </Link>
            <p className="footer-desc">
              Create a standout professional resume in just minutes with our
              easy-to-use tool. It's designed to be simple, fast, and fully
              optimized for Applicant Tracking Systems (ATS).
            </p>
            <button className="btn btn-dark rounded-5 px-3 py-2 fw-medium">
              <span className="responsive-font-footer">Know More</span>
              <span className="ms-2">
                <MdOutlineArrowRightAlt />
              </span>
            </button>
          </Col>

          {/* Popular Links */}
          <Col lg={2} md={6}>
            <h5 className="footer-title">Popular Links</h5>
            <ul className="footer-links">
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/resume-builder">Resume Builder</Link>
              </li>
              <li>
                <Link href="/cv-builder">CV Builder</Link>
              </li>
              <li>
                <Link href="/knowledge-center">Knowledge Center</Link>
              </li>
              <li>
                <Link href="/resume-writing-services">Resume Writing Services</Link>
              </li>
              <li>
                <Link href="/professional-resume-reviews">Professional Resume Reviews</Link>
              </li>
              <li>
                <Link href="/top-resources">Top Resources</Link>
              </li>
            </ul>
          </Col>

          {/* AI Resume Builder */}
          <Col lg={2} md={6}>
            <h5 className="footer-title">AI Resume Builder</h5>
            <ul className="footer-links">
              <li>
                <Link href="/ai-resume-builder">AI Resume Builder</Link>
              </li>
              <li>
                <Link href="/resume-samples">Resume Samples</Link>
              </li>
              <li>
                <Link href="/resume-templates">Resume Templates</Link>
              </li>
              <li>
                <Link href="/resume-skills">Resume Skills</Link>
              </li>
              <li>
                <Link href="/cv-examples">CV Examples</Link>
              </li>
              <li>
                <Link href="/cv-templates">CV Templates</Link>
              </li>
            </ul>
          </Col>

          {/* Our Company */}
          <Col lg={2} md={6}>
            <h5 className="footer-title">Our Company</h5>
            <ul className="footer-links">
              <li>
                <Link href="/about-us">About Us</Link>
              </li>
              <li>
                <Link href="/visualcv-for-business">VisualCV for Business</Link>
              </li>
              <li>
                <Link href="/affiliate-program">Affiliate Program</Link>
              </li>
              <li>
                <Link href="/contact-us">Contact Us</Link>
              </li>
              <li>
                <Link href="/careers">Careers</Link>
              </li>
              <li>
                <Link href="/press">Press</Link>
              </li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col lg={3} md={6}>
            <h5 className="footer-title">Contact With Us</h5>
            <div className="d-flex mb-3">
              <FaLocationDot className="fs-5 mt-1 me-3 flex-shrink-0" />
              <span>9th Floor, Nathubhai Tower, Jivan jyot, Front of Honda showroom, Udhna, Surat, Gujarat 394210</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <FaPhone className="fs-6 me-3 flex-shrink-0" />
              <span>+91 7777960192</span>
            </div>
            <div className="d-flex align-items-center mb-4">
              <MdEmail className="fs-5 me-3 flex-shrink-0" />
              <span>info.resumefy@kesariatextile.com</span>
            </div>

            {/* Social Media */}
            <div className="social-icons mb-4">
              <a href="#" aria-label="YouTube">
                <i className="bi bi-youtube"></i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" aria-label="Pinterest">
                <i className="bi bi-pinterest"></i>
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </Col>
        </Row>

        <hr className="my-4" />

        {/* Copyright */}
        <Row className="text-center py-3">
          <Col>
            <p className="mb-0">
              © {new Date().getFullYear()} Resumify. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}