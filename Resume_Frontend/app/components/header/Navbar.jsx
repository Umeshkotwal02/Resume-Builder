"use client";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { TbFountainFilled } from "react-icons/tb";

function TopNavbar() {
  return (
    <>
      {["md"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="hero-bg"
          sticky="top"
        >
          <Container>
            {/* Logo */}
            <Navbar.Brand href="/" className="d-flex align-items-center me-4">
              <TbFountainFilled className="logo" />
              <span className="fs-3 px-2 brand-name">Resumify</span>
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

              {/* Only one Offcanvas.Body */}
              <Offcanvas.Body>
                <Nav className="offcanvas-nav flex-column flex-md-row align-items-md-center justify-content-md-between w-100 gap-3">
                  
                  {/* LEFT SIDE LINKS */}
                  <div className="d-flex flex-column flex-md-row gap-3">
                    <Nav.Link href="/about" className="nav-link-custom text-color">About</Nav.Link>
                    <Nav.Link href="/template" className="nav-link-custom text-color">Templates</Nav.Link>
                  </div>

                  {/* RIGHT SIDE LINKS */}
                  <div className="d-flex flex-column flex-md-row gap-3">
                    <Nav.Link href="/signin" className="nav-link-custom about-btn">Sign In</Nav.Link>
                    <Form className="mt-2 mt-md-0">
                      <a
                        href="/template"
                        className="d-flex font-roboto build-res-btn text-decoration-none"
                      >
                        <span className="fw-bold">Get Started 🚀</span>
                      </a>
                    </Form>
                  </div>

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
