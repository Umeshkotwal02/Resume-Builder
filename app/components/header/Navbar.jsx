"use client";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Image from "next/image";
import logo from "../../assets/images/logo.png";

function TopNavbar() {
  return (
    <>
      {["md"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="hero-bg shadow-sm"
          sticky="top"
        >
          <Container>
            {/* Brand Logo */}
            <Navbar.Brand href="/" className="d-flex align-items-center">
              <Image
                src={logo}
                width={50}
                height={50}
                alt="logo"
                className="logo"
              />
              <span className="fw-bold fs-4 text-primary px-2 brand-name">
                Resumify
              </span>
            </Navbar.Brand>

            {/* Toggle for mobile */}
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                {/* Nav Links */}
                <Nav className="justify-content-end flex-grow-1 align-items-center gap-3">
                  <Nav.Link href="/" className="nav-link-custom about-btn">Home</Nav.Link>
                  <Nav.Link href="/about" className="nav-link-custom about-btn">About</Nav.Link>
                  <Nav.Link href="/template" className="nav-link-custom about-btn">Templates</Nav.Link>
                  <Nav.Link href="/" className="nav-link-custom about-btn">Contact</Nav.Link>

                {/* Call to Action */}
                <Form className="d-flex mt-3 mt-md-0">
                  <a href="/template" className="build-res-btn px-3 py-2 rounded-3 text-decoration-none">
                    <span className="fw-bold">🚀 Build My Resume</span>
                  </a>
                </Form>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default TopNavbar;
