"use client";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/images/logo.png";

export default function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <Row className="align-items-center">
          {/* Logo + Brand */}
          <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
            <Link href="/" className="footer-logo d-flex align-items-center">
              <Image src={logo} alt="logo" width={50} height={40} />
              <span className="brand-name ms-2 fw-bold text-primary">
                Resumify
              </span>
            </Link>
          </Col>

          {/* Navigation Links */}
          <Col md={4} className="text-center mb-3 mb-md-0">
            <ul className="footer-links">
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/template">Templates</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </Col>

          {/* Copyright */}
          <Col md={4} className="text-center text-md-end">
            <p className="mb-0">
              © {new Date().getFullYear()} Resumify. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
